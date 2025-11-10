// src/shared/seeder/user/user.seeder.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '@modules/user/user.schema';
import { Role, RoleDocument } from '@modules/role/role.schema';
import { RoleEnum } from '@shared/enums'; // nếu có enum Role

@Injectable()
export class UserSeeder {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    @InjectModel(Role.name)
    private readonly roleModel: Model<RoleDocument>,
  ) {}

  async seed() {
    const existing = await this.userModel.countDocuments();
    if (existing > 0) {
      console.log('⚠️  Users already exist. Skipping seed.');
      return;
    }

    // 🔑 Seed admin
    const adminRole = await this.roleModel.findOne({ name: RoleEnum.ADMIN });
    if (!adminRole) throw new Error('❌ Admin role not found');

    const adminUser = await this.userModel.create({
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'admin123',
      roleId: adminRole._id,
    });

    const userRole = await this.roleModel.findOne({ name: RoleEnum.USER });
    if (!userRole) throw new Error('❌ User role not found');

    const normalUser = await this.userModel.create({
      name: 'Normal User',
      email: 'user@example.com',
      password: 'user123',
      roleId: userRole._id,
    });

    console.log(`✅ Seeded admin: ${adminUser.email}`);
    console.log(`✅ Seeded user: ${normalUser.email}`);
  }
}
