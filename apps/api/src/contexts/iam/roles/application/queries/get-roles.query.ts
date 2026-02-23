import { QueryRoleDto } from '../../dto';
import { IQuery } from '@nestjs/cqrs';

export class GetRolesQuery implements IQuery {
  constructor(public readonly dto: QueryRoleDto) {}
}
