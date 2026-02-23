import { NestFactory } from '@nestjs/core';
import { SeederModule } from './seeder.module';
import { RoleSeeder } from './role/role.seeder';
import { PermissionSeeder } from './permission/permission.seeder';
import { AssignRolePermissionsSeeder } from './assign-role-permissions/assign-role-permissions.seeder';
import { UserSeeder } from './user/user.seeder';

import { ProjectSeeder } from './project/project.seeder';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(SeederModule);

  const permissionSeeder = app.get(PermissionSeeder);
  const roleSeeder = app.get(RoleSeeder);
  const assignSeeder = app.get(AssignRolePermissionsSeeder);
  const userSeeder = app.get(UserSeeder);
  const projectSeeder = app.get(ProjectSeeder);

  await permissionSeeder.seed();
  await roleSeeder.seed();
  await assignSeeder.seed();
  await userSeeder.seed();
  await projectSeeder.seed();
  await app.close();
}

bootstrap().catch((err) => {
  console.error('❌ Error during seeding:', err);
  process.exit(1);
});
