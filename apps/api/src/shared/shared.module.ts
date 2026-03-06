// src/shared/shared.module.ts
import { Module } from '@nestjs/common';
import { CacheService } from './services/cache.service';
import { RedisProvider } from '@config/redis.provider';
import { ActivityStreamService } from './insfrastructure/redis/activity-stream.service';
import { StreamBridgeService } from './insfrastructure/redis/stream-bridge.service';
import { ACTIVITY_STREAM_PORT } from './ports/activity-stream.port';

@Module({
  providers: [
    RedisProvider,
    CacheService,
    ActivityStreamService,
    StreamBridgeService,
    {
      provide: ACTIVITY_STREAM_PORT,
      useClass: ActivityStreamService,
    },
  ],
  exports: [CacheService, ActivityStreamService, StreamBridgeService, ACTIVITY_STREAM_PORT],
})
export class SharedModule {}
