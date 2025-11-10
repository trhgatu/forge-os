import { InjectModel } from '@nestjs/mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Model, FilterQuery } from 'mongoose';
import { CourtRepository } from '../../application/ports/court.repository';
import { CourtDocument } from '../court.schema';
import { CourtMapper } from './court.mapper';
import { Court } from '../../domain/court.entity';
import { CourtId } from '../../domain/value-objects/court-id.vo';
import { CourtFilter } from '../../application/queries/court-filter';
import { paginateDDD } from '@shared/utils/paginateDDD';
import { PaginatedResult } from '@shared/types/paginated-result';

@Injectable()
export class MongoCourtRepository implements CourtRepository {
  constructor(
    @InjectModel('Court') private readonly model: Model<CourtDocument>,
  ) {}

  async save(court: Court): Promise<void> {
    const doc = CourtMapper.toPersistence(court);
    await this.model.updateOne(
      { _id: doc._id },
      { $set: doc },
      { upsert: true },
    );
  }

  async findById(id: CourtId): Promise<Court | null> {
    const doc = await this.model.findById(id.toString());
    return doc ? CourtMapper.toDomain(doc) : null;
  }

  async findAll(query: CourtFilter): Promise<PaginatedResult<Court>> {
    const { page = 1, limit = 10 } = query;
    const skip = (page - 1) * limit;

    const filter: FilterQuery<CourtDocument> = {
      isDeleted: query.isDeleted ?? false,
      ...(query.keyword && { name: { $regex: query.keyword, $options: 'i' } }),
      ...(query.status && { status: query.status }),
      ...(query.venueId && { venueId: query.venueId }),
      ...(query.sportType && { sportType: query.sportType }),
    };

    const result = await paginateDDD(
      this.model.find(filter).skip(skip).limit(limit),
      this.model.countDocuments(filter),
      page,
      limit,
    );

    return {
      meta: result.meta,
      data: result.data.map(CourtMapper.toDomain),
    };
  }

  async delete(id: CourtId): Promise<void> {
    const result = await this.model.findByIdAndDelete(id.toString());
    if (!result) throw new NotFoundException('Court not found');
  }

  async softDelete(id: CourtId): Promise<void> {
    const result = await this.model.findByIdAndUpdate(
      id.toString(),
      { isDeleted: true, deletedAt: new Date() },
      { new: true },
    );
    if (!result) throw new NotFoundException('Court not found');
  }

  async restore(id: CourtId): Promise<void> {
    const result = await this.model.findByIdAndUpdate(
      id.toString(),
      { isDeleted: false, deletedAt: undefined },
      { new: true },
    );
    if (!result) throw new NotFoundException('Court not found');
  }

  async existsBySlug(slug: string): Promise<boolean> {
    const result = await this.model.exists({ slug });
    return !!result;
  }
}
