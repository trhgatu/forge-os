// shared/interfaces/populated-role.interface.ts
import { PermissionDocument } from '@modules/permission/permission.schema';

export interface PopulatedRole {
  permissions: (PermissionDocument | string)[];
}
