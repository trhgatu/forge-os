import { PermissionId } from '../../domain/value-objects/permission-id.vo';

export class PermissionModifiedEvent {
  constructor(
    public readonly permissionId: PermissionId,
    public readonly action:
      | 'create'
      | 'update'
      | 'delete'
      | 'restore'
      | 'soft-delete',
  ) {}
}
