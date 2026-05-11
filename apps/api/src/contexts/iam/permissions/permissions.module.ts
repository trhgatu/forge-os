import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PermissionController } from './presentation/controllers/permission.controller';
import { SharedModule } from '@shared/shared.module';
import { PermissionRepository } from './application/ports/permission.repository';
import { PrismaPermissionRepository } from './infrastructure/repositories/prisma-permission.repository';
import {
  CreatePermissionHandler,
  UpdatePermissionHandler,
  DeletePermissionHandler,
  GetPermissionsHandler,
  GetPermissionByIdHandler,
  InvalidatePermissionCacheHandler,
  RestorePermissionHandler,
} from './application/handlers';

const CommandHandlers = [
  CreatePermissionHandler,
  UpdatePermissionHandler,
  DeletePermissionHandler,
  RestorePermissionHandler,
];
const QueryHandlers = [GetPermissionsHandler, GetPermissionByIdHandler];
const EventHandlers = [InvalidatePermissionCacheHandler];

@Module({
  imports: [CqrsModule, SharedModule],
  controllers: [PermissionController],
  providers: [
    {
      provide: PermissionRepository,
      useClass: PrismaPermissionRepository,
    },
    {
      provide: 'PermissionRepository',
      useClass: PrismaPermissionRepository,
    },
    ...CommandHandlers,
    ...QueryHandlers,
    ...EventHandlers,
  ],
  exports: [PermissionRepository],
})
export class PermissionModule {}
