import { InjectModel } from '@nestjs/mongoose';
import { SportDocument } from '../sport.schema';
import { SportMapper } from './sport.mapper';
import { SportRepository } from '../../application/ports/sport.repository';
import { Sport } from '../../domain/sport.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { SportFilter } from '../../application/queries/sport-filter';
import { FilterQuery, Model } from 'mongoose';
import { paginateDDD } from '@shared/utils/paginateDDD';
import { PaginatedResult } from '@shared/types/paginated-result';
import { SportId } from '../../domain/value-objects/sport-id.vo';

@Injectable()
export class MongoSportRepository implements SportRepository {
  constructor(
    @InjectModel('Sport') private readonly model: Model<SportDocument>,
  ) {}

  async save(sport: Sport): Promise<void> {
    const doc = SportMapper.toPersistence(sport);
    await this.model.updateOne(
      { _id: doc._id },
      { $set: doc },
      { upsert: true },
    );
  }

  async findById(id: SportId): Promise<Sport | null> {
    const doc = await this.model.findById(id.toString());
    return doc ? SportMapper.toDomain(doc) : null;
  }

  async findAll(query: SportFilter): Promise<PaginatedResult<Sport>> {
    const { page = 1, limit = 10 } = query;
    const skip = (page - 1) * limit;

    const filter: FilterQuery<SportDocument> = {
      isDeleted: query.isDeleted ?? false,
      ...(query.keyword && { name: { $regex: query.keyword, $options: 'i' } }),
      ...(query.status && { status: query.status }),
    };

    const result = await paginateDDD(
      this.model.find(filter).skip(skip).limit(limit),
      this.model.countDocuments(filter),
      page,
      limit,
    );

    return {
      meta: result.meta,
      data: result.data.map(SportMapper.toDomain),
    };
  }

  async delete(id: SportId): Promise<void> {
    const result = await this.model.findByIdAndDelete(id.toString());
    if (!result) throw new NotFoundException('Sport not found');
  }

  async softDelete(id: SportId): Promise<void> {
    const result = await this.model.findByIdAndUpdate(
      id.toString(),
      { isDeleted: true, deletedAt: new Date() },
      { new: true },
    );
    if (!result) throw new NotFoundException('Sport not found');
  }

  async restore(id: SportId): Promise<void> {
    const result = await this.model.findByIdAndUpdate(
      id.toString(),
      { isDeleted: false, deletedAt: undefined },
      { new: true },
    );
    if (!result) throw new NotFoundException('Sport not found');
  }

  async existsBySlug(slug: string): Promise<boolean> {
    const result = await this.model.exists({ slug });
    return !!result;
  }
}
