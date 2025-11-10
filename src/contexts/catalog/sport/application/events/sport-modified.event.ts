import { SportId } from '../../domain/value-objects/sport-id.vo';

export class SportModifiedEvent {
  constructor(
    public readonly sportId: SportId,
    public readonly action:
      | 'create'
      | 'update'
      | 'delete'
      | 'restore'
      | 'soft-delete',
  ) {}
}
