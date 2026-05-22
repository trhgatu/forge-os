// src/shared/seeder/permission/permission.seeder.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/infrastructure/prisma/prisma.service';
import { PermissionEnum } from '@shared/enums';

@Injectable()
export class PermissionSeeder {
  constructor(private readonly prisma: PrismaService) {}

  async seed() {
    const enumPermissions = Object.values(PermissionEnum) as string[];

    const deleted = await this.prisma.permission.deleteMany({
      where: {
        name: {
          notIn: enumPermissions,
        },
      },
    });

    if (deleted.count > 0) {
      console.log(`🧹 Deleted ${deleted.count} obsolete permissions.`);
    }

    let createdCount = 0;
    for (const name of enumPermissions) {
      const exists = await this.prisma.permission.findUnique({ where: { name } });
      if (!exists) {
        let action = 'create';
        let resource = 'system';
        if (name.includes(':')) {
          const parts = name.split(':');
          action = parts[parts.length - 1];
          resource = parts.slice(0, parts.length - 1).join(':');
        } else {
          const parts = name.split('_');
          action = parts[0];
          resource = parts.slice(1).join('_') || 'system';
        }

        await this.prisma.permission.create({
          data: {
            name,
            action,
            resource,
          },
        });
        createdCount++;
      }
    }

    if (createdCount > 0) {
      console.log(`✅ Seeded ${createdCount} new permissions.`);
    } else {
      console.log('✨ Permissions are up to date.');
    }
  }
}
