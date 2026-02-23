import { InjectModel } from '@nestjs/mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Model, FilterQuery } from 'mongoose';
import { MemoryDocument } from '../memory.schema';
import { MemoryRepository } from '../../application/ports/memory.repository';
import { Memory } from '../../domain/memory.entity';
import { MemoryId } from '../../domain/value-objects/memory-id.vo';
import { MemoryFilter } from '../../application/queries/memory-filter';
import { MemoryMapper } from './memory.mapper';
import { paginateDDD } from '@shared/utils/paginateDDD';
import { PaginatedResult } from '@shared/types/paginated-result';

@Injectable()
export class MongoMemoryRepository implements MemoryRepository {
  constructor(@InjectModel('Memory') private readonly model: Model<MemoryDocument>) {}

  async save(memory: Memory): Promise<void> {
    const doc = MemoryMapper.toPersistence(memory);
    await this.model.updateOne({ _id: doc._id }, { $set: doc }, { upsert: true });
  }

  async findById(id: MemoryId): Promise<Memory | null> {
    const doc = await this.model.findById(id.toString());
    return doc ? MemoryMapper.toDomain(doc) : null;
  }

  async findAll(query: MemoryFilter): Promise<PaginatedResult<Memory>> {
    const { page = 1, limit = 10 } = query;
    const skip = (page - 1) * limit;

    const lang = query.lang || 'en';

    // Helper to escape regex special characters
    const escapeRegex = (str: string) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const safeKeyword = query.keyword ? escapeRegex(query.keyword) : undefined;

    const filter: FilterQuery<MemoryDocument> = {
      isDeleted: query.isDeleted ?? false,
      ...(safeKeyword && {
        $or: [
          { [`title.${lang}`]: { $regex: safeKeyword, $options: 'i' } },
          { [`content.${lang}`]: { $regex: safeKeyword, $options: 'i' } },
        ],
      }),
      ...(query.status && { status: query.status }),
      ...(query.tags && { tags: { $in: query.tags } }),
      ...(query.mood && { mood: query.mood }),
    };

    const result = await paginateDDD(
      this.model.find(filter).sort({ date: -1 }).skip(skip).limit(limit),
      this.model.countDocuments(filter),
      page,
      limit,
    );

    return {
      meta: result.meta,
      data: result.data.map(MemoryMapper.toDomain),
    };
  }

  async delete(id: MemoryId): Promise<void> {
    const result = await this.model.findByIdAndDelete(id.toString());
    if (!result) throw new NotFoundException('Memory not found');
  }

  async softDelete(id: MemoryId): Promise<void> {
    const result = await this.model.findByIdAndUpdate(
      id.toString(),
      { isDeleted: true, deletedAt: new Date() },
      { new: true },
    );
    if (!result) throw new NotFoundException('Memory not found');
  }

  async restore(id: MemoryId): Promise<void> {
    const result = await this.model.findByIdAndUpdate(
      id.toString(),
      { isDeleted: false, deletedAt: undefined },
      { new: true },
    );
    if (!result) throw new NotFoundException('Memory not found');
  }
}
