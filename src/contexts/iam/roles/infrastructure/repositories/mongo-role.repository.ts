import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RoleRepository } from '../../application/ports/role.repository';
import {
  Role,
  RoleDocument,
} from '../../infrastructure/schemas/iam-role.schema';
import { CreateRoleDto, UpdateRoleDto } from '../../dto';
import { paginate } from '@shared/utils';

@Injectable()
export class MongoRoleRepository implements RoleRepository {
  constructor(
    @InjectModel(Role.name) private readonly roleModel: Model<RoleDocument>,
  ) { }

  async create(dto: CreateRoleDto): Promise<Role> {
    return this.roleModel.create(dto);
  }

  async findAll(query: any): Promise<any> {
    const { page = 1, limit = 10, keyword } = query;
    const skip = (page - 1) * limit;
    const search = keyword ? { name: { $regex: keyword, $options: 'i' } } : {};

    return paginate(
      this.roleModel
        .find(search)
        .skip(skip)
        .limit(limit)
        .populate('permissions'),
      this.roleModel.countDocuments(search),
      Number(page),
      Number(limit),
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
