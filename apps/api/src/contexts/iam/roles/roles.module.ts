import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { RoleController } from './presentation/controllers/role.controller';
import { SharedModule } from '@shared/shared.module';
import { RoleRepository } from './application/ports/role.repository';
import { PrismaRoleRepository } from './infrastructure/repositories/prisma-role.repository';
import {
  CreateRoleHandler,
  UpdateRoleHandler,
  DeleteRoleHandler,
  GetRolesHandler,
  GetRoleByIdHandler,
  InvalidateRoleCacheHandler,
  RestoreRoleHandler,
} from './application/handlers';

const CommandHandlers = [
  CreateRoleHandler,
  UpdateRoleHandler,
  DeleteRoleHandler,
  RestoreRoleHandler,
];
const QueryHandlers = [GetRolesHandler, GetRoleByIdHandler];
const EventHandlers = [InvalidateRoleCacheHandler];

@Module({
  imports: [CqrsModule, SharedModule],
  controllers: [RoleController],
  providers: [
    {
      provide: RoleRepository,
      useClass: PrismaRoleRepository,
    },
    {
      provide: 'RoleRepository',
      useClass: PrismaRoleRepository,
    },
    ...CommandHandlers,
    ...QueryHandlers,
    ...EventHandlers,
  ],
  exports: [RoleRepository],
})
export class RoleModule {}
