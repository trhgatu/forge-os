import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { CreateUserCommand } from '../commands';
import { UserModifiedEvent } from '../events/user-modified.event';
import { UserRepository } from '../ports/user.repository';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: CreateUserCommand) {
    const { dto } = command;
    // Logic hash password is inside schema Hook, so just create
    const user = await this.userRepository.create(dto);
    this.eventBus.publish(new UserModifiedEvent(user.id, 'create'));
    return user;
  }
}
