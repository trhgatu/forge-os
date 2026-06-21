import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CreateBudgetCommand } from './create-budget.command';
import { WealthRepository } from '../../../domain/wealth.repository';
import { Budget } from '../../../domain/entities/budget.entity';
import { PrismaService } from '@shared/infrastructure/prisma/prisma.service';

@CommandHandler(CreateBudgetCommand)
export class CreateBudgetHandler implements ICommandHandler<CreateBudgetCommand, Budget> {
  constructor(
    @Inject('WealthRepository')
    private readonly wealthRepo: WealthRepository,
    private readonly prisma: PrismaService,
  ) {}

  async execute(command: CreateBudgetCommand): Promise<Budget> {
    const { payload } = command;

    const existingBudget = await this.prisma.financialBudget.findFirst({
      where: {
        userId: payload.userId,
        categoryType: payload.categoryType,
        startDate: { lte: payload.startDate },
        endDate: { gte: payload.endDate },
      },
    });

    if (existingBudget) {
      const budget = Budget.createFromPersistence(
        {
          userId: existingBudget.userId,
          categoryType: existingBudget.categoryType,
          limitAmount: payload.limitAmount,
          spentAmount: Number(existingBudget.spentAmount),
          period: existingBudget.period,
          startDate: existingBudget.startDate,
          endDate: existingBudget.endDate,
          createdAt: existingBudget.createdAt,
          updatedAt: new Date(),
        },
        existingBudget.id,
      );

      await this.wealthRepo.saveBudget(budget);
      return budget;
    }

    const spentAggregate = await this.prisma.financialTransaction.aggregate({
      where: {
        userId: payload.userId,
        type: 'EXPENSE',
        categoryType: payload.categoryType,
        loggedAt: {
          gte: payload.startDate,
          lte: payload.endDate,
        },
      },
      _sum: {
        amount: true,
      },
    });

    const spentAmount = Number(spentAggregate._sum.amount ?? 0);

    const budget = Budget.create({
      userId: payload.userId,
      categoryType: payload.categoryType,
      limitAmount: payload.limitAmount,
      spentAmount,
      period: payload.period ?? 'monthly',
      startDate: payload.startDate,
      endDate: payload.endDate,
    });

    await this.wealthRepo.saveBudget(budget);
    return budget;
  }
}
