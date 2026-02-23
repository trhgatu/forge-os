import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdatePermissionCommand } from '../commands';
import { PermissionRepository } from '../ports/permission.repository';
import { PermissionNotFoundException } from 'src/contexts/iam/auth/domain/exceptions/iam.exceptions';

@CommandHandler(UpdatePermissionCommand)
export class UpdatePermissionHandler implements ICommandHandler<UpdatePermissionCommand> {
  constructor(private readonly permissionRepository: PermissionRepository) {}

  async execute(command: UpdatePermissionCommand) {
    const { id, dto } = command;
    const updated = await this.permissionRepository.update(id, dto);
    if (!updated) throw new PermissionNotFoundException({ id });
    return updated;
  }
}
