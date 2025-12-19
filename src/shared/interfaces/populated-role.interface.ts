// shared/interfaces/populated-role.interface.ts
import { PermissionDocument } from 'src/contexts/iam/permissions/infrastructure/schemas/iam-permission.schema';

export interface PopulatedRole {
  permissions: (PermissionDocument | string)[];
}
