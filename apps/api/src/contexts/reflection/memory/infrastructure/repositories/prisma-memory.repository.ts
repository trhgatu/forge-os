import { Injectable, NotFoundException } from '@nestjs/common';
import { MemoryRepository } from '../../application/ports/memory.repository';
import { Memory as MemoryEntity } from '../../domain/memory.entity';
import { MemoryId } from '../../domain/value-objects/memory-id.vo';
import { MemoryFilter } from '../../application/queries/memory-filter';
import { PaginatedResult } from '@shared/types/paginated-result';
import { PrismaService } from '@shared/infrastructure/prisma/prisma.service';
import { MemoryMapper } from './memory.mapper';

@Injectable()
export class PrismaMemoryRepository implements MemoryRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(memory: MemoryEntity): Promise<void> {
    const id = memory.id.toString();
    const persistence = MemoryMapper.toPersistence(memory);

    await this.prisma.memory.upsert({
      where: { id },
      update: {
        title: persistence.title,
        content: persistence.content,
        mood: persistence.mood,
        tags: persistence.tags,
        status: persistence.status,
        isDeleted: persistence.isDeleted,
        deletedAt: persistence.deletedAt,
      },
      create: {
        id,
        title: persistence.title,
        content: persistence.content,
        mood: persistence.mood,
        tags: persistence.tags,
        status: persistence.status,
        isDeleted: persistence.isDeleted,
        deletedAt: persistence.deletedAt,
      },
    });
  }

  async findAll(filter: MemoryFilter): Promise<PaginatedResult<MemoryEntity>> {
    const { page = 1, limit = 10, status, mood, isDeleted } = filter;
    const skip = (page - 1) * limit;

    const where: any = {
      isDeleted: isDeleted ? true : false,
    };

    if (status) where.status = status;
    if (mood) where.mood = mood;

    const [total, data] = await Promise.all([
      this.prisma.memory.count({ where }),
      this.prisma.memory.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    return {
      data: data
        .map((doc) => MemoryMapper.toDomain(doc))
        .filter((m): m is MemoryEntity => m !== null),
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findById(id: MemoryId): Promise<MemoryEntity | null> {
    const doc = await this.prisma.memory.findUnique({
      where: { id: id.toString() },
    });
    return doc ? MemoryMapper.toDomain(doc) : null;
  }

  async delete(id: MemoryId): Promise<void> {
    try {
      await this.prisma.memory.delete({ where: { id: id.toString() } });
    } catch {
      throw new NotFoundException('Memory not found');
    }
  }

  async softDelete(id: MemoryId): Promise<void> {
    try {
      await this.prisma.memory.update({
        where: { id: id.toString() },
        data: { isDeleted: true, deletedAt: new Date() },
      });
    } catch {
      throw new NotFoundException('Memory not found');
    }
  }

  async restore(id: MemoryId): Promise<void> {
    try {
      await this.prisma.memory.update({
        where: { id: id.toString() },
        data: { isDeleted: false, deletedAt: null },
      });
    } catch {
      throw new NotFoundException('Memory not found');
    }
  }
}
