import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from '../index';
import { UserRepository } from '../../ports/user.repository';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(private readonly userRepository: UserRepository) { }

  async execute(command: CreateUserCommand) {
    const { dto } = command;
    // Logic hash password is inside schema Hook, so just create
    return this.userRepository.create(dto);
  }
}

import { UpdateUserCommand } from '../index';
import { UserNotFoundException } from '../../../domain/exceptions/user-not-found.exception';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
  constructor(private readonly userRepository: UserRepository) { }

  async execute(command: UpdateUserCommand) {
    const { id, dto } = command;
    const updated = await this.userRepository.update(id, dto);
    if (!updated) throw new UserNotFoundException({ id });
    return updated;
  }
}

import { DeleteUserCommand } from '../index';

@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler implements ICommandHandler<DeleteUserCommand> {
  constructor(private readonly userRepository: UserRepository) { }

  async execute(command: DeleteUserCommand) {
    const { id } = command;
    const user = await this.userRepository.findById(id);
    if (!user) throw new UserNotFoundException({ id });
    await this.userRepository.delete(id);
    return { deleted: true };
  }
}
