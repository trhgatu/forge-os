import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { RemoveStatusEffectCommand } from './remove-status-effect.command';
import { StatusEffectRepository } from '../../../domain/ports/status-effect.repository';

@CommandHandler(RemoveStatusEffectCommand)
export class RemoveStatusEffectHandler implements ICommandHandler<RemoveStatusEffectCommand> {
  constructor(
    @Inject('StatusEffectRepository')
    private readonly repository: StatusEffectRepository,
  ) {}

  async execute(command: RemoveStatusEffectCommand): Promise<void> {
    const { userId, type } = command;
    await this.repository.delete(userId, type);
  }
}
