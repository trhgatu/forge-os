import { VenueId } from '../../domain/value-objects/venue-id.vo';

export class SoftDeleteVenueCommand {
  constructor(public readonly id: VenueId) {}
}
