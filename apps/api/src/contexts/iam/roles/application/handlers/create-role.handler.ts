import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { CreateRoleCommand } from '../commands';
import { RoleModifiedEvent } from '../events/role-modified.event';
import { RoleRepository } from '../ports/role.repository';

@CommandHandler(CreateRoleCommand)
export class CreateRoleHandler implements ICommandHandler<CreateRoleCommand> {
  constructor(
    private readonly roleRepository: RoleRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: CreateRoleCommand) {
    const role = await this.roleRepository.create(command.dto);
    this.eventBus.publish(new RoleModifiedEvent(role.id, 'create'));
    return role;
  }
}
