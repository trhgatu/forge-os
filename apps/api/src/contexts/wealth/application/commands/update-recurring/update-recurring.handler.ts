import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject, NotFoundException } from '@nestjs/common';
import { UpdateRecurringCommand } from './update-recurring.command';
import { WealthRepository } from '../../../domain/wealth.repository';
import { RecurringTransaction } from '../../../domain/entities/recurring-transaction.entity';
import { RecurringTransactionId } from '../../../domain/value-objects/recurring-transaction-id.vo';
import { AccountId } from '../../../domain/value-objects/account-id.vo';

@CommandHandler(UpdateRecurringCommand)
export class UpdateRecurringHandler implements ICommandHandler<
  UpdateRecurringCommand,
  RecurringTransaction
> {
  constructor(
    @Inject('WealthRepository')
    private readonly wealthRepo: WealthRepository,
  ) {}

  async execute(command: UpdateRecurringCommand): Promise<RecurringTransaction> {
    const { payload } = command;
    const recId = RecurringTransactionId.fromString(payload.id);
    const record = await this.wealthRepo.findRecurringTransactionById(recId, payload.userId);

    if (!record) {
      throw new NotFoundException('Không tìm thấy giao dịch định kỳ.');
    }

    if (payload.accountId) {
      const accountId = AccountId.fromString(payload.accountId);
      const account = await this.wealthRepo.findAccountById(accountId, payload.userId);
      if (!account) {
        throw new NotFoundException('Không tìm thấy tài khoản tài chính.');
      }
    }

    record.update({
      accountId: payload.accountId,
      type: payload.type,
      amount: payload.amount,
      category: payload.category,
      categoryType: payload.categoryType,
      description: payload.description,
      dayOfMonth: payload.dayOfMonth,
      isActive: payload.isActive,
    });

    await this.wealthRepo.saveRecurringTransaction(record);
    return record;
  }
}
