import { PermissionEnum } from '../enums/permissions';

export interface Role {
  id: string;
  name: string;
  permissions: PermissionEnum[] | string[];
}

export interface User {
  id: string;
  email: string;
  name?: string;
  role: Role;
  isActive: boolean;
  createdAt: string;
}
