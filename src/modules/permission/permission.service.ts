import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Permission, PermissionDocument } from './permission.schema';
import { Model } from 'mongoose';
import { CreatePermissionDto, UpdatePermissionDto } from './dtos';
import { QueryPermissionDto } from './dtos/query-permission.dto';
import { paginate } from '@shared/utils';

@Injectable()
export class PermissionService {
  constructor(
    @InjectModel(Permission.name)
    private permissionModel: Model<PermissionDocument>,
  ) {}

  async create(dto: CreatePermissionDto) {
    return this.permissionModel.create(dto);
  }

  async findAll(query: QueryPermissionDto) {
    const { page = 1, limit = 10, keyword } = query;
    const skip = (page - 1) * limit;

    const search = keyword ? { name: { $regex: keyword, $options: 'i' } } : {};

    return paginate(
      this.permissionModel.find(search).skip(skip).limit(limit),
      this.permissionModel.countDocuments(search),
      page,
      limit,
    );
  }

  async findById(id: string) {
    const permission = await this.permissionModel.findById(id);
    if (!permission) throw new NotFoundException('Permission not found');
    return permission;
  }

  async update(id: string, dto: UpdatePermissionDto) {
    const updated = await this.permissionModel.findByIdAndUpdate(id, dto, {
      new: true,
    });
    if (!updated) throw new NotFoundException('Permission not found');
    return updated;
  }

  async remove(id: string) {
    const deleted = await this.permissionModel.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundException('Permission not found');
    return deleted;
  }
}
