import { InjectModel } from '@nestjs/mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Model, FilterQuery } from 'mongoose';
import { QuoteDocument } from '../quote.schema';
import { QuoteRepository } from '../../application/ports/quote.repository';
import { Quote } from '../../domain/quote.entity';
import { QuoteId } from '../../domain/value-objects/quote-id.vo';
import { QuoteFilter } from '../../application/queries/quote-filter';
import { QuoteMapper } from './quote.mapper';
import { paginateDDD } from '@shared/utils/paginateDDD';
import { PaginatedResult } from '@shared/types/paginated-result';

@Injectable()
export class MongoQuoteRepository implements QuoteRepository {
  constructor(
    @InjectModel('Quote') private readonly model: Model<QuoteDocument>,
  ) {}

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
      isDeleted: query.isDeleted ?? false,
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
