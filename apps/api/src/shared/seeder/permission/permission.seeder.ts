// src/shared/seeder/permission/permission.seeder.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/infrastructure/prisma/prisma.service';
import { PermissionEnum } from '@shared/enums';

@Injectable()
export class PermissionSeeder {
  constructor(private readonly prisma: PrismaService) {}

  async seed() {
    const allPermissions = Object.values(PermissionEnum);
    let createdCount = 0;

    for (const name of allPermissions) {
      const exists = await this.prisma.permission.findUnique({ where: { name } });
      if (!exists) {
        const parts = name.split('_');
        const action = parts[0];
        const resource = parts.slice(1).join('_');

        await this.prisma.permission.create({
          data: {
            name,
            action,
            resource: resource || 'system',
          },
        });
        createdCount++;
      }
    }

    if (createdCount > 0) {
      console.log(`✅ Seeded ${createdCount} new permissions.`);
    } else {
      console.log('✨ All permissions already exist.');
    }
  }
}
