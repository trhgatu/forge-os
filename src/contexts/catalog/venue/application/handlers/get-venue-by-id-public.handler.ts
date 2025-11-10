import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetVenueByIdForPublicQuery } from '../queries/get-venue-by-id-public.query';
import { Inject, NotFoundException } from '@nestjs/common';
import { VenueRepository } from '../../application/ports/venue.repository';
import { VenueResponse } from '../../presentation/dto/venue.response';
import { VenuePresenter } from '../../presentation/venue.presenter';

@QueryHandler(GetVenueByIdForPublicQuery)
export class GetVenueByIdForPublicHandler
  implements IQueryHandler<GetVenueByIdForPublicQuery, VenueResponse>
{
  constructor(
    @Inject('VenueRepository')
    private readonly venueRepo: VenueRepository,
  ) {}

  async execute(query: GetVenueByIdForPublicQuery): Promise<VenueResponse> {
    const { id } = query;
    const venue = await this.venueRepo.findById(id);

    if (!venue || venue.isVenueDeleted) {
      throw new NotFoundException('Venue not found');
    }

    return VenuePresenter.toResponse(venue);
  }
}
