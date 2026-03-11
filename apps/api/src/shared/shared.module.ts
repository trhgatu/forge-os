// src/shared/shared.module.ts
import { Module } from '@nestjs/common';
import { CacheService } from './services/cache.service';
import { RedisProvider } from '@config/redis.provider';
import { ACTIVITY_STREAM_PORT } from './ports/activity-stream.port';
import { ActivityStreamService } from './insfrastructure/redis/activity-stream.service';

@Module({
  providers: [
    RedisProvider,
    CacheService,
    {
      provide: ACTIVITY_STREAM_PORT,
      useExisting: ActivityStreamService,
    },
  ],
  exports: [CacheService, ACTIVITY_STREAM_PORT],
})
export class SharedModule {}
