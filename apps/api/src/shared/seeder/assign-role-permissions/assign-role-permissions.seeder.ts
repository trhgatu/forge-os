// src/shared/seeder/assign-role-permissions/assign-role-permissions.seeder.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/infrastructure/prisma/prisma.service';
import { RoleEnum } from '@shared/enums';

@Injectable()
export class AssignRolePermissionsSeeder {
  constructor(private readonly prisma: PrismaService) {}

  async seed() {
    const adminRole = await this.prisma.role.findUnique({
      where: { name: RoleEnum.ADMIN },
    });

    if (!adminRole) {
      throw new Error('Admin role not found');
    }

    const allPermissions = await this.prisma.permission.findMany();
    
    await this.prisma.role.update({
      where: { id: adminRole.id },
      data: {
        permissions: {
          set: allPermissions.map((p) => ({ id: p.id })),
        },
      },
    });

    console.log(`✅ Assigned ${allPermissions.length} permissions to Admin role`);
  }
}
