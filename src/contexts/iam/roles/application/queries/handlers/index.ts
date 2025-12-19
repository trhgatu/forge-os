import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetRolesQuery, GetRoleByIdQuery } from '../index';
import { RoleRepository } from '../../ports/role.repository';
import { NotFoundException } from '@nestjs/common';

@QueryHandler(GetRolesQuery)
export class GetRolesHandler implements IQueryHandler<GetRolesQuery> {
  constructor(private readonly roleRepository: RoleRepository) {}

  async execute(query: GetRolesQuery) {
    return this.roleRepository.findAll(query.dto);
  }
}

@QueryHandler(GetRoleByIdQuery)
export class GetRoleByIdHandler implements IQueryHandler<GetRoleByIdQuery> {
  constructor(private readonly roleRepository: RoleRepository) {}

  async execute(query: GetRoleByIdQuery) {
    const role = await this.roleRepository.findById(query.id);
    if (!role) throw new NotFoundException('Role not found');
    return role;
  }
}
