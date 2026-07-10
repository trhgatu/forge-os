import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';
import { DeleteBudgetCommand } from './delete-budget.command';
import { WealthRepository } from '../../../domain/wealth.repository';
import { BudgetId } from '../../../domain/value-objects/budget-id.vo';

@CommandHandler(DeleteBudgetCommand)
export class DeleteBudgetHandler implements ICommandHandler<
  DeleteBudgetCommand,
  { success: boolean }
> {
  constructor(private readonly wealthRepo: WealthRepository) {}

  async execute(command: DeleteBudgetCommand): Promise<{ success: boolean }> {
    const budgetId = BudgetId.fromString(command.id);
    const budget = await this.wealthRepo.findBudgetById(budgetId, command.userId);

    if (!budget) {
      throw new NotFoundException('Không tìm thấy ngân sách.');
    }

    await this.wealthRepo.deleteBudget(budgetId, command.userId);
    return { success: true };
  }
}
