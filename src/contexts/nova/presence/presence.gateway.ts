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
import { JwtService } from '@nestjs/jwt';

interface VisitorEcho {
  id: string;
  socketId: string;
  type: 'anonymous' | 'known' | 'connection';
  pageVisited: string;
  timestamp: Date;
}

@WebSocketGateway({
  cors: {
    origin: process.env.CORS_ALLOW_ORIGIN
      ? process.env.CORS_ALLOW_ORIGIN.split(',')
      : [
          'http://localhost:3000',
          'http://localhost:3001',
          'https://forge-os.vercel.app',
        ],
    credentials: true,
  },
  namespace: 'presence',
})
export class PresenceGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server!: Server;

  private logger: Logger = new Logger('PresenceGateway');
  private activeVisitors: Map<string, VisitorEcho> = new Map();

  constructor(private readonly jwtService: JwtService) {}

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

      const payload = this.jwtService.verify(data.token);
      if (!payload) return;

      // Update visitor to known
      const visitor = this.activeVisitors.get(client.id);
      if (visitor) {
        visitor.type = 'known';
        // Optionally map payload.sub to user ID if we want to track specific users
        // visitor.id = payload.sub;
        this.activeVisitors.set(client.id, visitor);
        this.broadcastPresence();
      }
    } catch {
      this.logger.warn(`Failed to identify client ${client.id}: Invalid token`);
    }
  }

  private broadcastPresence() {
    const visitorsList = Array.from(this.activeVisitors.values());
    this.server.emit('presence_update', visitorsList);
  }
}
