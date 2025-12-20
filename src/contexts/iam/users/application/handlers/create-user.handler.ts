import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from '../commands';
import { UserRepository } from '../ports/user.repository';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(command: CreateUserCommand) {
    const { dto } = command;
    // Logic hash password is inside schema Hook, so just create
    return this.userRepository.create(dto);
  }
}
