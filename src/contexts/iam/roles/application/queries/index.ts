import { QueryRoleDto } from '../../dto';

export class GetRolesQuery {
  constructor(public readonly dto: QueryRoleDto) {}
}

export class GetRoleByIdQuery {
  constructor(public readonly id: string) {}
}
