import { QueryPermissionDto } from '../../dto';

export class GetPermissionsQuery {
  constructor(public readonly dto: QueryPermissionDto) {}
}

export class GetPermissionByIdQuery {
  constructor(public readonly id: string) {}
}
