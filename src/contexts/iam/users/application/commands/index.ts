// CreateUserCommand
import { CreateUserDto } from '../../dto';
export class CreateUserCommand {
  constructor(public readonly dto: CreateUserDto) {}
}

// UpdateUserCommand
import { UpdateUserDto } from '../../dto';
export class UpdateUserCommand {
  constructor(
    public readonly id: string,
    public readonly dto: UpdateUserDto,
  ) {}
}

// DeleteUserCommand
export class DeleteUserCommand {
  constructor(public readonly id: string) {}
}
