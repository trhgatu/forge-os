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
import { QuoteSeeder } from './quote/quote.seeder';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), SharedModule, PrismaModule],
  providers: [
    PermissionSeeder,
    RoleSeeder,
    AssignRolePermissionsSeeder,
    UserSeeder,
    ProjectSeeder,
    QuoteSeeder,
  ],
  exports: [
    PermissionSeeder,
    RoleSeeder,
    AssignRolePermissionsSeeder,
    UserSeeder,
    ProjectSeeder,
    QuoteSeeder,
  ],
})
export class SeederModule {}
