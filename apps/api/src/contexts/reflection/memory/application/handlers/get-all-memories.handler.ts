import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllMemoriesQuery } from '../queries/get-all-memories.query';
import { Inject } from '@nestjs/common';
import { MemoryRepository } from '../../application/ports/memory.repository';
import { CacheService } from '@shared/services';
import { PaginatedResult } from '@shared/types/paginated-result';
import { Memory } from '../../domain/memory.entity';

@QueryHandler(GetAllMemoriesQuery)
export class GetAllMemoriesHandler implements IQueryHandler<GetAllMemoriesQuery, PaginatedResult<Memory>> {
  constructor(
    @Inject('MemoryRepository')
    private readonly memoryRepo: MemoryRepository,
    private readonly cacheService: CacheService,
  ) {}

  async execute(query: GetAllMemoriesQuery): Promise<PaginatedResult<Memory>> {
    const { payload } = query;
    const { page = 1, limit = 10 } = payload;

    const cacheKey = `memories:admin:p${page}:l${limit}:${JSON.stringify(payload)}`;
    const cached = await this.cacheService.get<PaginatedResult<Memory>>(cacheKey);
    if (cached) return cached;

    const memories = await this.memoryRepo.findAll(payload);
    await this.cacheService.set(cacheKey, memories, 60);
    
    return memories;
  }
}
