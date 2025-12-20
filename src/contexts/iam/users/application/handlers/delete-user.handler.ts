import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteUserCommand } from '../commands';
import { UserRepository } from '../ports/user.repository';
import { UserNotFoundException } from '../../domain/exceptions/user-not-found.exception';

@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler implements ICommandHandler<DeleteUserCommand> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(command: DeleteUserCommand) {
    const { id } = command;
    const user = await this.userRepository.findById(id);
    if (!user) throw new UserNotFoundException({ id });
    await this.userRepository.delete(id);
    return { deleted: true };
  }
}
