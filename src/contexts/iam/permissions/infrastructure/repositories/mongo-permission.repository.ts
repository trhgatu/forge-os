import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PermissionRepository } from '../../application/ports/permission.repository';
import {
  Permission,
  PermissionDocument,
} from '../../infrastructure/schemas/iam-permission.schema';
import {
  CreatePermissionDto,
  UpdatePermissionDto,
  QueryPermissionDto,
} from '../../dto';
import { paginate } from '@shared/utils';
import { PaginatedResult } from '@shared/interfaces/paginated-result.interface';

@Injectable()
export class MongoPermissionRepository implements PermissionRepository {
  constructor(
    @InjectModel(Permission.name)
    private readonly permissionModel: Model<PermissionDocument>,
  ) {}

  async create(dto: CreatePermissionDto): Promise<Permission> {
    return this.permissionModel.create(dto);
  }

  async findAll(
    query: QueryPermissionDto,
  ): Promise<PaginatedResult<Permission>> {
    const { page = 1, limit = 10, keyword } = query;
    const pageNum = Number(page);
    const limitNum = Number(limit);
    const skip = (pageNum - 1) * limitNum;
    const search = keyword ? { name: { $regex: keyword, $options: 'i' } } : {};

    return paginate(
      this.permissionModel.find(search).skip(skip).limit(limitNum),
      this.permissionModel.countDocuments(search),
      pageNum,
      limitNum,
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
