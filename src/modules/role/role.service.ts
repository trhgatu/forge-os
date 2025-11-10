import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Role, RoleDocument } from './role.schema';
import { Model } from 'mongoose';
import { paginate } from '@shared/utils';
import { CreateRoleDto, UpdateRoleDto, QueryRoleDto } from './dtos';

@Injectable()
export class RoleService {
  constructor(@InjectModel(Role.name) private roleModel: Model<RoleDocument>) {}

  async create(dto: CreateRoleDto) {
    return await this.roleModel.create(dto);
  }

  async findAll(query: QueryRoleDto) {
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
      page,
      limit,
    );
  }

  async findById(id: string) {
    const role = await this.roleModel.findById(id);
    if (!role) throw new NotFoundException('Role not found');
    return role;
  }

  async update(id: string, dto: UpdateRoleDto) {
    const updated = await this.roleModel.findByIdAndUpdate(id, dto, {
      new: true,
    });
    if (!updated) throw new NotFoundException('Role not found');
    return updated;
  }

  async remove(id: string) {
    const deleted = await this.roleModel.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundException('Role not found');
    return deleted;
  }
}
