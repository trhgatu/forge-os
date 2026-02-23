// src/shared/shared.module.ts
import { Module } from '@nestjs/common';
import { CacheService } from './services/cache.service';
import { RedisProvider } from '@config/redis.provider';

@Module({
  providers: [RedisProvider, CacheService],
  exports: [CacheService],
})
export class SharedModule {}
