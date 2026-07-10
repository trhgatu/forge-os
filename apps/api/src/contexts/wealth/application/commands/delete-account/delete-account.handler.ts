import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';
import { DeleteAccountCommand } from './delete-account.command';
import { WealthRepository } from '../../../domain/wealth.repository';
import { AccountId } from '../../../domain/value-objects/account-id.vo';

@CommandHandler(DeleteAccountCommand)
export class DeleteAccountHandler implements ICommandHandler<
  DeleteAccountCommand,
  { success: boolean }
> {
  constructor(private readonly wealthRepo: WealthRepository) {}

  async execute(command: DeleteAccountCommand): Promise<{ success: boolean }> {
    const accountId = AccountId.fromString(command.id);
    const account = await this.wealthRepo.findAccountById(accountId, command.userId);

    if (!account) {
      throw new NotFoundException('Không tìm thấy tài khoản tài chính.');
    }

    await this.wealthRepo.deleteAccount(accountId, command.userId);
    return { success: true };
  }
}
