import { CourtId } from '../../domain/value-objects/court-id.vo';

export class CourtModifiedEvent {
  constructor(
    public readonly courtId: CourtId,
    public readonly action:
      | 'create'
      | 'update'
      | 'delete'
      | 'restore'
      | 'soft-delete',
  ) {}
}
