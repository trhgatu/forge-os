import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RoutinesRepository } from '../../domain/routines.repository';
import { NotFoundException } from '@nestjs/common';

export class AddHabitToRoutineCommand {
  constructor(
    public readonly userId: string,
    public readonly routineId: string,
    public readonly habitId: string,
    public readonly order: number,
  ) {}
}

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
