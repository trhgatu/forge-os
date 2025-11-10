import { VenueId } from '../../domain/value-objects/venue-id.vo';

export class VenueModifiedEvent {
  constructor(
    public readonly venueId: VenueId,
    public readonly action:
      | 'create'
      | 'update'
      | 'delete'
      | 'restore'
      | 'soft-delete',
  ) {}
}
