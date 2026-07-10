import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { OnModuleInit } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { AuthService } from '../../iam/auth/application/services/auth.service';
import { LoggerService } from '@shared/logging/logger.service';
import { NotificationEvent } from '@shared/interfaces';
import { contextStorage } from '@shared/utils/context.storage';

@WebSocketGateway({
  cors: {
    origin: process.env.CORS_ORIGIN || '*',
  },
  namespace: 'gamification',
})
export class GamificationGateway implements OnGatewayConnection, OnGatewayDisconnect, OnModuleInit {
  constructor(
    private readonly authService: AuthService,
    private readonly logger: LoggerService,
    private readonly eventBus: EventBus,
  ) {}

  onModuleInit() {
    this.eventBus.subject$.subscribe({
      next: (event: any) => {
        if (this.isNotificationEvent(event)) {
          const userId = event.getUserId();
          const payload = event.getNotificationPayload();
          const store = contextStorage.getStore();
          const correlationId = store?.correlationId;
          this.logger.log(
            `[Realtime-Broadcaster] Emitted notification ${payload.type} to user ${userId} with correlationId ${correlationId}`,
            'GamificationGateway',
          );
          this.server.to(`user:${userId}`).emit('system_notification', {
            ...payload,
            correlationId,
          });
        }
      },
      error: (err) => {
        this.logger.error(
          'Error in GamificationGateway EventBus subscription',
          err,
          'GamificationGateway',
        );
      },
    });
  }

  private isNotificationEvent(event: any): event is NotificationEvent {
    return (
      event &&
      typeof event.getUserId === 'function' &&
      typeof event.getNotificationPayload === 'function'
    );
  }

  @WebSocketServer()
  server!: Server;

  async handleConnection(client: Socket) {
    try {
      let userId: string | undefined;
      const queryUserId = client.handshake.query.userId;
      if (Array.isArray(queryUserId)) {
        userId = queryUserId[0];
      } else {
        userId = queryUserId as string;
      }

      const token = client.handshake.auth?.token || client.handshake.headers?.authorization;

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
    const store = contextStorage.getStore();
    const correlationId = store?.correlationId;
    this.server.to(`user:${String(userId)}`).emit('xp_awarded', {
      userId,
      ...data,
      correlationId,
    });
  }
}
