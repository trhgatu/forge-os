// src/config/redis.config.ts
import { createClient, RedisClientType } from 'redis';
import { Logger } from '@nestjs/common';

const logger = new Logger('Redis');

export const redisClient: RedisClientType = createClient({
  socket: {
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: Number(process.env.REDIS_PORT || 6379),
  },
  username: process.env.REDIS_USERNAME,
  password: process.env.REDIS_PASSWORD,
});

redisClient.on('error', (err) => {
  logger.error(`Redis Client Error: ${err?.message || err}`);
});

redisClient.on('connect', () => {
  logger.log('Redis connected successfully');
});

export const initRedis = async () => {
  if (!redisClient.isOpen) {
    await redisClient.connect();
  }
};
