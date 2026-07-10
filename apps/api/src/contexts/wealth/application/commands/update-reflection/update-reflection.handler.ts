import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';
import { UpdateReflectionCommand } from './update-reflection.command';
import { WealthRepository } from '../../../domain/wealth.repository';
import { TransactionId } from '../../../domain/value-objects/transaction-id.vo';
import { FinancialTransaction } from '../../../domain/entities/financial-transaction.entity';
import { PrismaService } from '@shared/infrastructure/prisma/prisma.service';
import { TransactionReflectionUpdatedEvent } from '../../../application/events/transaction-reflection-updated.event';

@CommandHandler(UpdateReflectionCommand)
export class UpdateReflectionHandler implements ICommandHandler<
  UpdateReflectionCommand,
  FinancialTransaction
> {
  constructor(
    private readonly wealthRepo: WealthRepository,
    private readonly prisma: PrismaService,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: UpdateReflectionCommand): Promise<FinancialTransaction> {
    const { id, userId, reflection } = command;
    const txId = TransactionId.fromString(id);
    const transaction = await this.wealthRepo.findTransactionById(txId, userId);

    if (!transaction) {
      throw new NotFoundException('Không tìm thấy giao dịch tài chính.');
    }

    transaction.updateReflection(reflection);
    await this.wealthRepo.saveTransaction(transaction);

    // Publish event
    this.eventBus.publish(new TransactionReflectionUpdatedEvent(transaction.id.value, userId));

    // Calibrate Character Stats
    try {
      const stats = await this.prisma.userStats.findUnique({ where: { userId } });
      if (stats) {
        await this.prisma.userStats.update({
          where: { userId },
          data: {
            awareness: { increment: 5 },
            willpower: { increment: 2 },
            lastActivityDate: new Date(),
          },
        });
      }
    } catch (gamiError) {
      console.error('Failed to update gamification stats for reflection:', gamiError);
    }

    return transaction;
  }
}
