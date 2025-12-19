import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RoleRepository } from '../../application/ports/role.repository';
import {
  Role,
  RoleDocument,
} from '../../infrastructure/schemas/iam-role.schema';
import { CreateRoleDto, UpdateRoleDto, QueryRoleDto } from '../../dto';
import { paginate } from '@shared/utils';
import { PaginatedResult } from '@shared/interfaces/paginated-result.interface';

@Injectable()
export class MongoRoleRepository implements RoleRepository {
  constructor(
    @InjectModel(Role.name) private readonly roleModel: Model<RoleDocument>,
  ) {}

  async create(dto: CreateRoleDto): Promise<Role> {
    return this.roleModel.create(dto);
  }

  async findAll(query: QueryRoleDto): Promise<PaginatedResult<Role>> {
    const { page = 1, limit = 10, keyword } = query;
    const pageNum = Number(page);
    const limitNum = Number(limit);
    const skip = (pageNum - 1) * limitNum;
    const search = keyword ? { name: { $regex: keyword, $options: 'i' } } : {};

    return paginate(
      this.roleModel
        .find(search)
        .skip(skip)
        .limit(limitNum)
        .populate('permissions'),
      this.roleModel.countDocuments(search),
      pageNum,
      limitNum,
    );
  }

  async findById(id: string): Promise<Role | null> {
    return this.roleModel.findById(id).populate('permissions').exec();
  }

  async update(id: string, dto: UpdateRoleDto): Promise<Role | null> {
    return this.roleModel.findByIdAndUpdate(id, dto, { new: true }).exec();
  }

  async delete(id: string): Promise<void> {
    await this.roleModel.findByIdAndDelete(id).exec();
  }
}
