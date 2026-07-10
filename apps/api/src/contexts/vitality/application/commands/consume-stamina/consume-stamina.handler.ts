import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ConsumeStaminaCommand } from './consume-stamina.command';
import { VitalityRepository } from '../../../domain/vitality.repository';
import { PrismaService } from '@shared/infrastructure/prisma/prisma.service';

@CommandHandler(ConsumeStaminaCommand)
@Injectable()
export class ConsumeStaminaHandler implements ICommandHandler<ConsumeStaminaCommand> {
  constructor(
    private readonly repository: VitalityRepository,
    private readonly prisma: PrismaService,
  ) {}

  async execute(command: ConsumeStaminaCommand): Promise<void> {
    const { userId, amount } = command;
    const now = new Date();

    const vitality = await this.repository.findVitalityByUserId(userId);
    if (!vitality) {
      throw new NotFoundException(`Vitality stats for user ${userId} not found.`);
    }

    // Fetch active effects to check for STOIC_RESOLVE
    const activeEffects = await this.prisma.userStatusEffect.findMany({
      where: {
        userId,
        expiresAt: { gte: now },
      },
      select: { type: true },
    });
    const activeEffectTypes = activeEffects.map((e) => e.type);

    vitality.consumeStamina(amount, activeEffectTypes, now);
    await this.repository.saveVitality(vitality);
  }
}
