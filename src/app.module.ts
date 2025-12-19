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

import { JournalModule } from '@root/contexts/reflection/journal/journal.module';
import { CqrsModule } from '@nestjs/cqrs';

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
