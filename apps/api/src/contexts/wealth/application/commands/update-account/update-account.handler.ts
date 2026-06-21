import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject, NotFoundException } from '@nestjs/common';
import { UpdateAccountCommand } from './update-account.command';
import { WealthRepository } from '../../../domain/wealth.repository';
import { FinancialAccount } from '../../../domain/entities/financial-account.entity';
import { AccountId } from '../../../domain/value-objects/account-id.vo';

@CommandHandler(UpdateAccountCommand)
export class UpdateAccountHandler implements ICommandHandler<
  UpdateAccountCommand,
  FinancialAccount
> {
  constructor(
    @Inject('WealthRepository')
    private readonly wealthRepo: WealthRepository,
  ) {}

  async execute(command: UpdateAccountCommand): Promise<FinancialAccount> {
    const { payload } = command;
    const accountId = AccountId.fromString(payload.id);
    const account = await this.wealthRepo.findAccountById(accountId, payload.userId);

    if (!account) {
      throw new NotFoundException('Không tìm thấy tài khoản tài chính.');
    }

    account.update({
      name: payload.name,
      type: payload.type,
      balance: payload.balance,
    });

    await this.wealthRepo.saveAccount(account);
    return account;
  }
}
