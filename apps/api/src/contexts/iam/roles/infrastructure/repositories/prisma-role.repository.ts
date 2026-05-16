import { Injectable } from '@nestjs/common';
import { RoleRepository } from '../../application/ports/role.repository';
import { Role as RoleEntity } from '../../domain/role.entity';
import { CreateRoleDto, UpdateRoleDto, QueryRoleDto } from '../../dto';
import { PaginatedResult } from '@shared/interfaces/paginated-result.interface';
import { PrismaService } from '@shared/infrastructure/prisma/prisma.service';
import { RoleMapper } from '../mappers/role.mapper';

@Injectable()
export class PrismaRoleRepository implements RoleRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateRoleDto): Promise<RoleEntity> {
    const role = await this.prisma.role.create({
      data: {
        name: dto.name,
        description: dto.description,
        isSystem: dto.isSystem || false,
        permissions: {
          connect: dto.permissions?.map((id) => ({ id })) || [],
        },
      },
      include: {
        permissions: true,
      },
    });

    return RoleMapper.toDomain(role);
  }

  async findAll(query: QueryRoleDto): Promise<PaginatedResult<RoleEntity>> {
    const { page = 1, limit = 10, name } = query;
    const skip = (page - 1) * limit;

    const where: any = { isDeleted: false };
    if (name) where.name = { contains: name, mode: 'insensitive' };

    const [total, data] = await Promise.all([
      this.prisma.role.count({ where }),
      this.prisma.role.findMany({
        where,
        skip,
        take: limit,
        include: { permissions: true },
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    return {
      data: data.map((role) => RoleMapper.toDomain(role)),
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findById(id: string): Promise<RoleEntity | null> {
    const role = await this.prisma.role.findUnique({
      where: { id },
      include: { permissions: true },
    });

    return role ? RoleMapper.toDomain(role) : null;
  }

  async update(id: string, dto: UpdateRoleDto): Promise<RoleEntity | null> {
    const role = await this.prisma.role.update({
      where: { id },
      data: {
        name: dto.name,
        description: dto.description,
        isSystem: dto.isSystem,
        permissions: {
          set: dto.permissions?.map((id) => ({ id })) || [],
        },
      },
      include: {
        permissions: true,
      },
    });

    return role ? RoleMapper.toDomain(role) : null;
  }

  async delete(id: string): Promise<void> {
    await this.prisma.role.delete({ where: { id } });
  }

  async softDelete(id: string): Promise<void> {
    await this.prisma.role.update({
      where: { id },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
      },
    });
  }

  async restore(id: string): Promise<void> {
    await this.prisma.role.update({
      where: { id },
      data: {
        isDeleted: false,
        deletedAt: null,
      },
    });
  }
}
