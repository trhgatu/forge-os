import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  CreatePermissionCommand,
  UpdatePermissionCommand,
  DeletePermissionCommand,
} from '../index';
import { PermissionRepository } from '../../ports/permission.repository';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(CreatePermissionCommand)
export class CreatePermissionHandler
  implements ICommandHandler<CreatePermissionCommand>
{
  constructor(private readonly permissionRepository: PermissionRepository) {}

  async execute(command: CreatePermissionCommand) {
    return this.permissionRepository.create(command.dto);
  }
}

@CommandHandler(UpdatePermissionCommand)
export class UpdatePermissionHandler
  implements ICommandHandler<UpdatePermissionCommand>
{
  constructor(private readonly permissionRepository: PermissionRepository) {}

  async execute(command: UpdatePermissionCommand) {
    const { id, dto } = command;
    const updated = await this.permissionRepository.update(id, dto);
    if (!updated) throw new NotFoundException('Permission not found');
    return updated;
  }
}

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
