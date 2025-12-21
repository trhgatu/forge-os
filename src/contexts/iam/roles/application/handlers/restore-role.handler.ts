import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { RestoreRoleCommand } from '../commands';
import { RoleRepository } from '../ports/role.repository';
import { RoleNotFoundException } from '../../../auth/domain/exceptions/iam.exceptions';
import { RoleModifiedEvent } from '../events/role-modified.event';

@CommandHandler(RestoreRoleCommand)
export class RestoreRoleHandler implements ICommandHandler<RestoreRoleCommand> {
  constructor(
    private readonly roleRepository: RoleRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: RestoreRoleCommand) {
    const { id } = command;
    const role = await this.roleRepository.findById(id);
    if (!role) throw new RoleNotFoundException({ id });

    await this.roleRepository.restore(id);
    this.eventBus.publish(new RoleModifiedEvent(role.id, 'restore'));
    return { restored: true };
  }
}
