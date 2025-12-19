import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetPermissionsQuery, GetPermissionByIdQuery } from '../index';
import { PermissionRepository } from '../../ports/permission.repository';
import { NotFoundException } from '@nestjs/common';

@QueryHandler(GetPermissionsQuery)
export class GetPermissionsHandler
  implements IQueryHandler<GetPermissionsQuery>
{
  constructor(private readonly permissionRepository: PermissionRepository) {}

  async execute(query: GetPermissionsQuery) {
    return this.permissionRepository.findAll(query.dto);
  }
}

@QueryHandler(GetPermissionByIdQuery)
export class GetPermissionByIdHandler
  implements IQueryHandler<GetPermissionByIdQuery>
{
  constructor(private readonly permissionRepository: PermissionRepository) {}

  async execute(query: GetPermissionByIdQuery) {
    const permission = await this.permissionRepository.findById(query.id);
    if (!permission) throw new NotFoundException('Permission not found');
    return permission;
  }
}
