import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateRoleCommand } from '../commands';
import { RoleRepository } from '../ports/role.repository';
// Use the shared IAM exception if possible, or define dedicated one?
// Legacy used imports from auth/domain/exceptions/iam.exceptions
// I should verify where RoleNotFoundException is.
// Step 1767 showed: import { RoleNotFoundException } from 'src/contexts/iam/auth/domain/exceptions/iam.exceptions';
import { RoleNotFoundException } from 'src/contexts/iam/auth/domain/exceptions/iam.exceptions';

@CommandHandler(UpdateRoleCommand)
export class UpdateRoleHandler implements ICommandHandler<UpdateRoleCommand> {
  constructor(private readonly roleRepository: RoleRepository) {}

  async execute(command: UpdateRoleCommand) {
    const { id, dto } = command;
    const updated = await this.roleRepository.update(id, dto);
    if (!updated) throw new RoleNotFoundException({ id });
    return updated;
  }
}
