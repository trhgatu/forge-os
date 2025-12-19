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
} from './application/commands/handlers';
import {
  GetRolesHandler,
  GetRoleByIdHandler,
} from './application/queries/handlers';

const CommandHandlers = [
  CreateRoleHandler,
  UpdateRoleHandler,
  DeleteRoleHandler,
];
const QueryHandlers = [GetRolesHandler, GetRoleByIdHandler];

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
  ],
  exports: [RoleRepository],
})
export class RoleModule {}
