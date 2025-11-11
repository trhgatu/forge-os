import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllMemoriesForPublicQuery } from '../queries/get-all-memories-for-public.query';
import { Inject } from '@nestjs/common';
import { MemoryRepository } from '../../application/ports/memory.repository';
import { CacheService } from '@shared/services';
import { PaginatedResult } from '@shared/types/paginated-result';
import { MemoryPresenter } from '../../presentation/memory.presenter';
import { PaginatedResponse } from '@shared/types/paginated-response';
import { MemoryResponse } from '../../presentation/dto/memory.response';

@QueryHandler(GetAllMemoriesForPublicQuery)
export class GetAllMemoriesForPublicHandler
  implements IQueryHandler<GetAllMemoriesForPublicQuery>
{
  constructor(
    @Inject('MemoryRepository')
    private readonly memoryRepo: MemoryRepository,

    private readonly cacheService: CacheService,
  ) {}

  async execute(
    query: GetAllMemoriesForPublicQuery,
  ): Promise<PaginatedResponse<MemoryResponse>> {
    const { payload } = query;

    const { page = 1, limit = 10 } = payload;

    const cacheKey = `memories:public:p${page}:l${limit}:${JSON.stringify(payload)}`;

    const cached =
      await this.cacheService.get<PaginatedResult<MemoryResponse>>(cacheKey);
    if (cached) return cached;

    const memories = await this.memoryRepo.findAll(payload);

    const response = {
      meta: memories.meta,
      data: memories.data.map((memory) =>
        MemoryPresenter.toResponse(memory, 'en'),
      ),
    };

    await this.cacheService.set(cacheKey, response, 60);
    return response;
  }
}
