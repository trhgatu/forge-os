// guards/permissions.guard.ts
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS_KEY } from '../decorators/permissions.decorator';
import { PopulatedRole } from '@shared/interfaces/populated-role.interface';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredPermissions) return true;

    const req = context.switchToHttp().getRequest();
    const user = req.user;
    if (!user || !user.roleId) {
      throw new ForbiddenException('Permission denied');
    }

    const role = user.roleId as PopulatedRole;

    if (!role.permissions || !Array.isArray(role.permissions)) {
      throw new ForbiddenException('Permission denied');
    }

    const userPermissions = role.permissions.map((p) =>
      typeof p === 'string' ? p : p.name,
    );

    const hasAllPermissions = requiredPermissions.every((perm) =>
      userPermissions.includes(perm),
    );

    if (!hasAllPermissions) {
      throw new ForbiddenException('Permission denied');
    }

    return true;
  }
}
