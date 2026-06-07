import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';
import { ReorderHabitsCommand } from './reorder-habits.command';
import { RoutinesRepository } from '../../../domain/routines.repository';

@CommandHandler(ReorderHabitsCommand)
export class ReorderHabitsHandler implements ICommandHandler<ReorderHabitsCommand> {
  constructor(private readonly repository: RoutinesRepository) {}

  async execute(command: ReorderHabitsCommand): Promise<void> {
    const { userId, routineId, orders } = command;

    const routine = await this.repository.findById(routineId, userId);
    if (!routine) {
      throw new NotFoundException('Routine chain not found');
    }

    // Cập nhật từng thói quen trong database
    for (const item of orders) {
      await this.repository.addHabitToRoutine(routineId, item.habitId, item.order);
    }
  }
}
