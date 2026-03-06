import { Redis } from 'ioredis';
import { ConfigService } from '@nestjs/config';
import { Logger, Provider } from '@nestjs/common';

export const REDIS_CLIENT = 'REDIS_CLIENT';

export const RedisProvider: Provider = {
  provide: REDIS_CLIENT,
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {
    const logger = new Logger('Redis');
    const client = new Redis({
      host: configService.get<string>('REDIS_HOST') || '127.0.0.1',
      port: configService.get<number>('REDIS_PORT') || 6379,
      username: configService.get<string>('REDIS_USERNAME'),
      password: configService.get<string>('REDIS_PASSWORD'),
      retryStrategy: (times) => {
        const delay = Math.min(times * 50, 2000);
        return delay;
      },
    });

    client.on('error', (err) => {
      logger.error(`Redis Client Error: ${err?.message || err}`);
    });

    client.on('connect', () => {
      logger.log('Redis connected successfully via ioredis');
    });

    return client;
  },
};
