import { UserId } from '../../domain/value-objects/user-id.vo';

export class UserModifiedEvent {
  constructor(
    public readonly userId: UserId,
    public readonly action: 'create' | 'update' | 'delete' | 'restore' | 'soft-delete',
  ) {}
}
