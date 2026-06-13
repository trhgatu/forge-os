import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllMemoriesForPublicQuery } from './get-all-memories-for-public.query';
import { Inject } from '@nestjs/common';
import { MemoryRepository } from '../../../domain/memory.repository';
import { CacheService } from '@shared/services';
import { PaginatedResult } from '@shared/types/paginated-result';
import { Memory } from '../../../domain/memory.entity';
import { MemoryMapper } from '../../../infrastructure/repositories/memory.mapper';

@QueryHandler(GetAllMemoriesForPublicQuery)
export class GetAllMemoriesForPublicHandler implements IQueryHandler<
  GetAllMemoriesForPublicQuery,
  PaginatedResult<Memory>
> {
  constructor(
    @Inject('MemoryRepository')
    private readonly memoryRepo: MemoryRepository,
    private readonly cacheService: CacheService,
  ) {}

  async execute(query: GetAllMemoriesForPublicQuery): Promise<PaginatedResult<Memory>> {
    const { payload } = query;
    const { page = 1, limit = 10 } = payload;

    const cacheKey = `memories:public:p${page}:l${limit}:${JSON.stringify(payload)}`;

    const cached = await this.cacheService.get<PaginatedResult<any>>(cacheKey);
    if (cached) {
      return {
        meta: cached.meta,
        data: cached.data
          .map((doc) => MemoryMapper.toDomain(doc))
          .filter((m): m is Memory => m !== null),
      };
    }

    const memories = await this.memoryRepo.findAll({
      ...payload,
      isDeleted: false,
    });

    const cacheData = {
      meta: memories.meta,
      data: memories.data.map((m) => MemoryMapper.toPersistence(m)),
    };

    await this.cacheService.set(cacheKey, cacheData, 60);
    return memories;
  }
}
