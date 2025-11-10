// application/handlers/get-all-venues.handler.ts
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllVenuesQuery } from '../queries/get-all-venues.query';
import { Inject } from '@nestjs/common';
import { VenueRepository } from '../../application/ports/venue.repository';
import { CacheService } from '@shared/services';
import { VenuePresenter } from '../../presentation/venue.presenter';
import { PaginatedResponse } from '@shared/types/paginated-response';
import { VenueResponse } from '../../presentation/dto/venue.response';

@QueryHandler(GetAllVenuesQuery)
export class GetAllVenuesHandler implements IQueryHandler<GetAllVenuesQuery> {
  constructor(
    @Inject('VenueRepository')
    private readonly venueRepo: VenueRepository,
    private readonly cacheService: CacheService,
  ) {}

  async execute(
    query: GetAllVenuesQuery,
  ): Promise<PaginatedResponse<VenueResponse>> {
    const { payload } = query;
    const { page = 1, limit = 10 } = payload;

    const cacheKey = `venues:admin:p${page}:l${limit}:${JSON.stringify(payload)}`;
    const cached =
      await this.cacheService.get<PaginatedResponse<VenueResponse>>(cacheKey);
    if (cached) return cached;

    const venues = await this.venueRepo.findAll(payload);

    const response = {
      meta: venues.meta,
      data: venues.data.map(VenuePresenter.toResponse),
    };

    await this.cacheService.set(cacheKey, response, 60);
    return response;
  }
}
