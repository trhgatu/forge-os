// src/shared/seeder/permission.seeder.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Permission,
  PermissionDocument,
} from 'src/contexts/iam/permissions/infrastructure/schemas/iam-permission.schema';
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

    const data = Object.values(PermissionEnum).map((name) => {
      const parts = name.split('_');
      const action = parts[0];
      const resource = parts.slice(1).join('_'); // Join the rest in case of multi-word resource
      return {
        name,
        action,
        resource: resource || 'system', // Fallback if no resource (e.g. just 'manage')
      };
    });
    await this.permissionModel.insertMany(data);
    console.log(`✅ Seeded ${data.length} permissions.`);
  }
}
