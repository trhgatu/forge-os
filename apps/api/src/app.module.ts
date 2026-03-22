import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { CacheInvalidationInterceptor } from '@shared/interceptors';
import { CacheModule } from '@shared/services/cache.module';

import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BullModule } from '@nestjs/bullmq';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BullBoardModule } from '@bull-board/nestjs';
import { ExpressAdapter } from '@bull-board/express';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';

import databaseConfig from '@config/database.config';
import { AppController } from './app.controller';

import { AuthModule } from 'src/contexts/iam/auth';
import { RoleModule } from 'src/contexts/iam/roles';
import { UserModule } from 'src/contexts/iam/users';
import { PermissionModule } from 'src/contexts/iam/permissions';
import { AuditLogModule } from 'src/contexts/system/audit-log';
import { CreateAuditLogMiddleware } from '@shared/middlewares';

import { MemoryModule } from '@root/contexts/reflection/memory/memory.module';
import { QuoteModule } from '@root/contexts/reflection/quote/quote.module';
import { LoggerModule } from '@shared/logging/logger.module';
import { JournalModule } from '@root/contexts/reflection/journal/journal.module';
import { TimelineModule } from '@root/contexts/reflection/timeline/timeline.module';
import { MoodModule } from '@root/contexts/reflection/mood/mood.module';
import { CqrsModule } from '@nestjs/cqrs';
import { PresenceModule } from '@root/contexts/nova/presence/presence.module';
import { EngineeringModule } from '@root/contexts/engineering/engineering.module';
import { GamificationModule } from '@root/contexts/gamification/gamification.module';
import { RedisModule } from '@shared/insfrastructure/redis/redis.module';

import { join } from 'path';
import { GlobalZodValidationPipe } from '@shared/insfrastructure/pipes/zod-validation.pipe';

@Module({
  imports: [
    CqrsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
      envFilePath: join(process.cwd(), '../../.env'),
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          uri: configService.get<string>('databaseUrl'),
          autoIndex: true,
        };
      },
    }),
    RedisModule,
    BullModule.forRootAsync({
      useFactory: () => ({
        connection: {
          host: process.env.REDIS_HOST,
          port: Number(process.env.REDIS_PORT),
          password: process.env.REDIS_PASSWORD,
          maxRetriesPerRequest: null,
        },
      }),
    }),

    BullBoardModule.forRoot({
      route: '/admin/queues',
      adapter: ExpressAdapter,
    }),

    BullBoardModule.forFeature({
      name: 'xp_awarding',
      adapter: BullMQAdapter,
    }),
    AuthModule,
    RoleModule,
    UserModule,
    PermissionModule,
    AuditLogModule,
    MemoryModule,
    QuoteModule,
    JournalModule,
    TimelineModule,
    MoodModule,
    LoggerModule,

    PresenceModule,
    EngineeringModule,
    GamificationModule,

    CacheModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInvalidationInterceptor,
    },
    {
      provide: APP_PIPE,
      useClass: GlobalZodValidationPipe,
    },
  ],
  controllers: [AppController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CreateAuditLogMiddleware).exclude('auth/(.*)', 'audit-logs').forRoutes('*');
  }
}
