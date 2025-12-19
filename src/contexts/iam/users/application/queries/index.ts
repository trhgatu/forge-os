// GetUsersQuery
import { QueryUserDto } from '../../dto';
export class GetUsersQuery {
  constructor(public readonly dto: QueryUserDto) {}
}

// GetUserByIdQuery
export class GetUserByIdQuery {
  constructor(public readonly id: string) {}
}
