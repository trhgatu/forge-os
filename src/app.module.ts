import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from '@config/database.config';
import { AppController } from './app.controller';

import { TestModule } from '@modules/test';
import { AuthModule } from '@modules/auth';
import { RoleModule } from '@modules/role';
import { UserModule } from '@modules/user';
import { PermissionModule } from '@modules/permission';
import { AuditLogModule } from '@modules/audit-log';
import { CreateAuditLogMiddleware } from '@shared/middlewares';

import { VenueModule } from '@root/contexts/catalog/venue/venue.module';
import { CourtModule } from '@root/contexts/catalog/court/court.module';
import { SportModule } from '@root/contexts/catalog/sport/sport.module';

import { MemoryModule } from '@root/contexts/reflection/memory/memory.module';
import { BookingModule } from '@modules/booking';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [databaseConfig] }),
    MongooseModule.forRootAsync({
      useFactory: () => {
        return {
          uri: process.env.MONGODB_URI,
          autoIndex: true,
        };
      },
    }),
    TestModule,
    AuthModule,
    RoleModule,
    UserModule,
    PermissionModule,
    AuditLogModule,
    VenueModule,
    CourtModule,
    SportModule,
    BookingModule,

    MemoryModule,
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
