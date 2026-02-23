import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CqrsModule } from '@nestjs/cqrs';
import { Role, RoleSchema } from './infrastructure/schemas/iam-role.schema';
import { RoleController } from './presentation/controllers/role.controller';
import { SharedModule } from '@shared/shared.module';
import { RoleRepository } from './application/ports/role.repository';
import { MongoRoleRepository } from './infrastructure/repositories/mongo-role.repository';
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
  imports: [
    MongooseModule.forFeature([{ name: Role.name, schema: RoleSchema }]),
    CqrsModule,
    SharedModule,
  ],
  controllers: [RoleController],
  providers: [
    {
      provide: RoleRepository,
      useClass: MongoRoleRepository,
    },
    ...CommandHandlers,
    ...QueryHandlers,
    ...EventHandlers,
  ],
  exports: [RoleRepository],
})
export class RoleModule {}
