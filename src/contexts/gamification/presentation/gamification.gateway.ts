import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: process.env.CORS_ORIGIN || '*', // Consider restricting to specific domains in production
  },
  namespace: 'gamification',
})
export class GamificationGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server!: Server;

  handleConnection(client: Socket) {
    const userId = client.handshake.query.userId as string;
    if (userId) {
      void client.join(`user:${userId}`);
      console.log(
        `Gamification Client Connected: ${client.id} (User: ${userId})`,
      );
    } else {
      console.log(`Gamification Client Connected: ${client.id} (Anonymous)`);
    }
  }

  handleDisconnect(client: Socket) {
    console.log(`Gamification Client Disconnected: ${client.id}`);
  }

  emitXpAwarded(
    userId: string,
    data: { xp: number; newLevel: number; reason: string },
  ) {
    this.server.to(`user:${userId}`).emit('xp_awarded', { userId, ...data });
  }
}
