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

  constructor(private readonly authService: AuthService) {}

  private logger: Logger = new Logger('PresenceGateway');
  private activeVisitors: Map<string, VisitorEcho> = new Map();

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);

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
