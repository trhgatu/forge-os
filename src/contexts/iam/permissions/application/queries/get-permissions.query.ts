import { QueryPermissionDto } from '../../dto';
import { IQuery } from '@nestjs/cqrs';

export class GetPermissionsQuery implements IQuery {
  constructor(public readonly dto: QueryPermissionDto) {}
}
