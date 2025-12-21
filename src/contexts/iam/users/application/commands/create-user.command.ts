import { CreateUserDto } from '../../dto';
import { ICommand } from '@nestjs/cqrs';

export class CreateUserCommand implements ICommand {
  constructor(public readonly dto: CreateUserDto) {}
}
