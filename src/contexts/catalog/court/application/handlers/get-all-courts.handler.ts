import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllCourtsQuery } from '../queries/get-all-courts.query';
import { Inject } from '@nestjs/common';
import { CourtRepository } from '../../application/ports/court.repository';
import { CacheService } from '@shared/services';
import { CourtPresenter } from '../../presentation/court.presenter';
import { PaginatedResponse } from '@shared/types/paginated-response';
import { CourtResponse } from '../../presentation/dto/court.response';

@QueryHandler(GetAllCourtsQuery)
export class GetAllCourtsHandler implements IQueryHandler<GetAllCourtsQuery> {
  constructor(
    @Inject('CourtRepository')
    private readonly courtRepo: CourtRepository,
    private readonly cacheService: CacheService,
  ) {}

  async execute(
    query: GetAllCourtsQuery,
  ): Promise<PaginatedResponse<CourtResponse>> {
    const { payload } = query;
    const { page = 1, limit = 10 } = payload;

    const cacheKey = `courts:admin:p${page}:l${limit}:${JSON.stringify(payload)}`;
    const cached =
      await this.cacheService.get<PaginatedResponse<CourtResponse>>(cacheKey);
    if (cached) return cached;

    const venues = await this.courtRepo.findAll(payload);

    const response = {
      meta: venues.meta,
      data: venues.data.map(CourtPresenter.toResponse),
    };

    await this.cacheService.set(cacheKey, response, 60);
    return response;
  }
}
