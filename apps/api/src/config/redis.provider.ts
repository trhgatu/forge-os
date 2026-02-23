import { createClient, RedisClientType } from 'redis';
import { ConfigService } from '@nestjs/config';
import { Logger, Provider } from '@nestjs/common';

export const REDIS_CLIENT = 'REDIS_CLIENT';

export const RedisProvider: Provider = {
  provide: REDIS_CLIENT,
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {
    const logger = new Logger('Redis');
    const client = createClient({
      socket: {
        host: configService.get<string>('REDIS_HOST') || '127.0.0.1',
        port: configService.get<number>('REDIS_PORT') || 6379,
      },
      username: configService.get<string>('REDIS_USERNAME'),
      password: configService.get<string>('REDIS_PASSWORD'),
    });

    client.on('error', (err) => {
      logger.error(`Redis Client Error: ${err?.message || err}`);
    });

    client.on('connect', () => {
      logger.log('Redis connected successfully');
    });

    await client.connect();

    return client as RedisClientType;
  },
};
