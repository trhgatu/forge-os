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
    // We cannot use findById because it might filter out deleted users depending on implementation,
    // but our current findById implementation in Repo does return them?
    // Actually standard findById returns document regardless of soft delete unless strict filter applied.
    // However, logic might change.
    // In our Repo implementation:
    // async findById(id: string): Promise<UserEntity | null> {
    //   const user = await this.userModel.findById(id).populate('roleId');
    //   return user ? UserMapper.toDomain(user) : null;
    // }
    // Mongoose findById does NOT filter by arbitrary fields like isDeleted by default.

    const user = await this.userRepository.findById(id);
    if (!user) throw new UserNotFoundException({ id });

    await this.userRepository.restore(id);
    this.eventBus.publish(new UserModifiedEvent(user.id, 'restore'));
    return { restored: true };
  }
}
