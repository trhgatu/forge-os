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
    @InjectModel('Journal')
    private readonly journalModel: Model<JournalDocument>,
  ) {}

  async save(journal: Journal): Promise<void> {
    const doc = JournalMapper.toPersistence(journal);
    await this.journalModel.updateOne({ _id: doc._id }, { $set: doc }, { upsert: true });
  }

  async findAll(query: JournalFilter): Promise<PaginatedResult<Journal>> {
    const { page = 1, limit = 10 } = query;
    const skip = (page - 1) * limit;

    const filter: FilterQuery<JournalDocument> = {
      isDeleted: query.isDeleted ? true : { $ne: true },
      ...(query.keyword && {
        $or: [
          {
            title: {
              $regex: query.keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
              $options: 'i',
            },
          },
          {
            content: {
              $regex: query.keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
              $options: 'i',
            },
          },
        ],
      }),

      ...(query.status && { status: query.status }),
      ...(query.type && { type: query.type }),
      ...(query.mood && { mood: query.mood }),
      ...(query.source && { source: query.source }),
      ...(query.tags && { tags: { $in: query.tags } }),
    };

    const result = await paginateDDD(
      this.journalModel.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
      this.journalModel.countDocuments(filter),
      page,
      limit,
    );

    return {
      meta: result.meta,
      data: result.data.map((doc) => JournalMapper.toDomain(doc)),
    };
  }

  async findById(id: JournalId): Promise<Journal | null> {
    const doc = await this.journalModel.findById(id.toString()).exec();
    if (!doc) return null;
    return JournalMapper.toDomain(doc);
  }

  async delete(id: JournalId): Promise<void> {
    await this.journalModel.findByIdAndDelete(id.toString()).exec();
  }

  async restore(id: JournalId): Promise<void> {
    const result = await this.journalModel.findByIdAndUpdate(
      id.toString(),
      {
        isDeleted: false,
        deletedAt: undefined,
      },
      { new: true },
    );
    if (!result) throw new NotFoundException('Journal not found');
  }
}
