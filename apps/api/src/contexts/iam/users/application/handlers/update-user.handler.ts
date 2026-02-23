import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { UpdateUserCommand } from '../commands';
import { UserModifiedEvent } from '../events/user-modified.event';
import { UserRepository } from '../ports/user.repository';
import { UserNotFoundException } from '../../domain/exceptions/user-not-found.exception';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: UpdateUserCommand) {
    const { id, dto } = command;
    const updated = await this.userRepository.update(id, dto);
    if (!updated) throw new UserNotFoundException({ id });
    this.eventBus.publish(new UserModifiedEvent(updated.id, 'update'));
    return updated; // Returns User Entity
  }
}
