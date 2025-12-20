import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreatePermissionCommand } from '../commands';
import { PermissionRepository } from '../ports/permission.repository';

@CommandHandler(CreatePermissionCommand)
export class CreatePermissionHandler
  implements ICommandHandler<CreatePermissionCommand>
{
  constructor(private readonly permissionRepository: PermissionRepository) {}

  async execute(command: CreatePermissionCommand) {
    return this.permissionRepository.create(command.dto);
  }
}
