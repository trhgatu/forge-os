import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateRoutineCommand } from './create-routine.command';
import { RoutinesRepository } from '../../../domain/routines.repository';
import { Routine } from '../../../domain/routine.entity';
import { RoutineId } from '../../../domain/value-objects/routine-id.vo';

@CommandHandler(CreateRoutineCommand)
export class CreateRoutineHandler implements ICommandHandler<CreateRoutineCommand> {
  constructor(private readonly repository: RoutinesRepository) {}

  async execute(command: CreateRoutineCommand): Promise<Routine> {
    const { userId, title, comboXp, targetTime, frequency } = command;

    const routine = Routine.create(
      {
        userId,
        title,
        comboXp,
        targetTime,
        frequency,
      },
      RoutineId.create(),
    );

    await this.repository.save(routine);
    return routine;
  }
}
