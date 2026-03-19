import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@shared/insfrastructure/prisma/prisma.service';
import { QuoteRepository } from '../../domain/repositories/quote.repository';
import { Quote } from '../../domain/entities/quote.entity';
import { QuoteId } from '../../domain/value-objects/quote-id.vo';
import { QuoteFilter } from '../../application/queries/quote-filter';
import { QuoteMapper } from '../../infrastructure/persistence/prisma/quote.mapper';
import { PaginatedResult } from '@shared/types/paginated-result';

@Injectable()
export class PrismaQuoteRepository implements QuoteRepository {
  private readonly logger = new Logger(PrismaQuoteRepository.name);

  constructor(private readonly prisma: PrismaService) {}
  async save(quote: Quote): Promise<void> {
    const data = QuoteMapper.toPersistence(quote);
    await this.prisma.quote.upsert({
      where: { id: data.id },
      update: data,
      create: data,
    });
  }

  async findById(id: QuoteId): Promise<Quote | null> {
    const raw = await this.prisma.quote.findUnique({
      where: { id: id.value },
    });
    return raw ? QuoteMapper.toDomain(raw) : null;
  }

  async findDaily(date: string): Promise<Quote | null> {
    const daily = await this.prisma.dailyQuote.findUnique({
      where: { date },
      include: { quote: true },
    });
    if (daily?.quote && !daily.quote.isDeleted) {
      return QuoteMapper.toDomain(daily.quote);
    }
    const randomQuote = await this.findRandom();
    if (!randomQuote) return null;
    try {
      await this.prisma.dailyQuote.upsert({
        where: { date },
        update: { quoteId: randomQuote.id.value },
        create: { date, quoteId: randomQuote.id.value },
      });
    } catch (error) {
      this.logger.error(`Failed to sync daily quote for ${date}`, error);
    }

    return randomQuote;
  }

  async findAll(query: QuoteFilter): Promise<PaginatedResult<Quote>> {
    const { page = 1, limit = 10, search, status, tags, isDeleted } = query;
    const skip = (page - 1) * limit;

    const where: any = {
      ...(isDeleted !== undefined && { isDeleted }),
      ...(status && { status }),
      ...(tags && tags.length > 0 && { tags: { hasSome: tags } }),
    };

    if (search) {
      where.OR = [
        { author: { contains: search, mode: 'insensitive' } },
        {
          content: {
            path: ['en'],
            string_contains: search,
          },
        },
        {
          content: {
            path: ['vi'],
            string_contains: search,
          },
        },
      ];
    }

    const [total, raws] = await Promise.all([
      this.prisma.quote.count({ where }),
      this.prisma.quote.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    return {
      data: raws.map((raw) => QuoteMapper.toDomain(raw)),
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findRandom(status?: string): Promise<Quote | null> {
    const count = await this.prisma.quote.count({
      where: { isDeleted: false, ...(status && { status }) },
    });

    if (count === 0) return null;

    const skip = Math.floor(Math.random() * count);
    const raw = await this.prisma.quote.findFirst({
      where: { isDeleted: false, ...(status && { status }) },
      skip: skip,
    });

    return raw ? QuoteMapper.toDomain(raw) : null;
  }

  async delete(id: QuoteId): Promise<void> {
    try {
      await this.prisma.quote.delete({ where: { id: id.value } });
    } catch {
      throw new NotFoundException('Quote not found to delete');
    }
  }

  async softDelete(id: QuoteId): Promise<void> {
    try {
      await this.prisma.quote.update({
        where: { id: id.value },
        data: { isDeleted: true, deletedAt: new Date() },
      });
    } catch {
      throw new NotFoundException('Quote not found to soft delete');
    }
  }

  async restore(id: QuoteId): Promise<void> {
    try {
      await this.prisma.quote.update({
        where: { id: id.value },
        data: { isDeleted: false, deletedAt: null },
      });
    } catch {
      throw new NotFoundException('Quote not found to restore');
    }
  }
}
