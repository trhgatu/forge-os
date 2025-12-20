import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeletePermissionCommand } from '../commands';
import { PermissionRepository } from '../ports/permission.repository';
import { PermissionNotFoundException } from 'src/contexts/iam/auth/domain/exceptions/iam.exceptions';

@CommandHandler(DeletePermissionCommand)
export class DeletePermissionHandler
  implements ICommandHandler<DeletePermissionCommand>
{
  constructor(private readonly permissionRepository: PermissionRepository) {}

  async execute(command: DeletePermissionCommand) {
    const existing = await this.permissionRepository.findById(command.id);
    if (!existing) throw new PermissionNotFoundException({ id: command.id });
    await this.permissionRepository.delete(command.id);
    return { deleted: true };
  }
}
