import { InjectModel } from '@nestjs/mongoose';
import { VenueDocument } from '../venue.schema';
import { VenueMapper } from './venue.mapper';
import { VenueRepository } from '../../application/ports/venue.repository';
import { Venue } from '../../domain/venue.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { VenueFilter } from '../../application/queries/venue-filter';
import { FilterQuery, Model } from 'mongoose';
import { paginateDDD } from '@shared/utils/paginateDDD';
import { PaginatedResult } from '@shared/types/paginated-result';
import { VenueId } from '../../domain/value-objects/venue-id.vo';

@Injectable()
export class MongoVenueRepository implements VenueRepository {
  constructor(
    @InjectModel('Venue') private readonly model: Model<VenueDocument>,
  ) {}

  async save(venue: Venue): Promise<void> {
    const doc = VenueMapper.toPersistence(venue);
    await this.model.updateOne(
      { _id: doc._id },
      { $set: doc },
      { upsert: true },
    );
  }

  async findById(id: VenueId): Promise<Venue | null> {
    const doc = await this.model.findById(id.toString());
    return doc ? VenueMapper.toDomain(doc) : null;
  }

  async findAll(query: VenueFilter): Promise<PaginatedResult<Venue>> {
    const { page = 1, limit = 10 } = query;
    const skip = (page - 1) * limit;

    const filter: FilterQuery<VenueDocument> = {
      isDeleted: query.isDeleted ?? false,
      ...(query.keyword && { name: { $regex: query.keyword, $options: 'i' } }),
      ...(query.status && { status: query.status }),
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
      data: result.data.map(VenueMapper.toDomain),
    };
  }

  async delete(id: VenueId): Promise<void> {
    const result = await this.model.findByIdAndDelete(id.toString());
    if (!result) throw new NotFoundException('Venue not found');
  }

  async softDelete(id: VenueId): Promise<void> {
    const result = await this.model.findByIdAndUpdate(
      id.toString(),
      { isDeleted: true, deletedAt: new Date() },
      { new: true },
    );
    if (!result) throw new NotFoundException('Venue not found');
  }

  async restore(id: VenueId): Promise<void> {
    const result = await this.model.findByIdAndUpdate(
      id.toString(),
      { isDeleted: false, deletedAt: undefined },
      { new: true },
    );
    if (!result) throw new NotFoundException('Venue not found');
  }

  async existsBySlug(slug: string): Promise<boolean> {
    const result = await this.model.exists({ slug });
    return !!result;
  }
}
