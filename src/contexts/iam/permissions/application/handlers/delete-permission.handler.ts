import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeletePermissionCommand } from '../commands';
import { PermissionRepository } from '../ports/permission.repository';

@CommandHandler(DeletePermissionCommand)
export class DeletePermissionHandler
  implements ICommandHandler<DeletePermissionCommand>
{
  constructor(private readonly permissionRepository: PermissionRepository) {}

  async execute(command: DeletePermissionCommand) {
    await this.permissionRepository.delete(command.id);
    return { deleted: true };
  }
}
