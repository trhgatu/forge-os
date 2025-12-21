import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';
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
import { Permission as PermissionEntity } from '../../domain/permission.entity';
import { PermissionMapper } from '../mappers/permission.mapper';

@Injectable()
export class MongoPermissionRepository implements PermissionRepository {
  constructor(
    @InjectModel(Permission.name)
    private readonly permissionModel: Model<PermissionDocument>,
  ) {}

  async create(dto: CreatePermissionDto): Promise<PermissionEntity> {
    const created = await this.permissionModel.create(dto);
    return PermissionMapper.toDomain(created);
  }

  async findAll(
    query: QueryPermissionDto,
  ): Promise<PaginatedResult<PermissionEntity>> {
    const { page = 1, limit = 10, keyword } = query;
    const pageNum = Number(page);
    const limitNum = Number(limit);
    const skip = (pageNum - 1) * limitNum;

    // Default to isDeleted: false if not specified
    const isDeleted = query.isDeleted
      ? String(query.isDeleted) === 'true'
      : false;

    const search: FilterQuery<PermissionDocument> = { isDeleted };
    if (keyword) {
      const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      search.name = { $regex: escapedKeyword, $options: 'i' };
    }

    const result = await paginate(
      this.permissionModel.find(search).skip(skip).limit(limitNum),
      this.permissionModel.countDocuments(search),
      pageNum,
      limitNum,
    );

    return {
      ...result,
      data: result.data.map((doc) =>
        PermissionMapper.toDomain(doc as PermissionDocument),
      ),
    };
  }

  async findById(id: string): Promise<PermissionEntity | null> {
    const permission = await this.permissionModel.findById(id).exec();
    return permission ? PermissionMapper.toDomain(permission) : null;
  }

  async update(
    id: string,
    dto: UpdatePermissionDto,
  ): Promise<PermissionEntity | null> {
    const updated = await this.permissionModel
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();
    return updated ? PermissionMapper.toDomain(updated) : null;
  }

  async delete(id: string): Promise<void> {
    await this.permissionModel.findByIdAndDelete(id).exec();
  }

  async softDelete(id: string): Promise<void> {
    await this.permissionModel
      .findByIdAndUpdate(id, {
        isDeleted: true,
        deletedAt: new Date(),
      })
      .exec();
  }

  async restore(id: string): Promise<void> {
    await this.permissionModel
      .findByIdAndUpdate(id, {
        isDeleted: false,
        deletedAt: null,
      })
      .exec();
  }
}
