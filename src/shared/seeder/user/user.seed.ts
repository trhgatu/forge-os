// src/shared/seeder/user/user.seed.ts
import { NestFactory } from '@nestjs/core';
import { SeederModule } from '../seeder.module';
import { UserSeeder } from './user.seeder';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(SeederModule);
  const seeder = app.get(UserSeeder);

  await seeder.seed();
  await app.close();
}

bootstrap().catch((err) => {
  console.error('❌ Error during user seeding:', err);
  process.exit(1);
});
