import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { RestorePermissionCommand } from '../commands';
import { PermissionRepository } from '../ports/permission.repository';
import { PermissionNotFoundException } from '../../../auth/domain/exceptions/iam.exceptions';
import { PermissionModifiedEvent } from '../events/permission-modified.event';

@CommandHandler(RestorePermissionCommand)
export class RestorePermissionHandler implements ICommandHandler<RestorePermissionCommand> {
  constructor(
    private readonly permissionRepository: PermissionRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: RestorePermissionCommand) {
    const { id } = command;
    const permission = await this.permissionRepository.findById(id);
    if (!permission) throw new PermissionNotFoundException({ id });

    if (!permission.isDeleted) {
      return { restored: false };
    }

    await this.permissionRepository.restore(id);
    this.eventBus.publish(new PermissionModifiedEvent(permission.id, 'restore'));
    return { restored: true };
  }
}
