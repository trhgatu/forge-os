import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CqrsModule } from '@nestjs/cqrs';
import {
  Permission,
  PermissionSchema,
} from './infrastructure/schemas/iam-permission.schema';
import { PermissionController } from './presentation/controllers/permission.controller';
import { SharedModule } from '@shared/shared.module';
import { PermissionRepository } from './application/ports/permission.repository';
import { MongoPermissionRepository } from './infrastructure/repositories/mongo-permission.repository';
import {
  CreatePermissionHandler,
  UpdatePermissionHandler,
  DeletePermissionHandler,
  GetPermissionsHandler,
  GetPermissionByIdHandler,
} from './application/handlers';

const CommandHandlers = [
  CreatePermissionHandler,
  UpdatePermissionHandler,
  DeletePermissionHandler,
];
const QueryHandlers = [GetPermissionsHandler, GetPermissionByIdHandler];

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Permission.name, schema: PermissionSchema },
    ]),
    CqrsModule,
    SharedModule,
  ],
  controllers: [PermissionController],
  providers: [
    {
      provide: PermissionRepository,
      useClass: MongoPermissionRepository,
    },
    ...CommandHandlers,
    ...QueryHandlers,
  ],
  exports: [PermissionRepository],
})
export class PermissionModule {}
