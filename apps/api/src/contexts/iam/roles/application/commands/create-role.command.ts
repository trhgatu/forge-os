import { CreateRoleDto } from '../../dto';
import { ICommand } from '@nestjs/cqrs';

export class CreateRoleCommand implements ICommand {
  constructor(public readonly dto: CreateRoleDto) {}
}
