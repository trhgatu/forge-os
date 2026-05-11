import { Injectable } from '@nestjs/common';
import { PermissionRepository } from '../../application/ports/permission.repository';
import { Permission as PermissionEntity } from '../../domain/permission.entity';
import { CreatePermissionDto, UpdatePermissionDto, QueryPermissionDto } from '../../dto';
import { PaginatedResult } from '@shared/interfaces/paginated-result.interface';
import { PrismaService } from '@shared/infrastructure/prisma/prisma.service';
import { PermissionMapper } from '../mappers/permission.mapper';

@Injectable()
export class PrismaPermissionRepository implements PermissionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreatePermissionDto): Promise<PermissionEntity> {
    const permission = await this.prisma.permission.create({
      data: {
        name: dto.name,
        description: dto.description,
        resource: dto.resource,
        action: dto.action,
      },
    });

    return PermissionMapper.toDomain(permission);
  }

  async findAll(query: QueryPermissionDto): Promise<PaginatedResult<PermissionEntity>> {
    const { page = 1, limit = 10, name, resource, action, isDeleted } = query;
    const skip = (page - 1) * limit;

    const where: any = { isDeleted: isDeleted ? true : false };
    if (name) where.name = { contains: name, mode: 'insensitive' };
    if (resource) where.resource = { contains: resource, mode: 'insensitive' };
    if (action) where.action = { contains: action, mode: 'insensitive' };

    const [total, data] = await Promise.all([
      this.prisma.permission.count({ where }),
      this.prisma.permission.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    return {
      data: data.map((permission) => PermissionMapper.toDomain(permission)),
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findById(id: string): Promise<PermissionEntity | null> {
    const permission = await this.prisma.permission.findUnique({
      where: { id },
    });

    return permission ? PermissionMapper.toDomain(permission) : null;
  }

  async update(id: string, dto: UpdatePermissionDto): Promise<PermissionEntity | null> {
    const permission = await this.prisma.permission.update({
      where: { id },
      data: {
        name: dto.name,
        description: dto.description,
        resource: dto.resource,
        action: dto.action,
      },
    });

    return permission ? PermissionMapper.toDomain(permission) : null;
  }

  async delete(id: string): Promise<void> {
    await this.prisma.permission.delete({ where: { id } });
  }

  async softDelete(id: string): Promise<void> {
    await this.prisma.permission.update({
      where: { id },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
      },
    });
  }

  async restore(id: string): Promise<void> {
    await this.prisma.permission.update({
      where: { id },
      data: {
        isDeleted: false,
        deletedAt: null,
      },
    });
  }
}
