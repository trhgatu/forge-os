import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteRoleCommand } from '../commands';
import { RoleRepository } from '../ports/role.repository';

@CommandHandler(DeleteRoleCommand)
export class DeleteRoleHandler implements ICommandHandler<DeleteRoleCommand> {
  constructor(private readonly roleRepository: RoleRepository) {}

  async execute(command: DeleteRoleCommand) {
    await this.roleRepository.delete(command.id);
    return { deleted: true };
  }
}
