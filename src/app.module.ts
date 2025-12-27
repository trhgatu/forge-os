import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
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

@Module({
  imports: [
    CqrsModule,
    ConfigModule.forRoot({ isGlobal: true, load: [databaseConfig] }),
    MongooseModule.forRootAsync({
      useFactory: () => {
        return {
          uri: process.env.MONGODB_URI,
          autoIndex: true,
        };
      },
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
  ],
  controllers: [AppController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CreateAuditLogMiddleware)
      .exclude('auth/(.*)', 'audit-logs')
      .forRoutes('*');
  }
}
