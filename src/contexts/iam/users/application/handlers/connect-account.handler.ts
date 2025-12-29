import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ConnectAccountCommand } from '../commands/connect-account.command';
import { UserRepository } from '../../application/ports/user.repository';
import { Logger } from '@nestjs/common';
import { UserNotFoundException } from '../../domain/exceptions/user-not-found.exception';

@CommandHandler(ConnectAccountCommand)
export class ConnectAccountHandler
  implements ICommandHandler<ConnectAccountCommand>
{
  private readonly logger = new Logger(ConnectAccountHandler.name);

  constructor(private readonly userRepository: UserRepository) {}

  async execute(command: ConnectAccountCommand): Promise<void> {
    const { userId, provider, identifier, metadata } = command;

    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new UserNotFoundException({ userId });
    }

    user.addConnection({
      provider,
      identifier,
      metadata,
      connectedAt: new Date(),
    });

    // Update via Repository using primitives
    await this.userRepository.update(user.id.toString(), {
      connections: user.connections,
    });

    this.logger.log(
      `Connected account ${provider}:${identifier} to user ${userId}`,
    );
  }
}
