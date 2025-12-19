import { Permission } from '../../infrastructure/schemas/iam-permission.schema';
import { CreatePermissionDto, UpdatePermissionDto } from '../../dto';

export abstract class PermissionRepository {
  abstract create(dto: CreatePermissionDto): Promise<Permission>;
  abstract findAll(query: any): Promise<any>;
  abstract findById(id: string): Promise<Permission | null>;
  abstract update(
    id: string,
    dto: UpdatePermissionDto,
  ): Promise<Permission | null>;
  abstract delete(id: string): Promise<void>;
}
