import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';
import { ReorderHabitsCommand } from './reorder-habits.command';
import { RoutinesRepository } from '../../../domain/routines.repository';
import { RoutineId } from '../../../domain/value-objects/routine-id.vo';

@CommandHandler(ReorderHabitsCommand)
export class ReorderHabitsHandler implements ICommandHandler<ReorderHabitsCommand> {
  constructor(private readonly repository: RoutinesRepository) {}

  async execute(command: ReorderHabitsCommand): Promise<void> {
    const { userId, routineId, orders } = command;
    const rId = RoutineId.fromString(routineId);

    const routine = await this.repository.findById(rId, userId);
    if (!routine) {
      throw new NotFoundException('Routine chain not found');
    }

    for (const item of orders) {
      await this.repository.addHabitToRoutine(routineId, item.habitId, item.order);
    }
  }
}
