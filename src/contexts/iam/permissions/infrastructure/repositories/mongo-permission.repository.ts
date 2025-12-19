import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PermissionRepository } from '../../application/ports/permission.repository';
import {
  Permission,
  PermissionDocument,
} from '../../infrastructure/schemas/iam-permission.schema';
import { CreatePermissionDto, UpdatePermissionDto } from '../../dto';
import { paginate } from '@shared/utils';

@Injectable()
export class MongoPermissionRepository implements PermissionRepository {
  constructor(
    @InjectModel(Permission.name)
    private readonly permissionModel: Model<PermissionDocument>,
  ) { }

  async create(dto: CreatePermissionDto): Promise<Permission> {
    return this.permissionModel.create(dto);
  }

  async findAll(query: any): Promise<any> {
    const { page = 1, limit = 10, keyword } = query;
    const skip = (page - 1) * limit;
    const search = keyword ? { name: { $regex: keyword, $options: 'i' } } : {};

    return paginate(
      this.permissionModel.find(search).skip(skip).limit(limit),
      this.permissionModel.countDocuments(search),
      Number(page),
      Number(limit),
    );
  }

  async findById(id: string): Promise<Permission | null> {
    return this.permissionModel.findById(id).exec();
  }

  async update(
    id: string,
    dto: UpdatePermissionDto,
  ): Promise<Permission | null> {
    return this.permissionModel
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();
  }

  async delete(id: string): Promise<void> {
    await this.permissionModel.findByIdAndDelete(id).exec();
  }
}
