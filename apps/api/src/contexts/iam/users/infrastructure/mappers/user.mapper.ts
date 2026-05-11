import { User } from '../../domain/user.entity';
import { UserId } from '../../domain/value-objects/user-id.vo';

export class UserMapper {
  static toDomain(doc: any): User {
    const id = doc.id;
    const roleId = doc.roleId;

    return User.reconstitute({
      id: UserId.create(id),
      name: doc.name,
      email: doc.email,
      password: doc.password,
      roleId: roleId,
      role: UserMapper.extractRole(doc.role),
      refreshToken: doc.refreshToken,
      isDeleted: doc.isDeleted,
      deletedAt: doc.deletedAt,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
      connections: doc.connections || [],
    });
  }

  private static extractRole(
    roleData: any,
  ): { id: string; name: string; permissions: string[] } | undefined {
    if (!roleData) return undefined;

    const id = roleData.id;
    if (!id && typeof roleData !== 'object') return undefined;

    return {
      id: id || '',
      name: roleData.name,
      permissions: Array.isArray(roleData.permissions)
        ? roleData.permissions.map((p: any) =>
            typeof p === 'object' && p && 'name' in p ? p.name : String(p),
          )
        : [],
    };
  }

  static toPersistence(entity: User): any {
    return {
      id: entity.id.toString(),
      name: entity.name,
      email: entity.email,
      password: entity.password,
      roleId: entity.roleId,
      refreshToken: entity.refreshToken,
      isDeleted: entity.isDeleted,
      deletedAt: entity.deletedAt,
      connections: entity.connections.map((c) => ({
        ...c,
        metadata: c.metadata || {},
      })),
    };
  }
}
