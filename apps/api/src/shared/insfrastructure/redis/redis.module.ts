// apps/api/src/shared/infrastructure/redis/redis.module.ts
import Redis from 'ioredis';

import { Global, Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';

import { ActivityStreamService } from './activity-stream.service';
import { StreamBridgeService } from './stream-bridge.service';

@Global()
@Module({
  imports: [
    BullModule.registerQueue({
      name: 'xp_awarding',
      defaultJobOptions: {
        removeOnComplete: {
          age: 3600,
          count: 100,
        },
        removeOnFail: {
          age: 24 * 3600,
          count: 500,
        },
        attempts: 3,
        backoff: {
          type: 'exponential',
          delay: 5000,
        },
      },
    }),
  ],
  providers: [
    {
      provide: 'REDIS_CLIENT',
      useFactory: () => {
        return new Redis({
          host: process.env.REDIS_HOST,
          port: Number(process.env.REDIS_PORT),
          password: process.env.REDIS_PASSWORD,
          maxRetriesPerRequest: null,
        });
      },
    },
    ActivityStreamService,
    StreamBridgeService,
  ],
  exports: ['REDIS_CLIENT', ActivityStreamService, StreamBridgeService, BullModule],
})
export class RedisModule {}
