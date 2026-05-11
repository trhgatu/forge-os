import { Injectable, NotFoundException } from '@nestjs/common';
import { JournalRepository } from '../../domain/journal.repository';
import { Journal as JournalEntity } from '../../domain/journal.entity';
import { JournalId } from '../../domain/value-objects/journal-id.vo';
import { JournalFilter } from '../../application/queries/journal-filter';
import { JournalStatus, JournalType } from '../../domain/enums';
import { PaginatedResult } from '@shared/types/paginated-result';
import { PrismaService } from '@shared/infrastructure/prisma/prisma.service';
import { JournalMapper } from './journal.mapper';
import { EventBus } from '@nestjs/cqrs';

@Injectable()
export class PrismaJournalRepository implements JournalRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly eventBus: EventBus,
  ) {}

  async save(journal: JournalEntity): Promise<void> {
    const data = JournalMapper.toPersistence(journal);
    const id = journal.id.toString();

    await this.prisma.journal.upsert({
      where: { id },
      update: {
        title: data.title,
        content: data.content,
        mood: data.mood,
        tags: data.tags,
        type: data.type,
        status: data.status,
        source: data.source,
        relations: data.relations || [],
        isDeleted: data.isDeleted,
        deletedAt: data.deletedAt,
      },
      create: {
        id,
        title: data.title,
        content: data.content,
        mood: data.mood,
        tags: data.tags,
        type: data.type,
        status: data.status,
        source: data.source,
        relations: data.relations || [],
        isDeleted: data.isDeleted,
        deletedAt: data.deletedAt,
      },
    });

    // --- Automatic Domain Event Publishing ---
    if (journal.domainEvents.length > 0) {
      journal.domainEvents.forEach((event) => this.eventBus.publish(event));
      journal.clearDomainEvents();
    }
  }

  async findAll(filter: JournalFilter): Promise<PaginatedResult<JournalEntity>> {
    const { page = 1, limit = 10, keyword, status, type, mood, isDeleted } = filter;
    const skip = (page - 1) * limit;

    const where: any = {
      isDeleted: isDeleted ? true : false,
    };

    if (status) where.status = status;
    if (type) where.type = type;
    if (mood) where.mood = mood;

    if (keyword) {
      where.OR = [
        { title: { contains: keyword, mode: 'insensitive' } },
        { content: { contains: keyword, mode: 'insensitive' } },
      ];
    }

    const [total, data] = await Promise.all([
      this.prisma.journal.count({ where }),
      this.prisma.journal.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    return {
      data: data.map((doc) => JournalMapper.toDomain(doc)).filter((j): j is JournalEntity => j !== null),
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findById(id: JournalId): Promise<JournalEntity | null> {
    const doc = await this.prisma.journal.findUnique({
      where: { id: id.toString() },
    });
    return doc ? JournalMapper.toDomain(doc) : null;
  }

  async findByIdPublic(id: JournalId): Promise<JournalEntity | null> {
    const doc = await this.prisma.journal.findFirst({
      where: {
        id: id.toString(),
        isDeleted: false,
        status: JournalStatus.PUBLISHED,
      },
    });
    return doc ? JournalMapper.toDomain(doc) : null;
  }

  async findAllPublic(filter: JournalFilter): Promise<PaginatedResult<JournalEntity>> {
    const publicFilter: JournalFilter = {
      ...filter,
      isDeleted: false,
      status: JournalStatus.PUBLISHED,
    };
    return this.findAll(publicFilter);
  }

  async delete(id: JournalId): Promise<void> {
    try {
      await this.prisma.journal.delete({ where: { id: id.toString() } });
    } catch (e) {
      throw new NotFoundException('Journal not found');
    }
  }

  async softDelete(id: JournalId): Promise<void> {
    const journal = await this.findById(id);
    if (!journal) throw new NotFoundException('Journal not found');

    journal.delete();
    await this.save(journal);
  }

  async restore(id: JournalId): Promise<void> {
    const journal = await this.findById(id);
    if (!journal) throw new NotFoundException('Journal not found');

    journal.restore();
    await this.save(journal);
  }
}
