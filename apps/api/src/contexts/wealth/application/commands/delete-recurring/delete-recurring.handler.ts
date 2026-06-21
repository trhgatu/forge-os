import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject, NotFoundException } from '@nestjs/common';
import { DeleteRecurringCommand } from './delete-recurring.command';
import { WealthRepository } from '../../../domain/wealth.repository';
import { RecurringTransactionId } from '../../../domain/value-objects/recurring-transaction-id.vo';

@CommandHandler(DeleteRecurringCommand)
export class DeleteRecurringHandler implements ICommandHandler<
  DeleteRecurringCommand,
  { success: boolean }
> {
  constructor(
    @Inject('WealthRepository')
    private readonly wealthRepo: WealthRepository,
  ) {}

  async execute(command: DeleteRecurringCommand): Promise<{ success: boolean }> {
    const recId = RecurringTransactionId.fromString(command.id);
    const record = await this.wealthRepo.findRecurringTransactionById(recId, command.userId);

    if (!record) {
      throw new NotFoundException('Không tìm thấy giao dịch định kỳ.');
    }

    await this.wealthRepo.deleteRecurringTransaction(recId, command.userId);
    return { success: true };
  }
}
