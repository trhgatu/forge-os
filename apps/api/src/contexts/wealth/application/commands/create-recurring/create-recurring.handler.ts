import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject, NotFoundException } from '@nestjs/common';
import { CreateRecurringCommand } from './create-recurring.command';
import { WealthRepository } from '../../../domain/wealth.repository';
import { RecurringTransaction } from '../../../domain/entities/recurring-transaction.entity';
import { AccountId } from '../../../domain/value-objects/account-id.vo';

@CommandHandler(CreateRecurringCommand)
export class CreateRecurringHandler implements ICommandHandler<
  CreateRecurringCommand,
  RecurringTransaction
> {
  constructor(
    @Inject('WealthRepository')
    private readonly wealthRepo: WealthRepository,
  ) {}

  async execute(command: CreateRecurringCommand): Promise<RecurringTransaction> {
    const { payload } = command;
    const accountId = AccountId.fromString(payload.accountId);
    const account = await this.wealthRepo.findAccountById(accountId, payload.userId);

    if (!account) {
      throw new NotFoundException('Không tìm thấy tài khoản tài chính.');
    }

    const rec = RecurringTransaction.create({
      userId: payload.userId,
      accountId: payload.accountId,
      type: payload.type,
      amount: payload.amount,
      category: payload.category,
      categoryType: payload.categoryType,
      description: payload.description,
      dayOfMonth: payload.dayOfMonth,
    });

    await this.wealthRepo.saveRecurringTransaction(rec);
    return rec;
  }
}
