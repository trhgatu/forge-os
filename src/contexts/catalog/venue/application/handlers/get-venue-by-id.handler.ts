import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetVenueByIdQuery } from '../queries/get-venue-by-id.query';
import { Inject, NotFoundException } from '@nestjs/common';
import { VenueRepository } from '../../application/ports/venue.repository';
import { VenueResponse } from '../../presentation/dto/venue.response';
import { VenuePresenter } from '../../presentation/venue.presenter';

@QueryHandler(GetVenueByIdQuery)
export class GetVenueByIdHandler implements IQueryHandler<GetVenueByIdQuery> {
  constructor(
    @Inject('VenueRepository')
    private readonly venueRepo: VenueRepository,
  ) {}

  async execute(query: GetVenueByIdQuery): Promise<VenueResponse> {
    const { id } = query;

    const venue = await this.venueRepo.findById(id);
    if (!venue) throw new NotFoundException('Venue not found');

    return VenuePresenter.toResponse(venue);
  }
}
