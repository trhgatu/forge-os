import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateUserCommand } from '../commands';
import { UserRepository } from '../ports/user.repository';
import { UserNotFoundException } from '../../domain/exceptions/user-not-found.exception';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(command: UpdateUserCommand) {
    const { id, dto } = command;
    const updated = await this.userRepository.update(id, dto);
    if (!updated) throw new UserNotFoundException({ id });
    return updated; // Returns User Entity
  }
}
