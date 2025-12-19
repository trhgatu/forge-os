// src/shared/seeder/assign-role-permissions.seeder.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  Role,
  RoleDocument,
} from 'src/contexts/iam/roles/infrastructure/schemas/iam-role.schema';
import {
  Permission,
  PermissionDocument,
} from 'src/contexts/iam/permissions/infrastructure/schemas/iam-permission.schema';
import { RoleEnum } from '@shared/enums';

@Injectable()
export class AssignRolePermissionsSeeder {
  constructor(
    @InjectModel(Role.name) private readonly roleModel: Model<RoleDocument>,
    @InjectModel(Permission.name)
    private readonly permissionModel: Model<PermissionDocument>,
  ) {}

  async seed() {
    const adminRole = await this.roleModel.findOne({ name: RoleEnum.ADMIN });

    if (!adminRole) {
      throw new Error('Admin role not found');
    }

    const allPermissions = await this.permissionModel.find();
    adminRole.permissions = allPermissions.map((p) => p._id as Types.ObjectId);

    await adminRole.save();
    console.log(
      `✅ Assigned ${allPermissions.length} permissions to Admin role`,
    );
  }
}
