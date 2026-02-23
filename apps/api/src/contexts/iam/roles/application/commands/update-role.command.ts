import { UpdateRoleDto } from '../../dto';
import { ICommand } from '@nestjs/cqrs';

export class UpdateRoleCommand implements ICommand {
  constructor(
    public readonly id: string,
    public readonly dto: UpdateRoleDto,
  ) {}
}
