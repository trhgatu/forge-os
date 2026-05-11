import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { RestoreUserCommand } from '../commands';
import { UserRepository } from '../ports/user.repository';
import { UserNotFoundException } from '../../domain/exceptions/user-not-found.exception';
import { UserModifiedEvent } from '../events/user-modified.event';

@CommandHandler(RestoreUserCommand)
export class RestoreUserHandler implements ICommandHandler<RestoreUserCommand> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: RestoreUserCommand) {
    const { id } = command;

    const user = await this.userRepository.findById(id);
    if (!user) throw new UserNotFoundException({ id });

    await this.userRepository.restore(id);
    this.eventBus.publish(new UserModifiedEvent(user.id, 'restore'));
    return { restored: true };
  }
}
