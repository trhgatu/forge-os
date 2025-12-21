import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';
import { RoleRepository } from '../../application/ports/role.repository';
import {
  Role,
  RoleDocument,
} from '../../infrastructure/schemas/iam-role.schema';
import { CreateRoleDto, UpdateRoleDto, QueryRoleDto } from '../../dto';
import { paginate } from '@shared/utils';
import { PaginatedResult } from '@shared/interfaces/paginated-result.interface';
import { Role as RoleEntity } from '../../domain/role.entity';
import { RoleMapper } from '../mappers/role.mapper';

@Injectable()
export class MongoRoleRepository implements RoleRepository {
  constructor(
    @InjectModel(Role.name) private readonly roleModel: Model<RoleDocument>,
  ) {}

  async create(dto: CreateRoleDto): Promise<RoleEntity> {
    const createdRole = await this.roleModel.create(dto);
    return RoleMapper.toDomain(createdRole);
  }

  async findAll(query: QueryRoleDto): Promise<PaginatedResult<RoleEntity>> {
    const { page = 1, limit = 10, keyword } = query;
    const pageNum = Number(page);
    const limitNum = Number(limit);
    const skip = (pageNum - 1) * limitNum;

    // Default to isDeleted: false if not specified
    const isDeleted = query.isDeleted
      ? String(query.isDeleted) === 'true'
      : false;

    const search: FilterQuery<RoleDocument> = { isDeleted };
    if (keyword) {
      const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      search.name = { $regex: escapedKeyword, $options: 'i' };
    }

    const result = await paginate(
      this.roleModel
        .find(search)
        .skip(skip)
        .limit(limitNum)
        .populate('permissions'),
      this.roleModel.countDocuments(search),
      pageNum,
      limitNum,
    );

    return {
      ...result,
      data: result.data.map((doc) => RoleMapper.toDomain(doc as RoleDocument)),
    };
  }

  async findById(id: string): Promise<RoleEntity | null> {
    const role = await this.roleModel
      .findById(id)
      .populate('permissions')
      .exec();
    return role ? RoleMapper.toDomain(role) : null;
  }

  async update(id: string, dto: UpdateRoleDto): Promise<RoleEntity | null> {
    const updated = await this.roleModel
      .findByIdAndUpdate(id, dto, { new: true })
      .populate('permissions')
      .exec();
    return updated ? RoleMapper.toDomain(updated) : null;
  }

  async delete(id: string): Promise<void> {
    await this.roleModel.findByIdAndDelete(id).exec();
  }

  async softDelete(id: string): Promise<void> {
    await this.roleModel
      .findByIdAndUpdate(id, {
        isDeleted: true,
        deletedAt: new Date(),
      })
      .exec();
  }

  async restore(id: string): Promise<void> {
    await this.roleModel
      .findByIdAndUpdate(id, {
        isDeleted: false,
        deletedAt: null,
      })
      .exec();
  }
}
