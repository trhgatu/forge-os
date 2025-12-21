import { UpdatePermissionDto } from '../../dto';
import { ICommand } from '@nestjs/cqrs';

export class UpdatePermissionCommand implements ICommand {
  constructor(
    public readonly id: string,
    public readonly dto: UpdatePermissionDto,
  ) {}
}
