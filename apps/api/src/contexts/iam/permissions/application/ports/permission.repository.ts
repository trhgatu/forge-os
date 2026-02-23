import { Permission } from '../../domain/permission.entity';
import { CreatePermissionDto, UpdatePermissionDto } from '../../dto';

import { QueryPermissionDto } from '../../dto';
import { PaginatedResult } from '@shared/interfaces/paginated-result.interface';

export abstract class PermissionRepository {
  abstract create(dto: CreatePermissionDto): Promise<Permission>;
  abstract findAll(
    query: QueryPermissionDto,
  ): Promise<PaginatedResult<Permission>>;
  abstract findById(id: string): Promise<Permission | null>;
  abstract update(
    id: string,
    dto: UpdatePermissionDto,
  ): Promise<Permission | null>;
  abstract delete(id: string): Promise<void>;
  abstract softDelete(id: string): Promise<void>;
  abstract restore(id: string): Promise<void>;
}
