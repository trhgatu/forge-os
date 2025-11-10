import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllVenuesForPublicQuery } from '../queries/get-all-venues-for-public.query';
import { Inject } from '@nestjs/common';
import { VenueRepository } from '../../application/ports/venue.repository';
import { CacheService } from '@shared/services';
import { PaginatedResult } from '@shared/types/paginated-result';
import { VenuePresenter } from '../../presentation/venue.presenter';
import { PaginatedResponse } from '@shared/types/paginated-response';
import { VenueResponse } from '../../presentation/dto/venue.response';

@QueryHandler(GetAllVenuesForPublicQuery)
export class GetAllVenuesForPublicHandler
  implements IQueryHandler<GetAllVenuesForPublicQuery>
{
  constructor(
    @Inject('VenueRepository')
    private readonly venueRepo: VenueRepository,

    private readonly cacheService: CacheService,
  ) {}

  async execute(
    query: GetAllVenuesForPublicQuery,
  ): Promise<PaginatedResponse<VenueResponse>> {
    const { payload } = query;

    const { page = 1, limit = 10 } = payload;

    const cacheKey = `venues:public:p${page}:l${limit}:${JSON.stringify(payload)}`;

    const cached =
      await this.cacheService.get<PaginatedResult<VenueResponse>>(cacheKey);
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
