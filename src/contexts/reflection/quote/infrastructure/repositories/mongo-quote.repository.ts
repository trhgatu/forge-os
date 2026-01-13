import { InjectModel } from '@nestjs/mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Model, FilterQuery, Types } from 'mongoose';
import { QuoteDocument } from '../quote.schema';
import { DailyQuoteDocument } from '../daily-quote.schema';
import { QuoteRepository } from '../../application/ports/quote.repository';
import { Quote } from '../../domain/quote.entity';
import { QuoteId } from '../../domain/value-objects/quote-id.vo';
import { QuoteFilter } from '../../application/queries/quote-filter';
import { QuoteMapper } from './quote.mapper';
import { paginateDDD } from '@shared/utils/paginateDDD';
import { PaginatedResult } from '@shared/types/paginated-result';
import { MongoErrorUtils } from '@shared/database/mongo/utils/mongo-error.utils';

import { Logger } from '@nestjs/common';
import { Quote as QuoteSchemaClass } from '../quote.schema';
import { DailyQuote } from '../daily-quote.schema';

@Injectable()
export class MongoQuoteRepository implements QuoteRepository {
  private readonly logger = new Logger(MongoQuoteRepository.name);

  constructor(
    @InjectModel(QuoteSchemaClass.name)
    private readonly model: Model<QuoteDocument>,
    @InjectModel(DailyQuote.name)
    private readonly dailyModel: Model<DailyQuoteDocument>,
  ) {}

  async findDaily(date: string): Promise<Quote | null> {
    const daily = await this.dailyModel.findOne({ date });

    if (daily) {
      const quote = await this.model.findOne({
        _id: daily.quoteId,
        isDeleted: false,
      });

      if (quote) {
        return QuoteMapper.toDomain(quote);
      }
    }

    const randomQuote = await this.findRandom();
    if (!randomQuote) return null;
    if (daily) {
      daily.quoteId = new Types.ObjectId(randomQuote.id.toString());
      await daily.save();
    } else {
      try {
        await this.dailyModel.create({
          date,
          quoteId: new Types.ObjectId(randomQuote.id.toString()),
        });
      } catch (error: unknown) {
        if (MongoErrorUtils.isDuplicateKeyError(error)) {
          this.logger.warn(
            `Race condition detected for date ${date}. Retrying...`,
          );
          return this.findDaily(date);
        }
        throw error;
      }
    }

    return randomQuote;
  }

  async save(quote: Quote): Promise<void> {
    const doc = QuoteMapper.toPersistence(quote);
    await this.model.updateOne(
      { _id: doc._id },
      { $set: doc },
      { upsert: true },
    );
  }

  async findById(id: QuoteId): Promise<Quote | null> {
    const doc = await this.model.findById(id.toString());
    return doc ? QuoteMapper.toDomain(doc) : null;
  }

  async findAll(query: QuoteFilter): Promise<PaginatedResult<Quote>> {
    const { page = 1, limit = 10 } = query;
    const skip = (page - 1) * limit;

    const filter: FilterQuery<QuoteDocument> = {
      ...(query.isDeleted !== undefined && { isDeleted: query.isDeleted }),
      ...(query.keyword && {
        'content.en': { $regex: query.keyword, $options: 'i' },
      }),
      ...(query.status && { status: query.status }),
      ...(query.tags && { tags: { $in: query.tags } }),
    };

    const result = await paginateDDD(
      this.model.find(filter).skip(skip).limit(limit),
      this.model.countDocuments(filter),
      page,
      limit,
    );

    return {
      meta: result.meta,
      data: result.data.map(QuoteMapper.toDomain),
    };
  }

  async findRandom(status?: string): Promise<Quote | null> {
    const match: FilterQuery<QuoteDocument> = { isDeleted: false };
    if (status) {
      match.status = status;
    }

    const docs = await this.model.aggregate<QuoteDocument>([
      { $match: match },
      { $sample: { size: 1 } },
    ]);

    if (!docs || docs.length === 0) {
      return null;
    }

    return QuoteMapper.toDomain(docs[0]);
  }

  async delete(id: QuoteId): Promise<void> {
    const result = await this.model.findByIdAndDelete(id.toString());
    if (!result) throw new NotFoundException('Quote not found');
  }

  async softDelete(id: QuoteId): Promise<void> {
    const result = await this.model.findByIdAndUpdate(
      id.toString(),
      { isDeleted: true, deletedAt: new Date() },
      { new: true },
    );
    if (!result) throw new NotFoundException('Quote not found');
  }

  async restore(id: QuoteId): Promise<void> {
    const result = await this.model.findByIdAndUpdate(
      id.toString(),
      { isDeleted: false, deletedAt: undefined },
      { new: true },
    );
    if (!result) throw new NotFoundException('Quote not found');
  }
}
