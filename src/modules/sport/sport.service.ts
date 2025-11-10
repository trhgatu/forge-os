import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Sport, SportDocument } from './sport.schema';
import { Model } from 'mongoose';
import { CreateSportDto, UpdateSportDto, QuerySportDto } from './dtos';
import { paginate } from '@shared/utils';
import { CacheService } from '@shared/services/cache.service';

@Injectable()
export class SportService {
  constructor(
    @InjectModel(Sport.name) private SportModel: Model<SportDocument>,
    private readonly cacheService: CacheService,
  ) {}

  async create(dto: CreateSportDto) {
    return await this.SportModel.create(dto);
  }

  async findAll(query: QuerySportDto) {
    const { page = 1, limit = 10, keyword } = query;
    const skip = (page - 1) * limit;

    const baseFilter = { isDeleted: false };
    const search = keyword
      ? { ...baseFilter, name: { $regex: keyword, $options: 'i' } }
      : baseFilter;

    const cacheKey = `sports:all:${keyword || 'all'}:p${page}:l${limit}`;
    const cached = await this.cacheService.get(cacheKey);
    if (cached) return cached;

    const result = await paginate(
      this.SportModel.find(search).skip(skip).limit(limit),
      this.SportModel.countDocuments(search),
      page,
      limit,
    );

    await this.cacheService.set(cacheKey, result, 60);
    return result;
  }

  async findById(id: string) {
    const sport = await this.SportModel.findOne({
      _id: id,
      isDeleted: false,
    });
    if (!sport) throw new NotFoundException('Sport not found');
    return sport;
  }

  async update(id: string, dto: UpdateSportDto) {
    const updated = await this.SportModel.findByIdAndUpdate(id, dto, {
      new: true,
    });
    if (!updated) throw new NotFoundException('Sport not found');

    await this.cacheService.deleteByPattern('sports:all:*');
    await this.cacheService.deleteByPattern('sports:public:*');
    return updated;
  }

  async restore(id: string) {
    const sport = await this.SportModel.findByIdAndUpdate(
      id,
      { isDeleted: false },
      { new: true },
    );
    if (!sport) throw new NotFoundException('Sport not found');

    await this.cacheService.deleteByPattern('sports:all:*');
    return sport;
  }

  async hardDelete(id: string) {
    const deleted = await this.SportModel.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundException('Sport not found');

    await this.cacheService.deleteByPattern('sports:all:*');
    return deleted;
  }

  async softDelete(id: string) {
    const sport = await this.SportModel.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true },
    );
    if (!sport) throw new NotFoundException('Sport not found');

    await this.cacheService.deleteByPattern('sports:all:*');
    return sport;
  }

  async findAllForPublic(query: QuerySportDto) {
    const { page = 1, limit = 10, keyword } = query;
    const skip = (page - 1) * limit;

    const filter = {
      isDeleted: false,
      isActive: true,
      ...(keyword ? { name: { $regex: keyword, $options: 'i' } } : {}),
    };

    const cacheKey = `sports:public:${keyword || 'all'}:p${page}:l${limit}`;
    const cached = await this.cacheService.get(cacheKey);
    if (cached) return cached;

    const result = await paginate(
      this.SportModel.find(filter).skip(skip).limit(limit),
      this.SportModel.countDocuments(filter),
      page,
      limit,
    );

    await this.cacheService.set(cacheKey, result, 60);
    return result;
  }

  async findPublicById(id: string) {
    const sport = await this.SportModel.findOne({
      _id: id,
      isDeleted: false,
      isActive: true,
    });
    if (!sport) throw new NotFoundException('Sport not found');
    return sport;
  }
}
