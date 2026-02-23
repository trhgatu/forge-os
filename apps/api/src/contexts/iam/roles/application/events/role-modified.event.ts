import { RoleId } from '../../domain/value-objects/role-id.vo';

export class RoleModifiedEvent {
  constructor(
    public readonly roleId: RoleId,
    public readonly action: 'create' | 'update' | 'delete' | 'restore' | 'soft-delete',
  ) {}
}
