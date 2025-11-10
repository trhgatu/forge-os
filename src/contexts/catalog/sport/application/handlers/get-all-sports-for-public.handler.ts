import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllSportsForPublicQuery } from '../queries/get-all-sports-for-public.query';
import { Inject } from '@nestjs/common';
import { SportRepository } from '../ports/sport.repository';
import { CacheService } from '@shared/services';
import { PaginatedResult } from '@shared/types/paginated-result';
import { SportPresenter } from '../../presentation/sport.presenter';
import { PaginatedResponse } from '@shared/types/paginated-response';
import { SportResponse } from '../../presentation/dto/sport.response';

@QueryHandler(GetAllSportsForPublicQuery)
export class GetAllSportsForPublicHandler
  implements IQueryHandler<GetAllSportsForPublicQuery>
{
  constructor(
    @Inject('SportRepository')
    private readonly sportRepo: SportRepository,
    private readonly cacheService: CacheService,
  ) {}

  async execute(
    query: GetAllSportsForPublicQuery,
  ): Promise<PaginatedResponse<SportResponse>> {
    const { payload } = query;
    const { page = 1, limit = 10 } = payload;

    const cacheKey = `sports:public:p${page}:l${limit}:${JSON.stringify(payload)}`;

    const cached =
      await this.cacheService.get<PaginatedResult<SportResponse>>(cacheKey);
    if (cached) return cached;

    const sports = await this.sportRepo.findAll(payload);

    const response = {
      meta: sports.meta,
      data: sports.data.map(SportPresenter.toResponse),
    };

    await this.cacheService.set(cacheKey, response, 60);
    return response;
  }
}
