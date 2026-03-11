// src/shared/shared.module.ts
import { Module } from '@nestjs/common';
import { CacheService } from './services/cache.service';
import { RedisProvider } from '@config/redis.provider';
import { ACTIVITY_STREAM_PORT } from './ports/activity-stream.port';

@Module({
  providers: [RedisProvider, CacheService],
  exports: [CacheService, ACTIVITY_STREAM_PORT],
})
export class SharedModule {}
