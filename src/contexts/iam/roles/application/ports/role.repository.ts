import { Role } from '../../domain/role.entity';
import { CreateRoleDto, UpdateRoleDto } from '../../dto';

import { QueryRoleDto } from '../../dto';
import { PaginatedResult } from '@shared/interfaces/paginated-result.interface';

export abstract class RoleRepository {
  abstract create(dto: CreateRoleDto): Promise<Role>;
  abstract findAll(query: QueryRoleDto): Promise<PaginatedResult<Role>>;
  abstract findById(id: string): Promise<Role | null>;
  abstract update(id: string, dto: UpdateRoleDto): Promise<Role | null>;
  abstract delete(id: string): Promise<void>;
  abstract softDelete(id: string): Promise<void>;
  abstract restore(id: string): Promise<void>;
}
