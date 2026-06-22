import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateAccountCommand } from './create-account.command';
import { WealthRepository } from '../../../domain/wealth.repository';
import { FinancialAccount } from '../../../domain/entities/financial-account.entity';

@CommandHandler(CreateAccountCommand)
export class CreateAccountHandler implements ICommandHandler<
  CreateAccountCommand,
  FinancialAccount
> {
  constructor(private readonly wealthRepo: WealthRepository) {}

  async execute(command: CreateAccountCommand): Promise<FinancialAccount> {
    const { payload } = command;
    const account = FinancialAccount.create({
      userId: payload.userId,
      name: payload.name,
      type: payload.type,
      balance: payload.balance,
      currency: payload.currency,
    });

    await this.wealthRepo.saveAccount(account);
    return account;
  }
}
