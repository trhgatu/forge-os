// apps/api/src/shared/infrastructure/redis/activity-stream.service.ts
import { Injectable, Inject, Logger } from '@nestjs/common';
import { Redis } from 'ioredis';

export interface IntegrationEvent {
  pattern: string;
  userId: string;
  payload: any;
  timestamp: number;
}

@Injectable()
export class ActivityStreamService {
  private readonly logger = new Logger(ActivityStreamService.name);
  private readonly STREAM_KEY = 'forge:activities';

  constructor(@Inject('REDIS_CLIENT') private readonly redis: Redis) {}

  async emit(pattern: string, userId: string, payload: any): Promise<string> {
    const event: IntegrationEvent = {
      pattern,
      userId,
      payload,
      timestamp: Date.now(),
    };

    try {
      const result = await this.redis.xadd(
        this.STREAM_KEY,
        'MAXLEN',
        '~',
        '5000',
        '*',
        'data',
        JSON.stringify(event),
      );
      if (!result) {
        throw new Error('Failed to get message ID from Redis Stream');
      }

      this.logger.log(`[Stream] Event emitted: ${pattern} for user ${userId}`);
      return result;
    } catch (error) {
      const errorStack = error instanceof Error ? error.stack : String(error);
      this.logger.error(`[Stream] Failed to emit event ${pattern}`, errorStack);
      throw error;
    }
  }
}
