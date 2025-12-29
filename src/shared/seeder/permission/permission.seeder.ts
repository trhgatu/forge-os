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
    const allPermissions = Object.values(PermissionEnum);
    let createdCount = 0;

    for (const name of allPermissions) {
      const exists = await this.permissionModel.exists({ name });
      if (!exists) {
        const parts = name.split('_');
        const action = parts[0];
        const resource = parts.slice(1).join('_');

        await this.permissionModel.create({
          name,
          action,
          resource: resource || 'system',
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
