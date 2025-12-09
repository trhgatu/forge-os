import { InjectModel } from '@nestjs/mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Model, FilterQuery } from 'mongoose';
import { JournalDocument } from '../journal.schema';
import { JournalRepository } from '../../application/ports/journal.repository';
import { Journal } from '../../domain/journal.entity';
import { JournalId } from '../../domain/value-objects/journal-id.vo';
import { JournalFilter } from '../../application/queries/journal-filter';
import { JournalMapper } from './journal.mapper';
import { paginateDDD } from '@shared/utils/paginateDDD';
import { PaginatedResult } from '@shared/types/paginated-result';

@Injectable()
export class MongoJournalRepository implements JournalRepository {
  constructor(
    @InjectModel('Journal') private readonly model: Model<JournalDocument>,
  ) {}

  async save(journal: Journal): Promise<void> {
    const doc = JournalMapper.toPersistence(journal);
    await this.model.updateOne(
      { _id: doc._id },
      { $set: doc },
      { upsert: true },
    );
  }

  async findById(id: JournalId): Promise<Journal | null> {
    const doc = await this.model.findById(id.toString());
    return doc ? JournalMapper.toDomain(doc) : null;
  }

  async findAll(query: JournalFilter): Promise<PaginatedResult<Journal>> {
    const { page = 1, limit = 10 } = query;
    const skip = (page - 1) * limit;

    const filter: FilterQuery<JournalDocument> = {
      isDeleted: query.isDeleted ?? false,
      ...(query.keyword && {
        $or: [
          { title: { $regex: query.keyword, $options: 'i' } },
          { content: { $regex: query.keyword, $options: 'i' } },
        ],
      }),
      ...(query.mood && { mood: query.mood }),
      ...(query.tags && { tags: { $in: query.tags } }),
    };

    const result = await paginateDDD(
      this.model.find(filter).skip(skip).limit(limit).sort({ date: -1 }),
      this.model.countDocuments(filter),
      page,
      limit,
    );

    return {
      meta: result.meta,
      data: result.data.map(JournalMapper.toDomain),
    };
  }

  async delete(id: JournalId): Promise<void> {
    const result = await this.model.findByIdAndDelete(id.toString());
    if (!result) throw new NotFoundException('Journal not found');
  }

  async softDelete(id: JournalId): Promise<void> {
    const result = await this.model.findByIdAndUpdate(
      id.toString(),
      { isDeleted: true, deletedAt: new Date() },
      { new: true },
    );
    if (!result) throw new NotFoundException('Journal not found');
  }

  async restore(id: JournalId): Promise<void> {
    const result = await this.model.findByIdAndUpdate(
      id.toString(),
      { isDeleted: false, deletedAt: undefined },
      { new: true },
    );
    if (!result) throw new NotFoundException('Journal not found');
  }
}
