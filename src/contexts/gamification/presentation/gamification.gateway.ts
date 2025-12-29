import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  namespace: 'gamification', // Separate namespace for clarity
})
export class GamificationGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server!: Server;

  handleConnection(client: Socket) {
    console.log(`Gamification Client Connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Gamification Client Disconnected: ${client.id}`);
  }

  emitXpAwarded(
    userId: string,
    data: { xp: number; newLevel: number; reason: string },
  ) {
    // Emit to specific user room or broadcast if simplified (for now broadcast to all clients of that user?)
    // Ideally we join users to a room 'user:userId'
    // For MVP, if we don't have user rooms yet, we might emit global with userId payload and frontend filters.
    this.server.emit('xp_awarded', { userId, ...data });
  }
}
