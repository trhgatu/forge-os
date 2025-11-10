// src/config/redis.provider.ts
import { redisClient } from './redis.config';
import { RedisClientType } from 'redis';

export const REDIS_CLIENT = 'REDIS_CLIENT';

export const RedisProvider = {
  provide: REDIS_CLIENT,
  useValue: redisClient as RedisClientType,
};
