import { CreatePermissionDto } from '../../dto';
import { ICommand } from '@nestjs/cqrs';

export class CreatePermissionCommand implements ICommand {
  constructor(public readonly dto: CreatePermissionDto) {}
}
