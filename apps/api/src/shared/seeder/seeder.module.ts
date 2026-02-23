// src/shared/seeder/seeder.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import databaseConfig from '@config/database.config';
import { ConfigModule } from '@nestjs/config';
import {
  PermissionSeeder,
  RoleSeeder,
  AssignRolePermissionsSeeder,
  UserSeeder,
} from '@shared/seeder';
import {
  Permission,
  PermissionSchema,
} from 'src/contexts/iam/permissions/infrastructure/schemas/iam-permission.schema';
import { Role, RoleSchema } from 'src/contexts/iam/roles/infrastructure/schemas/iam-role.schema';
import { User, UserSchema } from 'src/contexts/iam/users/infrastructure/schemas/iam-user.schema';

import {
  ProjectSchema,
  Project,
} from 'src/contexts/engineering/project/infrastructure/project.schema';

import { ProjectSeeder } from './project/project.seeder';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [databaseConfig] }),
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: process.env.MONGODB_URI,
        autoIndex: true,
      }),
    }),
    MongooseModule.forFeature([
      { name: Permission.name, schema: PermissionSchema },
      { name: Role.name, schema: RoleSchema },
      { name: User.name, schema: UserSchema },
      { name: Project.name, schema: ProjectSchema },
    ]),
  ],
  providers: [PermissionSeeder, RoleSeeder, AssignRolePermissionsSeeder, UserSeeder, ProjectSeeder],
})
export class SeederModule {}
