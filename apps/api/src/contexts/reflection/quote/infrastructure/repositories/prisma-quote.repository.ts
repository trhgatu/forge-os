import { Injectable, NotFoundException } from '@nestjs/common';
import { QuoteRepository } from '../../application/ports/quote.repository';
import { Quote as QuoteEntity } from '../../domain/quote.entity';
import { QuoteId } from '../../domain/value-objects/quote-id.vo';
import { QuoteFilter } from '../../application/queries/quote-filter';
import { PaginatedResult } from '@shared/types/paginated-result';
import { PrismaService } from '@shared/infrastructure/prisma/prisma.service';
import { QuoteMapper } from './quote.mapper';

@Injectable()
export class PrismaQuoteRepository implements QuoteRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(quote: QuoteEntity): Promise<void> {
    const id = quote.id.toString();
    const persistence = QuoteMapper.toPersistence(quote);

    await this.prisma.quote.upsert({
      where: { id },
      update: {
        content: persistence.content,
        author: persistence.author,
        source: persistence.source,
        tags: persistence.tags,
        mood: persistence.mood,
        status: persistence.status,
        isDeleted: persistence.isDeleted,
        deletedAt: persistence.deletedAt,
      },
      create: {
        id,
        content: persistence.content,
        author: persistence.author,
        source: persistence.source,
        tags: persistence.tags,
        mood: persistence.mood,
        status: persistence.status,
        isDeleted: persistence.isDeleted,
        deletedAt: persistence.deletedAt,
      },
    });
  }

  async findById(id: QuoteId): Promise<QuoteEntity | null> {
    const doc = await this.prisma.quote.findUnique({
      where: { id: id.toString() },
    });
    return doc ? QuoteMapper.toDomain(doc) : null;
  }

  async findAll(filter: QuoteFilter): Promise<PaginatedResult<QuoteEntity>> {
    const { page = 1, limit = 10, status, mood, source, author, tags, isDeleted } = filter;
    const skip = (page - 1) * limit;

    const where: any = {
      isDeleted: isDeleted ? true : false,
    };

    if (status) where.status = status;
    if (mood) where.mood = mood;
    if (source) where.source = source;
    if (author) where.author = author;
    if (tags && tags.length > 0) {
      where.tags = { hasSome: tags };
    }

    const [total, data] = await Promise.all([
      this.prisma.quote.count({ where }),
      this.prisma.quote.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    return {
      data: data
        .map((doc) => QuoteMapper.toDomain(doc))
        .filter((q): q is QuoteEntity => q !== null),
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findRandom(status?: string): Promise<QuoteEntity | null> {
    const where: any = { isDeleted: false };
    if (status) where.status = status;

    const total = await this.prisma.quote.count({ where });
    if (total === 0) return null;

    const skip = Math.floor(Math.random() * total);
    const doc = await this.prisma.quote.findFirst({
      where,
      skip,
    });

    return doc ? QuoteMapper.toDomain(doc) : null;
  }

  async findDaily(date: string): Promise<QuoteEntity | null> {
    const daily = await this.prisma.dailyQuote.findUnique({
      where: { date },
      include: { quote: true },
    });

    if (daily) {
      return QuoteMapper.toDomain(daily.quote);
    }

    let randomQuote = await this.findRandom('public');
    if (!randomQuote) {
      randomQuote = await this.findRandom();
    }

    if (randomQuote) {
      await this.prisma.dailyQuote.create({
        data: {
          date,
          quoteId: randomQuote.id.toString(),
        },
      });
      return randomQuote;
    }

    return null;
  }

  async delete(id: QuoteId): Promise<void> {
    try {
      await this.prisma.quote.delete({ where: { id: id.toString() } });
    } catch {
      throw new NotFoundException('Quote not found');
    }
  }

  async softDelete(id: QuoteId): Promise<void> {
    try {
      await this.prisma.quote.update({
        where: { id: id.toString() },
        data: { isDeleted: true, deletedAt: new Date() },
      });
    } catch {
      throw new NotFoundException('Quote not found');
    }
  }

  async restore(id: QuoteId): Promise<void> {
    try {
      await this.prisma.quote.update({
        where: { id: id.toString() },
        data: { isDeleted: false, deletedAt: null },
      });
    } catch {
      throw new NotFoundException('Quote not found');
    }
  }
}
