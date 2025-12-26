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
import { AuthService } from 'src/contexts/iam/auth/application/services/auth.service';

interface VisitorEcho {
  id: string;
  socketId: string;
  type: 'anonymous' | 'known' | 'connection';
  pageVisited: string;
  timestamp: Date;
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
    private readonly commandBus: CommandBus,
  ) {}

  private logger: Logger = new Logger('PresenceGateway');
  private activeVisitors: Map<string, VisitorEcho> = new Map();

  async handleConnection(client: Socket) {
    const ip =
      (client.handshake.headers['x-forwarded-for'] as string) ||
      client.handshake.address;
    const userAgent = client.handshake.headers['user-agent'] as string;

    this.logger.log(`Client connected: ${client.id} [${ip}]`);

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
    await this.commandBus.execute(
      new CreateAuditLogCommand({
        action: 'WS_CONNECT',
        method: 'SOCKET',
        statusCode: 101,
        path: '/presence',
        body: { ip, userAgent, socketId: client.id },
        user: null,
      }),
    );
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
      const payload = await this.authService.verifyToken(data.token);
      if (payload) {
        // Upgrade visitor type to known since token is valid
        const visitor = this.activeVisitors.get(client.id);
        if (visitor) {
          visitor.type = 'known';
          this.activeVisitors.set(client.id, visitor);
          this.broadcastPresence();

          // Log identification
          await this.commandBus.execute(
            new CreateAuditLogCommand({
              action: 'WS_IDENTIFY',
              method: 'SOCKET',
              statusCode: 200,
              path: '/presence/identify',
              body: { socketId: client.id, userId: payload.sub },
              user: payload.sub,
            }),
          );
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
