import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetPermissionByIdQuery } from '../queries';
import { PermissionRepository } from '../ports/permission.repository';
// Using generic NotFoundException as in legacy, or should upgrade?
// Legacy used imports from common.
// Let's use PermissionNotFoundException from auth/domain/exceptions/iam.exceptions to be consistent
import { PermissionNotFoundException } from 'src/contexts/iam/auth/domain/exceptions/iam.exceptions';

@QueryHandler(GetPermissionByIdQuery)
export class GetPermissionByIdHandler implements IQueryHandler<GetPermissionByIdQuery> {
  constructor(private readonly permissionRepository: PermissionRepository) {}

  async execute(query: GetPermissionByIdQuery) {
    const permission = await this.permissionRepository.findById(query.id);
    if (!permission) throw new PermissionNotFoundException({ id: query.id });
    return permission;
  }
}
