import { VenueId } from '../../domain/value-objects/venue-id.vo';

export class GetVenueByIdQuery {
  constructor(public readonly id: VenueId) {}
}
