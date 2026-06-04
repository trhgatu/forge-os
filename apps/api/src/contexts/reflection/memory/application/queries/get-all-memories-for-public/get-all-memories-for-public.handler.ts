import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllMemoriesForPublicQuery } from './get-all-memories-for-public.query';
import { Inject } from '@nestjs/common';
import { MemoryRepository } from '../../../domain/memory.repository';
import { CacheService } from '@shared/services';
import { PaginatedResult } from '@shared/types/paginated-result';
import { Memory } from '../../../domain/memory.entity';

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

    const cached = await this.cacheService.get<PaginatedResult<Memory>>(cacheKey);
    if (cached) return cached;

    const memories = await this.memoryRepo.findAll({
      ...payload,
      isDeleted: false,
    });

    await this.cacheService.set(cacheKey, memories, 60);
    return memories;
  }
}
