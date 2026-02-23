import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { CreatePermissionCommand } from '../commands';
import { PermissionModifiedEvent } from '../events/permission-modified.event';
import { PermissionRepository } from '../ports/permission.repository';

@CommandHandler(CreatePermissionCommand)
export class CreatePermissionHandler implements ICommandHandler<CreatePermissionCommand> {
  constructor(
    private readonly permissionRepository: PermissionRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: CreatePermissionCommand) {
    const permission = await this.permissionRepository.create(command.dto);
    this.eventBus.publish(new PermissionModifiedEvent(permission.id, 'create'));
    return permission;
  }
}
