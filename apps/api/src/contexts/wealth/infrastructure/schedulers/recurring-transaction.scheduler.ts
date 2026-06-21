import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CommandBus } from '@nestjs/cqrs';
import { PrismaService } from '@shared/infrastructure/prisma/prisma.service';
import { CreateTransactionCommand } from '../../application/commands/create-transaction/create-transaction.command';

@Injectable()
export class RecurringTransactionScheduler {
  private readonly logger = new Logger(RecurringTransactionScheduler.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly commandBus: CommandBus,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleRecurringInflows() {
    this.logger.log('Starting daily processing of recurring transactions...');

    try {
      const today = new Date();
      const currentDay = today.getDate();

      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);
      const isLastDayOfMonth = tomorrow.getDate() === 1;

      const activeRecs = await this.prisma.recurringTransaction.findMany({
        where: { isActive: true },
      });

      this.logger.log(`Found ${activeRecs.length} active recurring transactions in total.`);

      for (const rec of activeRecs) {
        const shouldTrigger =
          rec.dayOfMonth === currentDay || (rec.dayOfMonth > currentDay && isLastDayOfMonth);

        if (!shouldTrigger) {
          continue;
        }

        this.logger.log(
          `Processing recurring transaction: ${rec.category} (${rec.amount} VND) for user: ${rec.userId} on account: ${rec.accountId}`,
        );

        const startOfToday = new Date(today);
        startOfToday.setHours(0, 0, 0, 0);

        const endOfToday = new Date(today);
        endOfToday.setHours(23, 59, 59, 999);

        const alreadyProcessed = await this.prisma.financialTransaction.findFirst({
          where: {
            accountId: rec.accountId,
            userId: rec.userId,
            type: 'INCOME',
            amount: rec.amount,
            category: rec.category,
            createdAt: {
              gte: startOfToday,
              lte: endOfToday,
            },
          },
        });

        if (alreadyProcessed) {
          this.logger.log(
            `Recurring transaction '${rec.category}' already processed today. Skipping.`,
          );
          continue;
        }
        await this.commandBus.execute(
          new CreateTransactionCommand({
            accountId: rec.accountId,
            userId: rec.userId,
            type: rec.type as 'INCOME' | 'EXPENSE',
            amount: Number(rec.amount),
            category: rec.category,
            categoryType: rec.categoryType as 'ESSENTIAL' | 'COMFORT' | 'INDULGENCE',
            description: rec.description || undefined,
            isApprovedByWill: true,
          }),
        );

        this.logger.log(`Successfully processed recurring transaction: ${rec.category}`);
      }
    } catch (error) {
      this.logger.error('Error processing recurring transactions:', error);
    }
  }
}
