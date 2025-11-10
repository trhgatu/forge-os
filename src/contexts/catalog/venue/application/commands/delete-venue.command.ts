import { VenueId } from '../../domain/value-objects/venue-id.vo';

export class DeleteVenueCommand {
  constructor(public readonly id: VenueId) {}
}
