import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '@shared/infrastructure/prisma/prisma.service';
import { AssetType, ExpenseCategoryType } from '@prisma/client';
import { EventBus } from '@nestjs/cqrs';
import { TransactionCreatedEvent } from '../events/transaction-created.event';
import { TransactionReflectionUpdatedEvent } from '../events/transaction-reflection-updated.event';

@Injectable()
export class WealthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly eventBus: EventBus,
  ) {}
  async createAccount(
    userId: string,
    data: {
      name: string;
      type: AssetType;
      balance?: number;
      currency?: string;
    },
  ) {
    return this.prisma.financialAccount.create({
      data: {
        userId,
        name: data.name,
        type: data.type,
        balance: data.balance ?? 0,
        currency: data.currency ?? 'VND',
      },
    });
  }

  async getAccounts(userId: string) {
    return this.prisma.financialAccount.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async deleteAccount(userId: string, id: string) {
    const account = await this.prisma.financialAccount.findFirst({
      where: { id, userId },
    });

    if (!account) {
      throw new NotFoundException('Không tìm thấy tài khoản tài chính.');
    }

    await this.prisma.financialAccount.delete({
      where: { id },
    });

    return { success: true };
  }

  async createTransaction(
    userId: string,
    data: {
      accountId: string;
      type: 'INCOME' | 'EXPENSE' | 'TRANSFER';
      amount: number;
      category: string;
      categoryType: ExpenseCategoryType;
      description?: string;
      reflection?: string;
      isApprovedByWill?: boolean;
    },
  ) {
    const account = await this.prisma.financialAccount.findFirst({
      where: { id: data.accountId, userId },
    });

    if (!account) {
      throw new NotFoundException('Không tìm thấy tài khoản tài chính.');
    }

    if (data.amount <= 0) {
      throw new BadRequestException('Số tiền giao dịch phải lớn hơn 0.');
    }
    const transaction = await this.prisma.$transaction(async (tx) => {
      const newTx = await tx.financialTransaction.create({
        data: {
          userId,
          accountId: data.accountId,
          type: data.type,
          amount: data.amount,
          category: data.category,
          categoryType: data.categoryType,
          description: data.description,
          reflection: data.reflection,
          isApprovedByWill: data.isApprovedByWill ?? true,
        },
      });
      let balanceChange = 0;
      if (data.type === 'INCOME') {
        balanceChange = data.amount;
      } else if (data.type === 'EXPENSE') {
        balanceChange = -data.amount;
      }

      if (balanceChange !== 0) {
        await tx.financialAccount.update({
          where: { id: data.accountId },
          data: {
            balance: {
              increment: balanceChange,
            },
          },
        });
      }

      return newTx;
    });

    await this.eventBus.publish(
      new TransactionCreatedEvent(
        transaction.id,
        userId,
        !!(data.reflection && data.reflection.trim().length > 0),
      ),
    );

    try {
      // 2. Calibrate Core Character Attributes (Stoic Stat gains)
      let stats = await this.prisma.userStats.findUnique({ where: { userId } });
      if (!stats) {
        stats = await this.prisma.userStats.create({
          data: {
            userId,
            xp: 0,
            level: 1,
            title: 'Novice',
            streak: 0,
            lastActivityDate: new Date(),
            achievements: [],
            discipline: 0,
            consistency: 0,
            willpower: 0,
            awareness: 0,
            presence: 0,
          },
        });
      }

      let disciplineAdded = 0;
      let willpowerAdded = 0;
      let awarenessAdded = 0;

      if (data.type === 'INCOME') {
        disciplineAdded = 1;
      } else if (data.type === 'EXPENSE') {
        if (data.categoryType === 'ESSENTIAL') {
          disciplineAdded = 2;
        } else if (data.categoryType === 'COMFORT') {
          disciplineAdded = 1;
        } else if (data.categoryType === 'INDULGENCE') {
          if (data.isApprovedByWill) {
            willpowerAdded = 2;
          }
          if (data.reflection && data.reflection.trim().length > 0) {
            awarenessAdded += 4;
            willpowerAdded += 2;
          }
        }
      }

      if (disciplineAdded > 0 || willpowerAdded > 0 || awarenessAdded > 0) {
        await this.prisma.userStats.update({
          where: { userId },
          data: {
            discipline: { increment: disciplineAdded },
            willpower: { increment: willpowerAdded },
            awareness: { increment: awarenessAdded },
            lastActivityDate: new Date(),
          },
        });
      }
    } catch (gamiError) {
      console.error('Failed to update gamification stats for transaction:', gamiError);
    }

    return transaction;
  }

  async getTransactions(
    userId: string,
    filters?: {
      accountId?: string;
      type?: string;
      categoryType?: ExpenseCategoryType;
    },
  ) {
    return this.prisma.financialTransaction.findMany({
      where: {
        userId,
        ...(filters?.accountId ? { accountId: filters.accountId } : {}),
        ...(filters?.type ? { type: filters.type } : {}),
        ...(filters?.categoryType ? { categoryType: filters.categoryType } : {}),
      },
      orderBy: { loggedAt: 'desc' },
      include: {
        account: {
          select: { name: true, type: true },
        },
      },
    });
  }

  async deleteTransaction(userId: string, id: string) {
    const txRecord = await this.prisma.financialTransaction.findFirst({
      where: { id, userId },
    });

    if (!txRecord) {
      throw new NotFoundException('Không tìm thấy giao dịch tài chính.');
    }

    // Hoàn tác số dư tài khoản khi xóa giao dịch
    await this.prisma.$transaction(async (tx) => {
      let balanceChange = 0;
      const amountNum = Number(txRecord.amount);

      if (txRecord.type === 'INCOME') {
        balanceChange = -amountNum; // Trừ lại tiền thu nhập
      } else if (txRecord.type === 'EXPENSE') {
        balanceChange = amountNum; // Cộng lại tiền đã chi tiêu
      }

      if (balanceChange !== 0) {
        await tx.financialAccount.update({
          where: { id: txRecord.accountId },
          data: {
            balance: {
              increment: balanceChange,
            },
          },
        });
      }

      await tx.financialTransaction.delete({
        where: { id },
      });
    });

    return { success: true };
  }

  async createOrUpdateBudget(
    userId: string,
    data: {
      categoryType: ExpenseCategoryType;
      limitAmount: number;
      period?: string;
      startDate: Date;
      endDate: Date;
    },
  ) {
    // Tìm budget hiện tại của chu kỳ này
    const existingBudget = await this.prisma.financialBudget.findFirst({
      where: {
        userId,
        categoryType: data.categoryType,
        startDate: { lte: data.startDate },
        endDate: { gte: data.endDate },
      },
    });

    if (existingBudget) {
      return this.prisma.financialBudget.update({
        where: { id: existingBudget.id },
        data: {
          limitAmount: data.limitAmount,
        },
      });
    }

    // Tính toán số tiền đã tiêu trong chu kỳ này cho hạng mục đó
    const spentAggregate = await this.prisma.financialTransaction.aggregate({
      where: {
        userId,
        type: 'EXPENSE',
        categoryType: data.categoryType,
        loggedAt: {
          gte: data.startDate,
          lte: data.endDate,
        },
      },
      _sum: {
        amount: true,
      },
    });

    const spentAmount = Number(spentAggregate._sum.amount ?? 0);

    return this.prisma.financialBudget.create({
      data: {
        userId,
        categoryType: data.categoryType,
        limitAmount: data.limitAmount,
        spentAmount,
        period: data.period ?? 'monthly',
        startDate: data.startDate,
        endDate: data.endDate,
      },
    });
  }

  async getBudgets(userId: string) {
    return this.prisma.financialBudget.findMany({
      where: { userId },
      orderBy: { startDate: 'desc' },
    });
  }

  async deleteBudget(userId: string, id: string) {
    const budget = await this.prisma.financialBudget.findFirst({
      where: { id, userId },
    });

    if (!budget) {
      throw new NotFoundException('Không tìm thấy ngân sách.');
    }

    await this.prisma.financialBudget.delete({
      where: { id },
    });

    return { success: true };
  }

  async updateTransactionReflection(userId: string, id: string, reflection: string) {
    const txRecord = await this.prisma.financialTransaction.findFirst({
      where: { id, userId },
    });

    if (!txRecord) {
      throw new NotFoundException('Không tìm thấy giao dịch tài chính.');
    }

    const updatedTx = await this.prisma.financialTransaction.update({
      where: { id },
      data: { reflection },
    });

    // Publish TransactionReflectionUpdatedEvent to decouple wealth module from gamification quests
    this.eventBus.publish(new TransactionReflectionUpdatedEvent(updatedTx.id, userId));

    // Calibrate Core Character Attributes (Stoic Stat gains)
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

    return updatedTx;
  }
}
