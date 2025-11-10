import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Court, CourtDocument } from './court.schema';
import { Model } from 'mongoose';
import { CreateCourtDto, UpdateCourtDto, QueryCourtDto } from './dtos';
import { paginate } from '@shared/utils';
import { CacheService } from '@shared/services/cache.service';
import { CourtStatus } from '@shared/enums';

@Injectable()
export class CourtService {
  constructor(
    @InjectModel(Court.name) private CourtModel: Model<CourtDocument>,
    private readonly cacheService: CacheService,
  ) {}

  async create(dto: CreateCourtDto) {
    return await this.CourtModel.create(dto);
  }

  async findAll(query: QueryCourtDto) {
    const { page = 1, limit = 10, keyword } = query;
    const skip = (page - 1) * limit;

    const baseFilter = { isDeleted: false };
    const search = keyword
      ? { ...baseFilter, name: { $regex: keyword, $options: 'i' } }
      : baseFilter;

    const cacheKey = `courts:all:${keyword || 'all'}:p${page}:l${limit}`;
    const cached = await this.cacheService.get(cacheKey);
    if (cached) return cached;

    const result = await paginate(
      this.CourtModel.find(search).skip(skip).limit(limit),
      this.CourtModel.countDocuments(search),
      page,
      limit,
    );

    await this.cacheService.set(cacheKey, result, 60);
    return result;
  }

  async findById(id: string) {
    const Court = await this.CourtModel.findOne({
      _id: id,
      isDeleted: false,
    }).populate('createdBy');
    if (!Court) throw new NotFoundException('Court not found');
    return Court;
  }

  async update(id: string, dto: UpdateCourtDto) {
    const updated = await this.CourtModel.findByIdAndUpdate(id, dto, {
      new: true,
    });
    if (!updated) throw new NotFoundException('Court not found');

    await this.cacheService.deleteByPattern('courts:all:*');
    return updated;
  }

  async restore(id: string) {
    const Court = await this.CourtModel.findByIdAndUpdate(
      id,
      { isDeleted: false },
      { new: true },
    );
    if (!Court) throw new NotFoundException('Court not found');

    await this.cacheService.deleteByPattern('courts:all:*');
    return Court;
  }

  async hardDelete(id: string) {
    const deleted = await this.CourtModel.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundException('Court not found');

    await this.cacheService.deleteByPattern('courts:all:*');
    return deleted;
  }

  async softDelete(id: string) {
    const Court = await this.CourtModel.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true },
    );
    if (!Court) throw new NotFoundException('Court not found');

    await this.cacheService.deleteByPattern('courts:all:*');
    return Court;
  }
  async findAllForPublic(query: QueryCourtDto) {
    const { page = 1, limit = 10, keyword } = query;
    const skip = (page - 1) * limit;

    const filter = {
      isDeleted: false,
      status: CourtStatus.ACTIVE,
      ...(keyword ? { name: { $regex: keyword, $options: 'i' } } : {}),
    };

    const cacheKey = `courts:public:${keyword || 'all'}:p${page}:l${limit}`;
    const cached = await this.cacheService.get(cacheKey);
    if (cached) return cached;

    const result = await paginate(
      this.CourtModel.find(filter).skip(skip).limit(limit),
      this.CourtModel.countDocuments(filter),
      page,
      limit,
    );

    await this.cacheService.set(cacheKey, result, 60);
    return result;
  }

  async findPublicById(id: string) {
    const court = await this.CourtModel.findOne({
      _id: id,
      isDeleted: false,
      status: CourtStatus.ACTIVE,
    });
    if (!court) throw new NotFoundException('Court not found');
    return court;
  }
}
