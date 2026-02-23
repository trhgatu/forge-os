import { InjectModel } from '@nestjs/mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Model, FilterQuery } from 'mongoose';
import { MoodDocument } from '../mood.schema';
import { MoodRepository } from '../../application/ports/mood.repository';
import { Mood } from '../../domain/mood.entity';
import { MoodId } from '../../domain/value-objects/mood-id.vo';
import { MoodFilter } from '../../application/queries/mood-filter';
import { MoodMapper } from './mood.mapper';
import { paginateDDD } from '@shared/utils/paginateDDD';
import { PaginatedResult } from '@shared/types/paginated-result';

@Injectable()
export class MongoMoodRepository implements MoodRepository {
  constructor(
    @InjectModel('Mood') private readonly model: Model<MoodDocument>,
  ) {}

  async save(mood: Mood): Promise<void> {
    const doc = MoodMapper.toPersistence(mood);
    await this.model.updateOne(
      { _id: doc._id },
      { $set: doc },
      { upsert: true },
    );
  }

  async findById(id: MoodId): Promise<Mood | null> {
    const doc = await this.model.findById(id.toString());
    return doc ? MoodMapper.toDomain(doc) : null;
  }

  async findAll(query: MoodFilter): Promise<PaginatedResult<Mood>> {
    const { page = 1, limit = 10 } = query;
    const skip = (page - 1) * limit;

    const filter: FilterQuery<MoodDocument> = {
      isDeleted: query.isDeleted ?? false,
      ...(query.mood && { mood: query.mood }),
      ...(query.tags && { tags: { $in: query.tags } }),
      ...(query.from && {
        loggedAt: {
          ...(query.from && { $gte: query.from }),
          ...(query.to && { $lte: query.to }),
        },
      }),
      ...(query.to && {
        loggedAt: {
          ...(query.from && { $gte: query.from }),
          ...(query.to && { $lte: query.to }),
        },
      }),
    };

    const result = await paginateDDD(
      this.model.find(filter).skip(skip).limit(limit).sort({ loggedAt: -1 }),
      this.model.countDocuments(filter),
      page,
      limit,
    );

    return {
      meta: result.meta,
      data: result.data.map(MoodMapper.toDomain),
    };
  }

  async delete(id: MoodId): Promise<void> {
    const result = await this.model.findByIdAndDelete(id.toString());
    if (!result) throw new NotFoundException('Mood not found');
  }

  async softDelete(id: MoodId): Promise<void> {
    const result = await this.model.findByIdAndUpdate(
      id.toString(),
      { isDeleted: true, deletedAt: new Date() },
      { new: true },
    );
    if (!result) throw new NotFoundException('Mood not found');
  }

  async restore(id: MoodId): Promise<void> {
    const result = await this.model.findByIdAndUpdate(
      id.toString(),
      { isDeleted: false, deletedAt: undefined },
      { new: true },
    );
    if (!result) throw new NotFoundException('Mood not found');
  }
}
