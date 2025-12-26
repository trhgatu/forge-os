import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateAuditLogCommand } from 'src/contexts/system/audit-log/application/commands/create-audit-log.command';
import { UserRepository } from 'src/contexts/iam/users/application/ports/user.repository';
import { AuthService } from 'src/contexts/iam/auth/application/services/auth.service';
import * as geoip from 'geoip-lite';
import { UAParser } from 'ua-parser-js';

interface VisitorEcho {
  id: string;
  socketId: string;
  type: 'anonymous' | 'known' | 'connection';
  pageVisited: string;
  timestamp: Date;
  name?: string;
  email?: string;
  connectionDetails?: {
    ip: string;
    location: string;
    device: string;
  };
}

@WebSocketGateway({
  cors: {
    origin: process.env.CORS_ORIGINS?.split(',') || ['http://localhost:3000'],
  },
  namespace: 'presence',
})
export class PresenceGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server!: Server;

  constructor(
    private readonly authService: AuthService,
    private readonly userRepository: UserRepository,
    private readonly commandBus: CommandBus,
  ) {}

  private logger: Logger = new Logger('PresenceGateway');
  private activeVisitors: Map<string, VisitorEcho> = new Map();

  async handleConnection(client: Socket) {
    const ip =
      (client.handshake.headers['x-forwarded-for'] as string) ||
      client.handshake.address;
    const userAgentString = client.handshake.headers['user-agent'] as string;
    const referer = client.handshake.headers['referer'] as string;

    // Deep Tracking Analysis
    // 1. Geolocation
    const geo = geoip.lookup(ip);
    const location = geo ? `${geo.city}, ${geo.country}` : 'Unknown Location';

    // 2. User Agent Parsing
    const uaParser = new UAParser(userAgentString);
    const browser = uaParser.getBrowser();
    const os = uaParser.getOS();
    const device = uaParser.getDevice();
    const deviceInfo = `${device.model || 'PC'} - ${os.name || 'Unknown OS'} - ${browser.name || 'Unknown Browser'}`;

    this.logger.log(
      `Client connected: ${client.id} [${ip}] (${location}) [${deviceInfo}]`,
    );

    // Create ephemeral visitor
    const newVisitor: VisitorEcho = {
      id: client.id, // Temporary ID
      socketId: client.id,
      type: 'anonymous', // Default to anonymous
      pageVisited: '/',
      timestamp: new Date(),
    };

    this.activeVisitors.set(client.id, newVisitor);
    this.broadcastPresence();

    // Log connection
    try {
      await this.commandBus.execute(
        new CreateAuditLogCommand({
          action: 'WS_CONNECT',
          method: 'SOCKET',
          statusCode: 101,
          path: '/presence',
          body: {
            ip,
            location,
            userAgent: userAgentString,
            deviceInfo,
            referer,
            socketId: client.id,
          },
          user: undefined, // undefined is safer than null for Mongoose optional ObjectId
        }),
      );
    } catch (error: any) {
      this.logger.error(
        `Failed to log WS_CONNECT: ${error.message}`,
        error.stack as string,
      );
    }
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
    this.activeVisitors.delete(client.id);
    this.broadcastPresence();
  }

  @SubscribeMessage('updateLocation')
  handleLocationUpdate(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { path: string },
  ) {
    if (!data?.path) return;
    const visitor = this.activeVisitors.get(client.id);
    if (visitor) {
      visitor.pageVisited = data.path;
      this.activeVisitors.set(client.id, visitor);
      this.broadcastPresence();
    }
  }

  @SubscribeMessage('identify')
  async handleIdentify(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { token: string },
  ) {
    try {
      if (!data.token) return;
      const payload = (await this.authService.verifyToken(data.token)) as {
        sub: string;
        email: string;
      };
      if (payload) {
        // Upgrade visitor type to known since token is valid
        const visitor = this.activeVisitors.get(client.id);
        if (visitor) {
          visitor.type = 'known';

          // Resolve user details
          const user = await this.userRepository.findById(payload.sub);
          if (user) {
            visitor.name = user.name;
            visitor.email = user.email;
          } else {
            visitor.email = payload.email;
          }

          this.activeVisitors.set(client.id, visitor);
          this.broadcastPresence();

          // Log identification
          try {
            await this.commandBus.execute(
              new CreateAuditLogCommand({
                action: 'WS_IDENTIFY',
                method: 'SOCKET',
                statusCode: 200,
                path: '/presence/identify',
                body: {
                  socketId: client.id,
                  userId: payload.sub,
                  email: visitor.email,
                  name: visitor.name,
                },
                user: payload.sub,
              }),
            );
          } catch (error: any) {
            this.logger.error(
              `Failed to log WS_IDENTIFY: ${error.message}`,
              error.stack as string,
            );
          }
        }
      }
    } catch (error: any) {
      this.logger.warn(`Identify failed for ${client.id}: ${error.message}`);
    }
  }

  private broadcastPresence() {
    const visitorsList = Array.from(this.activeVisitors.values());
    this.server.emit('presence_update', visitorsList);
  }
}
