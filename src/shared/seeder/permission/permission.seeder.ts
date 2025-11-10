// src/shared/seeder/permission.seeder.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Permission,
  PermissionDocument,
} from '@modules/permission/permission.schema';
import { PermissionEnum } from '@shared/enums';

@Injectable()
export class PermissionSeeder {
  constructor(
    @InjectModel(Permission.name)
    private readonly permissionModel: Model<PermissionDocument>,
  ) {}

  async seed() {
    const existing = await this.permissionModel.countDocuments();
    if (existing > 0) {
      console.log('⚠️  Permissions already exist. Skipping seed.');
      return;
    }

    const data = Object.values(PermissionEnum).map((name) => ({ name }));
    await this.permissionModel.insertMany(data);
    console.log(`✅ Seeded ${data.length} permissions.`);
  }
}
