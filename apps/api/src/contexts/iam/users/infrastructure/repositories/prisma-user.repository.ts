import { Injectable, ConflictException } from '@nestjs/common';
import { UserRepository } from '../../application/ports/user.repository';
import { User as UserEntity } from '../../domain/user.entity';
import { CreateUserDto, UpdateUserDto, QueryUserDto } from '../../dto';
import { PaginatedResult } from '@shared/interfaces/paginated-result.interface';
import { PrismaService } from '@shared/infrastructure/prisma/prisma.service';
import { UserMapper } from '../mappers/user.mapper';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateUserDto): Promise<UserEntity> {
    const existing = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (existing) {
      throw new ConflictException('User with this email already exists');
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(dto.password, salt);

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        name: dto.name,
        password: hashedPassword,
        roleId: dto.roleId,
      },
    });

    return UserMapper.toDomain(user);
  }

  async findAll(query: QueryUserDto): Promise<PaginatedResult<UserEntity>> {
    const { page = 1, limit = 10, email, name } = query;
    const skip = (page - 1) * limit;

    const where: any = { isDeleted: false };
    if (email) where.email = { contains: email, mode: 'insensitive' };
    if (name) where.name = { contains: name, mode: 'insensitive' };

    const [total, data] = await Promise.all([
      this.prisma.user.count({ where }),
      this.prisma.user.findMany({
        where,
        skip,
        take: limit,
        include: {
          role: {
            include: {
              permissions: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    return {
      data: data.map((user) => UserMapper.toDomain(user)),
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findById(id: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        role: true,
        connections: true,
      },
    });

    return user ? UserMapper.toDomain(user) : null;
  }

  async findByIdWithRoleAndPermissions(id: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        role: {
          include: {
            permissions: true,
          },
        },
        connections: true,
      },
    });

    return user ? UserMapper.toDomain(user) : null;
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: {
        role: {
          include: {
            permissions: true,
          },
        },
      },
    });

    return user ? UserMapper.toDomain(user) : null;
  }

  async update(id: string, dto: UpdateUserDto): Promise<UserEntity | null> {
    const { connections, ...rest } = dto;
    const data: any = { ...rest };

    if (dto.password) {
      const salt = await bcrypt.genSalt();
      data.password = await bcrypt.hash(dto.password, salt);
    }

    if (connections) {
      data.connections = {
        deleteMany: {},
        create: connections.map((conn: any) => ({
          provider: conn.provider,
          identifier: conn.identifier,
          metadata: conn.metadata || {},
          connectedAt: conn.connectedAt ? new Date(conn.connectedAt) : new Date(),
        })),
      };
    }

    const user = await this.prisma.user.update({
      where: { id },
      data,
    });

    return UserMapper.toDomain(user);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({ where: { id } });
  }

  async softDelete(id: string): Promise<void> {
    await this.prisma.user.update({
      where: { id },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
      },
    });
  }

  async restore(id: string): Promise<void> {
    await this.prisma.user.update({
      where: { id },
      data: {
        isDeleted: false,
        deletedAt: null,
      },
    });
  }

  async updateRefreshToken(userId: string, refreshToken: string | null): Promise<void> {
    await this.prisma.user.update({
      where: { id: userId },
      data: { refreshToken },
    });
  }
}
