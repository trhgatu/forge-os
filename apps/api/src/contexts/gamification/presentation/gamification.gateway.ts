import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AuthService } from '../../iam/auth/application/services/auth.service';
import { LoggerService } from '@shared/logging/logger.service';

@WebSocketGateway({
  cors: {
    origin: process.env.CORS_ORIGIN || '*', // Consider restricting to specific domains in production
  },
  namespace: 'gamification',
})
export class GamificationGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private readonly authService: AuthService,
    private readonly logger: LoggerService,
  ) {}

  @WebSocketServer()
  server!: Server;

  async handleConnection(client: Socket) {
    try {
      this.logger.debug('=== Gamification Connection Debug ===', 'GamificationGateway');
      this.logger.debug(`Client ID: ${client.id}`, 'GamificationGateway');
      this.logger.debug(
        `Headers authorization: ${client.handshake.headers?.authorization}`,
        'GamificationGateway',
      );
      this.logger.debug(
        `Query params: ${JSON.stringify(client.handshake.query)}`,
        'GamificationGateway',
      );

      let userId: string | undefined;
      const queryUserId = client.handshake.query.userId;
      if (Array.isArray(queryUserId)) {
        userId = queryUserId[0];
      } else {
        userId = queryUserId as string;
      }

      const token = client.handshake.auth?.token || client.handshake.headers?.authorization;

      this.logger.debug(`Token found: ${!!token}`, 'GamificationGateway');

      if (token) {
        try {
          const cleanToken = (token as string).replace('Bearer ', '');
          const payload = await this.authService.verifyToken(cleanToken);
          userId = payload.sub;
        } catch (err) {
          this.logger.warn(
            `Invalid token for client ${client.id}: ${(err as Error).message}`,
            'GamificationGateway',
          );
          userId = undefined;
        }
      }

      if (userId) {
        void client.join(`user:${userId}`);
        this.logger.log(`Client connected: ${client.id} (User: ${userId})`, 'GamificationGateway');
      } else {
        this.logger.log(`Client connected: ${client.id} (Anonymous)`, 'GamificationGateway');
      }
    } catch (error) {
      this.logger.error(
        `Connection error: ${(error as Error).message}`,
        (error as Error).stack,
        'GamificationGateway',
      );
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`, 'GamificationGateway');
  }

  emitXpAwarded(userId: string, data: { xp: number; newLevel: number; reason: string }) {
    this.server.to(`user:${String(userId)}`).emit('xp_awarded', { userId, ...data });
  }
}
