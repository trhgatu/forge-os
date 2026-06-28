import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateSystemConfigCommand } from './update-config.command';
import { ConfigService } from '../../services/config.service';

@CommandHandler(UpdateSystemConfigCommand)
export class UpdateSystemConfigHandler implements ICommandHandler<UpdateSystemConfigCommand> {
  constructor(private readonly configService: ConfigService) {}

  async execute(command: UpdateSystemConfigCommand): Promise<void> {
    await this.configService.set(command.key, command.value);
  }
}
