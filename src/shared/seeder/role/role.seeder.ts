// src/shared/seeder/role.seeder.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role, RoleDocument } from '@modules/role/role.schema';
import { RoleEnum } from '@shared/enums';

@Injectable()
export class RoleSeeder {
  constructor(
    @InjectModel(Role.name)
    private readonly roleModel: Model<RoleDocument>,
  ) {}

  async seed() {
    const existing = await this.roleModel.countDocuments();
    if (existing > 0) {
      console.log('⚠️  Roles already exist. Skipping seed.');
      return;
    }

    const data = Object.values(RoleEnum).map((name) => ({ name }));
    await this.roleModel.insertMany(data);
    console.log(`✅ Seeded ${data.length} roles.`);
  }
}
