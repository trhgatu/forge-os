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

interface VisitorEcho {
  id: string;
  socketId: string;
  type: 'anonymous' | 'known' | 'connection';
  pageVisited: string;
  timestamp: Date;
}

@WebSocketGateway({
  cors: {
    origin: '*', // Allow all origins for now (adjust for production)
  },
  namespace: 'presence',
})
export class PresenceGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

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
  handleIdentify(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { role: 'known' | 'connection' },
  ) {
    // Logic to upgrade visitor type (e.g. after login)
    const visitor = this.activeVisitors.get(client.id);
    if (visitor) {
      visitor.type = data.role; // Simplified security for now
      this.activeVisitors.set(client.id, visitor);
      this.broadcastPresence();
    }
  }

  private broadcastPresence() {
    const visitorsList = Array.from(this.activeVisitors.values());
    this.server.emit('presence_update', visitorsList);
  }
}
