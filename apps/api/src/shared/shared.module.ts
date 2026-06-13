// src/shared/shared.module.ts
import { Module } from '@nestjs/common';
import { CacheService } from './services/cache.service';
import { UploadService } from './services/upload.service';
import { RedisProvider } from '@config/redis.provider';
@Module({
  providers: [RedisProvider, CacheService, UploadService],
  exports: [CacheService, UploadService],
})
export class SharedModule {}
