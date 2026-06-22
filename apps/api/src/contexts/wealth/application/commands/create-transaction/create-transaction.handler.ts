import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateTransactionCommand } from './create-transaction.command';
import { WealthRepository } from '../../../domain/wealth.repository';
import { FinancialTransaction } from '../../../domain/entities/financial-transaction.entity';
import { AccountId } from '../../../domain/value-objects/account-id.vo';
import { PrismaService } from '@shared/infrastructure/prisma/prisma.service';
import { TransactionCreatedEvent } from '../../../application/events/transaction-created.event';

@CommandHandler(CreateTransactionCommand)
export class CreateTransactionHandler implements ICommandHandler<
  CreateTransactionCommand,
  FinancialTransaction
> {
  constructor(
    private readonly wealthRepo: WealthRepository,
    private readonly prisma: PrismaService,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: CreateTransactionCommand): Promise<FinancialTransaction> {
    const { payload } = command;
    const accountId = AccountId.fromString(payload.accountId);
    const account = await this.wealthRepo.findAccountById(accountId, payload.userId);

    if (!account) {
      throw new NotFoundException('Không tìm thấy tài khoản tài chính.');
    }

    if (payload.amount <= 0) {
      throw new BadRequestException('Số tiền giao dịch phải lớn hơn 0.');
    }

    const createdTxData = await this.prisma.$transaction(async (tx) => {
      // 1. Tạo giao dịch chính
      const newTx = await tx.financialTransaction.create({
        data: {
          accountId: payload.accountId,
          userId: payload.userId,
          type: payload.type,
          amount: payload.amount,
          category: payload.category,
          categoryType: payload.categoryType,
          description: payload.description,
          reflection: payload.reflection,
          isApprovedByWill: payload.isApprovedByWill ?? true,
        },
      });

      // 2. Cập nhật số dư tài khoản nhận
      let balanceChange = 0;
      if (payload.type === 'INCOME') {
        balanceChange = payload.amount;
      } else if (payload.type === 'EXPENSE') {
        balanceChange = -payload.amount;
      }

      if (balanceChange !== 0) {
        await tx.financialAccount.update({
          where: { id: payload.accountId },
          data: {
            balance: {
              increment: balanceChange,
            },
          },
        });
      }

      // 3. TỰ ĐỘNG PHÂN BỔ
      if (payload.type === 'INCOME') {
        const rules = await tx.autoAllocationRule.findMany({
          where: { userId: payload.userId, sourceAccountId: payload.accountId, isActive: true },
        });

        if (rules.length > 0) {
          for (const rule of rules) {
            const allocationAmount = (Number(payload.amount) * Number(rule.percentage)) / 100;
            if (allocationAmount <= 0) continue;

            await tx.financialTransaction.create({
              data: {
                userId: payload.userId,
                accountId: payload.accountId,
                type: 'TRANSFER',
                amount: allocationAmount,
                category: `Phân bổ đến hũ: ${rule.targetAccountId}`,
                categoryType: 'ESSENTIAL',
                description: `Tự động phân bổ (${Number(rule.percentage)}%)`,
                isApprovedByWill: true,
              },
            });

            // Giảm số dư hũ nguồn
            await tx.financialAccount.update({
              where: { id: payload.accountId },
              data: {
                balance: {
                  decrement: allocationAmount,
                },
              },
            });

            // Tạo giao dịch nhận vào (Transfer In) ở tài khoản đích
            await tx.financialTransaction.create({
              data: {
                userId: payload.userId,
                accountId: rule.targetAccountId,
                type: 'INCOME',
                amount: allocationAmount,
                category: 'Nhận phân bổ tự động',
                categoryType: 'ESSENTIAL',
                description: `Phân bổ tự động từ tài khoản nguồn`,
                isApprovedByWill: true,
              },
            });

            // Tăng số dư hũ đích
            await tx.financialAccount.update({
              where: { id: rule.targetAccountId },
              data: {
                balance: {
                  increment: allocationAmount,
                },
              },
            });
          }
        }
      }

      return newTx;
    });

    const transaction = FinancialTransaction.createFromPersistence(
      {
        userId: createdTxData.userId,
        accountId: createdTxData.accountId,
        type: createdTxData.type as any,
        amount: Number(createdTxData.amount),
        category: createdTxData.category,
        categoryType: createdTxData.categoryType,
        description: createdTxData.description ?? undefined,
        reflection: createdTxData.reflection ?? undefined,
        isApprovedByWill: createdTxData.isApprovedByWill,
        loggedAt: createdTxData.loggedAt,
        createdAt: createdTxData.createdAt,
      },
      createdTxData.id,
    );

    await this.eventBus.publish(
      new TransactionCreatedEvent(
        transaction.id.value,
        payload.userId,
        !!(payload.reflection && payload.reflection.trim().length > 0),
      ),
    );

    // Calibrate Character Stats
    try {
      let stats = await this.prisma.userStats.findUnique({ where: { userId: payload.userId } });
      if (!stats) {
        stats = await this.prisma.userStats.create({
          data: {
            userId: payload.userId,
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

      if (payload.type === 'INCOME') {
        disciplineAdded = 1;
      } else if (payload.type === 'EXPENSE') {
        if (payload.categoryType === 'ESSENTIAL') {
          disciplineAdded = 2;
        } else if (payload.categoryType === 'COMFORT') {
          disciplineAdded = 1;
        } else if (payload.categoryType === 'INDULGENCE') {
          if (payload.isApprovedByWill) {
            willpowerAdded = 2;
          }
          if (payload.reflection && payload.reflection.trim().length > 0) {
            awarenessAdded += 4;
            willpowerAdded += 2;
          }
        }
      }

      if (disciplineAdded > 0 || willpowerAdded > 0 || awarenessAdded > 0) {
        await this.prisma.userStats.update({
          where: { userId: payload.userId },
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
}
