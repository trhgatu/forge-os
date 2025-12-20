import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteRoleCommand } from '../commands';
import { RoleRepository } from '../ports/role.repository';
import { RoleNotFoundException } from 'src/contexts/iam/auth/domain/exceptions/iam.exceptions';

@CommandHandler(DeleteRoleCommand)
export class DeleteRoleHandler implements ICommandHandler<DeleteRoleCommand> {
  constructor(private readonly roleRepository: RoleRepository) {}

  async execute(command: DeleteRoleCommand) {
    const existing = await this.roleRepository.findById(command.id);
    if (!existing) throw new RoleNotFoundException({ id: command.id });
    await this.roleRepository.delete(command.id);
    return { deleted: true };
  }
}
