import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AddHabitToRoutineCommand } from './add-habit-to-routine.command';
import { RoutinesRepository } from '../../../domain/routines.repository';
import { NotFoundException } from '@nestjs/common';
import { RoutineId } from '../../../domain/value-objects/routine-id.vo';

@CommandHandler(AddHabitToRoutineCommand)
export class AddHabitToRoutineHandler implements ICommandHandler<AddHabitToRoutineCommand> {
  constructor(private readonly repository: RoutinesRepository) {}

  async execute(command: AddHabitToRoutineCommand): Promise<void> {
    const { userId, routineId, habitId, order } = command;
    const rId = RoutineId.fromString(routineId);

    const routine = await this.repository.findById(rId, userId);
    if (!routine) {
      throw new NotFoundException('Routine not found');
    }

    await this.repository.addHabitToRoutine(routineId, habitId, order);
  }
}
