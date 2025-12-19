import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  CreateRoleCommand,
  UpdateRoleCommand,
  DeleteRoleCommand,
} from '../index';
import { RoleRepository } from '../../ports/role.repository';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(CreateRoleCommand)
export class CreateRoleHandler implements ICommandHandler<CreateRoleCommand> {
  constructor(private readonly roleRepository: RoleRepository) {}

  async execute(command: CreateRoleCommand) {
    return this.roleRepository.create(command.dto);
  }
}

@CommandHandler(UpdateRoleCommand)
export class UpdateRoleHandler implements ICommandHandler<UpdateRoleCommand> {
  constructor(private readonly roleRepository: RoleRepository) {}

  async execute(command: UpdateRoleCommand) {
    const { id, dto } = command;
    const updated = await this.roleRepository.update(id, dto);
    if (!updated) throw new NotFoundException('Role not found');
    return updated;
  }
}

@CommandHandler(DeleteRoleCommand)
export class DeleteRoleHandler implements ICommandHandler<DeleteRoleCommand> {
  constructor(private readonly roleRepository: RoleRepository) {}

  async execute(command: DeleteRoleCommand) {
    await this.roleRepository.delete(command.id);
    return { deleted: true };
  }
}
