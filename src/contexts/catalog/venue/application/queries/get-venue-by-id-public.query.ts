import { VenueId } from '../../domain/value-objects/venue-id.vo';

export class GetVenueByIdForPublicQuery {
  constructor(public readonly id: VenueId) {}
}
