import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AuthService } from '../../iam/auth/application/services/auth.service';

@WebSocketGateway({
  cors: {
    origin: process.env.CORS_ORIGIN || '*', // Consider restricting to specific domains in production
  },
  namespace: 'gamification',
})
export class GamificationGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly authService: AuthService) {}

  @WebSocketServer()
  server!: Server;

  async handleConnection(client: Socket) {
    try {
      console.log('=== Gamification Connection Debug ===');
      console.log('Client ID:', client.id);
      console.log('Auth payload:', client.handshake.auth);
      console.log(
        'Headers authorization:',
        client.handshake.headers?.authorization,
      );
      console.log('Query params:', client.handshake.query);

      let userId: string | undefined;
      const queryUserId = client.handshake.query.userId;
      if (Array.isArray(queryUserId)) {
        userId = queryUserId[0];
      } else {
        userId = queryUserId as string;
      }

      // 2. Security: Verify Token if present (Priority)
      const token =
        client.handshake.auth?.token || client.handshake.headers?.authorization;

      console.log('Token found:', !!token);

      if (token) {
        try {
          const cleanToken = (token as string).replace('Bearer ', '');
          const payload = await this.authService.verifyToken(cleanToken);
          userId = payload.sub; // Trust the token over the query param
        } catch (err) {
          console.warn(
            `Gamification: Invalid token for client ${client.id}`,
            err,
          );
          userId = undefined; // Prevent spoofing: Reset unverified userId
          // client.disconnect(); // Optional: Enforce disconnect if strict
        }
      }

      if (userId) {
        void client.join(`user:${userId}`);
        console.log(
          `Gamification Client Connected: ${client.id} (User: ${userId})`,
        );
      } else {
        console.log(`Gamification Client Connected: ${client.id} (Anonymous)`);
      }
    } catch (error) {
      console.error('Connection error', error);
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    console.log(`Gamification Client Disconnected: ${client.id}`);
  }

  emitXpAwarded(
    userId: string,
    data: { xp: number; newLevel: number; reason: string },
  ) {
    this.server
      .to(`user:${String(userId)}`)
      .emit('xp_awarded', { userId, ...data });
  }
}
