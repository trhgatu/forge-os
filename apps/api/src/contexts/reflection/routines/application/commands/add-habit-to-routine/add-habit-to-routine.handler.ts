import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AddHabitToRoutineCommand } from './add-habit-to-routine.command';
import { RoutinesRepository } from '../../../domain/routines.repository';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(AddHabitToRoutineCommand)
export class AddHabitToRoutineHandler implements ICommandHandler<AddHabitToRoutineCommand> {
  constructor(private readonly repository: RoutinesRepository) {}

  async execute(command: AddHabitToRoutineCommand): Promise<void> {
    const { userId, routineId, habitId, order } = command;

    const routine = await this.repository.findById(routineId, userId);
    if (!routine) {
      throw new NotFoundException('Routine not found');
    }

    await this.repository.addHabitToRoutine(routineId, habitId, order);
  }
}
