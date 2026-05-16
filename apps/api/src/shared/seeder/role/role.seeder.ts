// src/shared/seeder/role/role.seeder.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/infrastructure/prisma/prisma.service';
import { RoleEnum } from '@shared/enums';

@Injectable()
export class RoleSeeder {
  constructor(private readonly prisma: PrismaService) {}

  async seed() {
    const existing = await this.prisma.role.count();
    if (existing > 0) {
      console.log('⚠️  Roles already exist. Skipping seed.');
      return;
    }

    const data = Object.values(RoleEnum).map((name) => ({
      name: name as string,
      description: `Role for ${name}`,
    }));

    for (const role of data) {
      await this.prisma.role.create({ data: role });
    }
    console.log(`✅ Seeded ${data.length} roles.`);
  }
}
