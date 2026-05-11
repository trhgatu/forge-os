// src/shared/seeder/seeder.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SharedModule } from '@shared/shared.module';
import { PrismaModule } from '../infrastructure/prisma/prisma.module';
import {
  PermissionSeeder,
  RoleSeeder,
  AssignRolePermissionsSeeder,
  UserSeeder,
} from '@shared/seeder';
import { ProjectSeeder } from './project/project.seeder';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), SharedModule, PrismaModule],
  providers: [PermissionSeeder, RoleSeeder, AssignRolePermissionsSeeder, UserSeeder, ProjectSeeder],
  exports: [PermissionSeeder, RoleSeeder, AssignRolePermissionsSeeder, UserSeeder, ProjectSeeder],
})
export class SeederModule {}
