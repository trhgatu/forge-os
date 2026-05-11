// src/shared/seeder/seeder.module.ts
import { Module } from '@nestjs/common';
import { SharedModule } from '@shared/shared.module';
import {
  PermissionSeeder,
  RoleSeeder,
  AssignRolePermissionsSeeder,
  UserSeeder,
} from '@shared/seeder';
import { ProjectSeeder } from './project/project.seeder';

@Module({
  imports: [SharedModule],
  providers: [PermissionSeeder, RoleSeeder, AssignRolePermissionsSeeder, UserSeeder, ProjectSeeder],
  exports: [PermissionSeeder, RoleSeeder, AssignRolePermissionsSeeder, UserSeeder, ProjectSeeder],
})
export class SeederModule {}
