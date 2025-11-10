import { VenueId } from '../../domain/value-objects/venue-id.vo';

export class RestoreVenueCommand {
  constructor(public readonly id: VenueId) {}
}
