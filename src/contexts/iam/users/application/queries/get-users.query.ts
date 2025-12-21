import { QueryUserDto } from '../../dto';
import { IQuery } from '@nestjs/cqrs';

export class GetUsersQuery implements IQuery {
  constructor(public readonly dto: QueryUserDto) {}
}
