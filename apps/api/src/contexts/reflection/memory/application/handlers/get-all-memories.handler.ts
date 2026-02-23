import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllMemoriesQuery } from '../queries/get-all-memories.query';
import { Inject } from '@nestjs/common';
import { MemoryRepository } from '../../application/ports/memory.repository';
import { CacheService } from '@shared/services';
import { MemoryPresenter } from '../../presentation/memory.presenter';
import { PaginatedResponse } from '@shared/types/paginated-response';
import { MemoryResponse } from '../../presentation/dto/memory.response';

@QueryHandler(GetAllMemoriesQuery)
export class GetAllMemoriesHandler
  implements IQueryHandler<GetAllMemoriesQuery>
{
  constructor(
    @Inject('MemoryRepository')
    private readonly memoryRepo: MemoryRepository,
    private readonly cacheService: CacheService,
  ) {}

  async execute(
    query: GetAllMemoriesQuery,
  ): Promise<PaginatedResponse<MemoryResponse>> {
    const { payload } = query;
    const lang = payload.lang ?? 'en';
    const { page = 1, limit = 10 } = payload;

    const cacheKey = `memories:admin:p${page}:l${limit}:${JSON.stringify(payload)}`;
    const cached =
      await this.cacheService.get<PaginatedResponse<MemoryResponse>>(cacheKey);
    if (cached) return cached;

    const memories = await this.memoryRepo.findAll(payload);

    const response = {
      meta: memories.meta,
      data: memories.data.map((memory) =>
        MemoryPresenter.toResponse(memory, lang),
      ),
    };

    await this.cacheService.set(cacheKey, response, 60);
    return response;
  }
}
