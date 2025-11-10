// src/shared/services/cache.service.ts
import { Inject, Injectable, Logger } from '@nestjs/common';
import { RedisClientType } from 'redis';
import { REDIS_CLIENT } from '@config/redis.provider';

@Injectable()
export class CacheService {
  private readonly logger = new Logger('CacheService');

  constructor(
    @Inject(REDIS_CLIENT)
    private readonly client: RedisClientType,
  ) {}

  async get<T = unknown>(key: string): Promise<T | null> {
    try {
      const cached = await this.client.get(key);
      if (cached) {
        this.logger.log(`[REDIS HIT] ${key}`);
        return JSON.parse(cached);
      } else {
        this.logger.log(`[REDIS MISS] ${key}`);
        return null;
      }
    } catch (err) {
      this.logger.error(`Redis get error (key: ${key}): ${err}`);
      return null;
    }
  }

  async set<T>(key: string, data: T, ttlSeconds = 60): Promise<void> {
    try {
      await this.client.setEx(key, ttlSeconds, JSON.stringify(data));
    } catch (err) {
      this.logger.error(`Redis set error (key: ${key}): ${err}`);
    }
  }

  async delete(key: string): Promise<void> {
    try {
      await this.client.del(key);
    } catch (err) {
      this.logger.error(`Redis delete error (key: ${key}): ${err}`);
    }
  }

  async deleteByPattern(pattern: string): Promise<void> {
    try {
      const keys = await this.client.keys(pattern);
      if (keys.length > 0) {
        await this.client.del(keys);
      }
    } catch (err) {
      this.logger.error(`Redis pattern delete error (${pattern}): ${err}`);
    }
  }
}
