import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllCourtsForPublicQuery } from '../queries/get-all-courts-for-public.query';
import { Inject } from '@nestjs/common';
import { CourtRepository } from '../../application/ports/court.repository';
import { CacheService } from '@shared/services';
import { PaginatedResult } from '@shared/types/paginated-result';
import { CourtPresenter } from '../../presentation/court.presenter';
import { PaginatedResponse } from '@shared/types/paginated-response';
import { CourtResponse } from '../../presentation/dto/court.response';

@QueryHandler(GetAllCourtsForPublicQuery)
export class GetAllCourtsForPublicHandler
  implements IQueryHandler<GetAllCourtsForPublicQuery>
{
  constructor(
    @Inject('CourtRepository')
    private readonly courtRepo: CourtRepository,

    private readonly cacheService: CacheService,
  ) {}

  async execute(
    query: GetAllCourtsForPublicQuery,
  ): Promise<PaginatedResponse<CourtResponse>> {
    const { payload } = query;

    const { page = 1, limit = 10 } = payload;

    const cacheKey = `courts:public:p${page}:l${limit}:${JSON.stringify(payload)}`;

    const cached =
      await this.cacheService.get<PaginatedResult<CourtResponse>>(cacheKey);
    if (cached) return cached;

    const courts = await this.courtRepo.findAll(payload);

    const response = {
      meta: courts.meta,
      data: courts.data.map(CourtPresenter.toResponse),
    };
    await this.cacheService.set(cacheKey, response, 60);
    return response;
  }
}
