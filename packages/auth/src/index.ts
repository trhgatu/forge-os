export { PermissionEnum } from './enums/permissions';
export { RoleEnum, UserStatus } from './enums/iam';
export type { User, Role } from './interfaces/user.interface';
export type { UserStats, UserStatsDto } from './interfaces/stats.interface';

export const hasPermission = (userPermissions: string[], requiredPermission: string): boolean => {
  return userPermissions.includes(requiredPermission);
};

export const hasAnyPermission = (userPermissions: string[], requiredPermissions: string[]): boolean => {
  return requiredPermissions.some(permission => userPermissions.includes(permission));
};
