import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ApplyStatusEffectCommand } from './apply-status-effect.command';
import { StatusEffectRepository } from '../../../domain/ports/status-effect.repository';
import { UserStatusEffect } from '../../../domain/status-effect.entity';

@CommandHandler(ApplyStatusEffectCommand)
export class ApplyStatusEffectHandler implements ICommandHandler<ApplyStatusEffectCommand> {
  constructor(
    @Inject('StatusEffectRepository')
    private readonly repository: StatusEffectRepository,
  ) {}

  async execute(command: ApplyStatusEffectCommand): Promise<void> {
    const { userId, type, durationMinutes, value } = command;
    const now = new Date();
    const expiresAt = new Date(now.getTime() + durationMinutes * 60 * 1000);

    // Remove existing effect of the same type to overwrite/refresh
    await this.repository.delete(userId, type);

    const effect = UserStatusEffect.create({
      userId,
      type,
      value,
      createdAt: now,
      expiresAt,
    });

    await this.repository.save(effect);
  }
}
