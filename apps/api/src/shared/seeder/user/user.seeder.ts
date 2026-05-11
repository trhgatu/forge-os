// src/shared/seeder/user/user.seeder.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/infrastructure/prisma/prisma.service';
import { RoleEnum } from '@shared/enums';

@Injectable()
export class UserSeeder {
  constructor(private readonly prisma: PrismaService) {}

  async seed() {
    const existing = await this.prisma.user.count();
    if (existing > 0) {
      console.log('⚠️  Users already exist. Skipping seed.');
      return;
    }

    const adminRole = await this.prisma.role.findUnique({ where: { name: RoleEnum.ADMIN } });
    if (!adminRole) throw new Error('❌ Admin role not found');

    const adminUser = await this.prisma.user.create({
      data: {
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'admin123',
        roleId: adminRole.id,
      },
    });

    const userRole = await this.prisma.role.findUnique({ where: { name: RoleEnum.USER } });
    if (!userRole) throw new Error('❌ User role not found');

    const normalUser = await this.prisma.user.create({
      data: {
        name: 'Normal User',
        email: 'user@example.com',
        password: 'user123',
        roleId: userRole.id,
      },
    });

    console.log(`✅ Seeded admin: ${adminUser.email}`);
    console.log(`✅ Seeded user: ${normalUser.email}`);
  }
}
