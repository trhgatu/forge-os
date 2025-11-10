// src/shared/seeder/assign-role-permissions.seed.ts
import { NestFactory } from '@nestjs/core';
import { SeederModule } from '../seeder.module';
import { AssignRolePermissionsSeeder } from './assign-role-permissions.seeder';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(SeederModule);
  const seeder = app.get(AssignRolePermissionsSeeder);

  await seeder.seed();
  await app.close();
}

bootstrap().catch((err) => {
  console.error('❌ Error during assigning permissions:', err);
  process.exit(1);
});
