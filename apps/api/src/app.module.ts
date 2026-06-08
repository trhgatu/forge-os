import { APP_INTERCEPTOR } from '@nestjs/core';
import { CacheInvalidationInterceptor } from '@shared/interceptors';
import { CacheModule } from '@shared/services/cache.module';

import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BullBoardModule } from '@bull-board/nestjs';
import { ExpressAdapter } from '@bull-board/express';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';

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
import { RedisModule } from '@shared/infrastructure/redis/redis.module';
import { PrismaModule } from './shared/infrastructure/prisma/prisma.module';
import { HabitsModule } from '@root/contexts/reflection/habits/habits.module';
import { RoutinesModule } from '@root/contexts/reflection/routines/routines.module';
import { QuestsModule } from '@root/contexts/gamification/quests/quests.module';
import { GoalsModule } from '@root/contexts/gamification/goals/goals.module';
import { TasksModule } from '@root/contexts/reflection/tasks/tasks.module';
import { EchoesModule } from '@root/contexts/reflection/echoes/echoes.module';
import { KnowledgeModule } from '@root/contexts/knowledge/knowledge.module';
import { WealthModule } from '@root/contexts/wealth/wealth.module';
import { RequestContextModule } from './shared/infrastructure/request-context/request-context.module';
import { RequestContextMiddleware } from './shared/infrastructure/request-context/request-context.middleware';
import { AuditInterceptor } from './shared/infrastructure/request-context/audit.interceptor';

@Module({
  imports: [
    CqrsModule,
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    RedisModule,
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        connection: {
          host: configService.get<string>('REDIS_HOST'),
          port: configService.get<number>('REDIS_PORT'),
          password: configService.get<string>('REDIS_PASSWORD'),
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
    HabitsModule,
    RoutinesModule,
    QuestsModule,
    GoalsModule,
    TasksModule,
    EchoesModule,
    KnowledgeModule,
    WealthModule,

    CacheModule,
    RequestContextModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInvalidationInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: AuditInterceptor,
    },
  ],
  controllers: [AppController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestContextMiddleware).forRoutes('*');
    consumer.apply(CreateAuditLogMiddleware).exclude('auth/(.*)', 'audit-logs').forRoutes('*');
  }
}
