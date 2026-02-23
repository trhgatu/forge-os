import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { DeleteRoleCommand } from '../commands';
import { RoleModifiedEvent } from '../events/role-modified.event';
import { RoleRepository } from '../ports/role.repository';
import { RoleNotFoundException } from 'src/contexts/iam/auth/domain/exceptions/iam.exceptions';

@CommandHandler(DeleteRoleCommand)
export class DeleteRoleHandler implements ICommandHandler<DeleteRoleCommand> {
  constructor(
    private readonly roleRepository: RoleRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: DeleteRoleCommand) {
    const existing = await this.roleRepository.findById(command.id);
    if (!existing) throw new RoleNotFoundException({ id: command.id });
    await this.roleRepository.softDelete(command.id);
    this.eventBus.publish(new RoleModifiedEvent(existing.id, 'soft-delete'));
    return { deleted: true };
  }
}
