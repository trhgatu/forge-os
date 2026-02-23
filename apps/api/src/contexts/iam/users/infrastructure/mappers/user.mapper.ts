import { User } from '../../domain/user.entity';
import { UserId } from '../../domain/value-objects/user-id.vo';
import { UserDocument } from '../schemas/iam-user.schema';
import { Types } from 'mongoose';

export class UserMapper {
  static toDomain(doc: UserDocument): User {
    return User.reconstitute({
      id: UserId.create(doc._id.toString()),
      name: doc.name,
      email: doc.email,
      password: doc.password,
      roleId: doc.roleId.toString(),
      role: UserMapper.extractRole(doc.roleId),
      refreshToken: doc.refreshToken,
      isDeleted: doc.isDeleted,
      deletedAt: doc.deletedAt,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
      connections: doc.connections || [],
    });
  }

  private static extractRole(
    roleOrId: Types.ObjectId | unknown,
  ): { id: string; name: string; permissions: string[] } | undefined {
    if (!roleOrId) return undefined;
    if (roleOrId instanceof Types.ObjectId) return undefined;

    // Type narrowing for populated object
    if (
      typeof roleOrId === 'object' &&
      roleOrId !== null &&
      'name' in roleOrId &&
      'permissions' in roleOrId
    ) {
      // Safe to treat as object with known shape roughly
      const role = roleOrId as {
        _id?: Types.ObjectId;
        name: string;
        permissions: unknown[];
      };

      return {
        id: role._id?.toString() || '',
        name: role.name,
        permissions: Array.isArray(role.permissions)
          ? role.permissions.map((p) =>
              typeof p === 'object' && p && 'name' in p ? (p as { name: string }).name : String(p),
            )
          : [],
      };
    }
    return undefined;
  }

  static toPersistence(entity: User): Partial<UserDocument> {
    return {
      _id: new Types.ObjectId(entity.id.toString()),
      name: entity.name,
      email: entity.email,
      password: entity.password,
      roleId: new Types.ObjectId(entity.roleId),
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
