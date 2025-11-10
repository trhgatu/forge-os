import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllSportsQuery } from '../queries/get-all-sports.query';
import { Inject } from '@nestjs/common';
import { SportRepository } from '../ports/sport.repository';
import { CacheService } from '@shared/services';
import { SportPresenter } from '../../presentation/sport.presenter';
import { PaginatedResponse } from '@shared/types/paginated-response';
import { SportResponse } from '../../presentation/dto/sport.response';

@QueryHandler(GetAllSportsQuery)
export class GetAllSportsHandler implements IQueryHandler<GetAllSportsQuery> {
  constructor(
    @Inject('SportRepository')
    private readonly sportRepo: SportRepository,
    private readonly cacheService: CacheService,
  ) {}

  async execute(
    query: GetAllSportsQuery,
  ): Promise<PaginatedResponse<SportResponse>> {
    const { payload } = query;
    const { page = 1, limit = 10 } = payload;

    const cacheKey = `sports:admin:p${page}:l${limit}:${JSON.stringify(payload)}`;
    const cached =
      await this.cacheService.get<PaginatedResponse<SportResponse>>(cacheKey);
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
