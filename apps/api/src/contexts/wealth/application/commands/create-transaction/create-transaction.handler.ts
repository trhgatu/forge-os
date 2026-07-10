import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateTransactionCommand } from './create-transaction.command';
import { WealthRepository } from '../../../domain/wealth.repository';
import { FinancialTransaction } from '../../../domain/entities/financial-transaction.entity';
import { FinancialAccount } from '../../../domain/entities/financial-account.entity';
import { AccountId } from '../../../domain/value-objects/account-id.vo';
import { TransactionCreatedEvent } from '../../../application/events/transaction-created.event';

@CommandHandler(CreateTransactionCommand)
export class CreateTransactionHandler implements ICommandHandler<
  CreateTransactionCommand,
  FinancialTransaction
> {
  constructor(
    private readonly wealthRepo: WealthRepository,
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

    // 1. Create main transaction entity
    const transaction = FinancialTransaction.create({
      userId: payload.userId,
      accountId: payload.accountId,
      type: payload.type,
      amount: payload.amount,
      category: payload.category,
      categoryType: payload.categoryType,
      description: payload.description ?? undefined,
      reflection: payload.reflection ?? undefined,
      isApprovedByWill: payload.isApprovedByWill ?? true,
    });

    // 2. Adjust main account balance
    let balanceChange = 0;
    if (payload.type === 'INCOME') {
      balanceChange = payload.amount;
    } else if (payload.type === 'EXPENSE') {
      balanceChange = -payload.amount;
    }

    if (balanceChange !== 0) {
      account.adjustBalance(balanceChange);
    }

    // 3. Handle Auto Allocation
    const allocations: {
      targetAccount: FinancialAccount;
      transferTx: FinancialTransaction;
      incomeTx: FinancialTransaction;
    }[] = [];

    if (payload.type === 'INCOME') {
      const rules = await this.wealthRepo.findAllocationRulesBySource(
        payload.userId,
        payload.accountId,
      );
      const activeRules = rules.filter((r) => r.isActive);

      if (activeRules.length > 0) {
        for (const rule of activeRules) {
          const allocationAmount = (Number(payload.amount) * Number(rule.percentage)) / 100;
          if (allocationAmount <= 0) continue;

          // Load target account
          const targetAccountId = AccountId.fromString(rule.targetAccountId);
          const targetAccount = await this.wealthRepo.findAccountById(
            targetAccountId,
            payload.userId,
          );
          if (!targetAccount) continue;

          // Adjust main account (deduct allocated amount)
          account.adjustBalance(-allocationAmount);

          // Adjust target account (add allocated amount)
          targetAccount.adjustBalance(allocationAmount);

          // Create transfer out transaction from source account
          const transferTx = FinancialTransaction.create({
            userId: payload.userId,
            accountId: payload.accountId,
            type: 'TRANSFER',
            amount: allocationAmount,
            category: `Phân bổ đến hũ: ${rule.targetAccountId}`,
            categoryType: 'ESSENTIAL',
            description: `Tự động phân bổ (${Number(rule.percentage)}%)`,
            isApprovedByWill: true,
          });

          // Create income transaction into target account
          const incomeTx = FinancialTransaction.create({
            userId: payload.userId,
            accountId: rule.targetAccountId,
            type: 'INCOME',
            amount: allocationAmount,
            category: 'Nhận phân bổ tự động',
            categoryType: 'ESSENTIAL',
            description: `Phân bổ tự động từ tài khoản nguồn`,
            isApprovedByWill: true,
          });

          allocations.push({
            targetAccount,
            transferTx,
            incomeTx,
          });
        }
      }
    }

    // 4. Save transaction and accounts inside unit of work (handled by repository transaction)
    await this.wealthRepo.saveTransactionWithAllocations(transaction, account, allocations);

    // 5. Publish event asynchronously to decouple gamification
    await this.eventBus.publish(
      new TransactionCreatedEvent(
        transaction.id.value,
        payload.userId,
        payload.type,
        payload.categoryType,
        payload.isApprovedByWill ?? true,
        !!(payload.reflection && payload.reflection.trim().length > 0),
      ),
    );

    return transaction;
  }
}
