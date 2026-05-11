import { Injectable, NotFoundException } from '@nestjs/common';
import { MoodRepository } from '../../application/ports/mood.repository';
import { Mood as MoodEntity } from '../../domain/mood.entity';
import { MoodId } from '../../domain/value-objects/mood-id.vo';
import { MoodFilter } from '../../application/queries/mood-filter';
import { PaginatedResult } from '@shared/types/paginated-result';
import { PrismaService } from '@shared/infrastructure/prisma/prisma.service';
import { MoodMapper } from './mood.mapper';

@Injectable()
export class PrismaMoodRepository implements MoodRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(mood: MoodEntity): Promise<void> {
    const id = mood.toPrimitives().id;
    const persistence = MoodMapper.toPersistence(mood);

    await this.prisma.mood.upsert({
      where: { id },
      update: {
        mood: persistence.mood,
        note: persistence.note,
        intensity: persistence.intensity,
        tags: persistence.tags,
        loggedAt: persistence.loggedAt,
        isDeleted: persistence.isDeleted,
        deletedAt: persistence.deletedAt,
      },
      create: {
        id,
        mood: persistence.mood,
        note: persistence.note,
        intensity: persistence.intensity,
        tags: persistence.tags,
        loggedAt: persistence.loggedAt,
        isDeleted: persistence.isDeleted,
        deletedAt: persistence.deletedAt,
      },
    });
  }

  async findAll(filter: MoodFilter): Promise<PaginatedResult<MoodEntity>> {
    const { page = 1, limit = 10, keyword, mood, tags, isDeleted } = filter;
    const skip = (page - 1) * limit;

    const where: any = {
      isDeleted: isDeleted ? true : false,
    };

    if (mood) where.mood = mood;
    if (tags && tags.length > 0) {
      where.tags = { hasSome: tags };
    }
    if (keyword) {
      where.OR = [
        { note: { contains: keyword, mode: 'insensitive' } },
        { mood: { contains: keyword, mode: 'insensitive' } },
      ];
    }

    const [total, data] = await Promise.all([
      this.prisma.mood.count({ where }),
      this.prisma.mood.findMany({
        where,
        skip,
        take: limit,
        orderBy: { loggedAt: 'desc' },
      }),
    ]);

    return {
      data: data.map((doc) => MoodMapper.toDomain(doc)).filter((m): m is MoodEntity => m !== null),
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findById(id: MoodId): Promise<MoodEntity | null> {
    const doc = await this.prisma.mood.findUnique({
      where: { id: id.toString() },
    });
    return doc ? MoodMapper.toDomain(doc) : null;
  }

  async delete(id: MoodId): Promise<void> {
    try {
      await this.prisma.mood.delete({ where: { id: id.toString() } });
    } catch {
      throw new NotFoundException('Mood not found');
    }
  }

  async softDelete(id: MoodId): Promise<void> {
    try {
      await this.prisma.mood.update({
        where: { id: id.toString() },
        data: { isDeleted: true, deletedAt: new Date() },
      });
    } catch {
      throw new NotFoundException('Mood not found');
    }
  }

  async restore(id: MoodId): Promise<void> {
    try {
      await this.prisma.mood.update({
        where: { id: id.toString() },
        data: { isDeleted: false, deletedAt: null },
      });
    } catch {
      throw new NotFoundException('Mood not found');
    }
  }
}
