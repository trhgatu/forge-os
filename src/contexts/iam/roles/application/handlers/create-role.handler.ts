import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateRoleCommand } from '../commands';
import { RoleRepository } from '../ports/role.repository';

@CommandHandler(CreateRoleCommand)
export class CreateRoleHandler implements ICommandHandler<CreateRoleCommand> {
  constructor(private readonly roleRepository: RoleRepository) {}

  async execute(command: CreateRoleCommand) {
    return this.roleRepository.create(command.dto);
  }
}
