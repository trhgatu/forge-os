import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { DeleteUserCommand } from '../commands';
import { UserModifiedEvent } from '../events/user-modified.event';
import { UserRepository } from '../ports/user.repository';
import { UserNotFoundException } from '../../domain/exceptions/user-not-found.exception';

@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler implements ICommandHandler<DeleteUserCommand> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: DeleteUserCommand) {
    const { id } = command;
    const user = await this.userRepository.findById(id);
    if (!user) throw new UserNotFoundException({ id });
    await this.userRepository.softDelete(id);
    this.eventBus.publish(new UserModifiedEvent(user.id, 'soft-delete'));
    return { deleted: true };
  }
}
