import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateRoutineCommand } from './create-routine.command';
import { RoutinesRepository } from '../../../domain/routines.repository';
import { Routine } from '../../../domain/routine.entity';
import { v4 as uuidv4 } from 'uuid';

@CommandHandler(CreateRoutineCommand)
export class CreateRoutineHandler implements ICommandHandler<CreateRoutineCommand> {
  constructor(private readonly repository: RoutinesRepository) {}

  async execute(command: CreateRoutineCommand): Promise<Routine> {
    const { userId, title, comboXp, targetTime, frequency } = command;

    const routine = Routine.create({
      id: uuidv4(),
      userId,
      title,
      comboXp,
      targetTime,
      frequency,
    });

    await this.repository.save(routine);
    return routine;
  }
}
