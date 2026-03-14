// src/shared/services/cache.service.ts
import { Inject, Injectable, Logger } from '@nestjs/common';
import { Redis } from 'ioredis';
import { REDIS_CLIENT } from '@config/redis.provider';

@Injectable()
export class CacheService {
  private readonly logger = new Logger('CacheService');

  constructor(
    @Inject(REDIS_CLIENT)
    private readonly client: Redis,
  ) {}

  async getVersion(namespace: string): Promise<string> {
    try {
      const version = await this.client.get(`version:${namespace}`);
      return version ?? '1';
    } catch (err) {
      this.logger.error(`Get version error (${namespace}): ${err}`);
      return '1';
    }
  }

  async incrementVersion(namespace: string): Promise<void> {
    try {
      await this.client.incr(`version:${namespace}`);
      this.logger.log(`[REDIS] Version incremented for: ${namespace}`);
    } catch (err) {
      this.logger.error(`Incr version error (${namespace}): ${err}`);
    }
  }

  async get<T = unknown>(key: string): Promise<T | null> {
    try {
      const cached = await this.client.get(key);
      if (cached) {
        this.logger.log(`[REDIS HIT] ${key}`);
        return JSON.parse(cached);
      }
      this.logger.log(`[REDIS MISS] ${key}`);
      return null;
    } catch (err) {
      this.logger.error(`Redis get error (key: ${key}): ${err}`);
      return null;
    }
  }

  async set<T>(key: string, data: T, ttlSeconds = 60): Promise<void> {
    try {
      await this.client.setex(key, ttlSeconds, JSON.stringify(data));
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

  async wrap<T>(key: string, fetchFn: () => Promise<T>, ttl = 60): Promise<T> {
    const cached = await this.get<T>(key);
    if (cached) return cached;

    const freshData = await fetchFn();
    await this.set(key, freshData, ttl);
    return freshData;
  }

  async deleteByPattern(pattern: string): Promise<void> {
    try {
      let cursor = '0';
      do {
        const [newCursor, keys] = await this.client.scan(cursor, 'MATCH', pattern, 'COUNT', 100);
        cursor = newCursor;
        if (keys.length > 0) {
          await this.client.del(...keys);
        }
      } while (cursor !== '0');
      this.logger.log(`[REDIS] Cleared pattern: ${pattern}`);
    } catch (err) {
      this.logger.error(`Redis pattern delete error (${pattern}): ${err}`);
    }
  }
}
