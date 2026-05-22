import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RoutinesRepository } from '../../domain/routines.repository';
import { Routine } from '../../domain/routine.entity';
import { v4 as uuidv4 } from 'uuid';

export class CreateRoutineCommand {
  constructor(
    public readonly userId: string,
    public readonly title: string,
    public readonly comboXp: number | undefined,
  ) {}
}

@CommandHandler(CreateRoutineCommand)
export class CreateRoutineHandler implements ICommandHandler<CreateRoutineCommand> {
  constructor(private readonly repository: RoutinesRepository) {}

  async execute(command: CreateRoutineCommand): Promise<Routine> {
    const { userId, title, comboXp } = command;

    const routine = Routine.create({
      id: uuidv4(),
      userId,
      title,
      comboXp,
    });

    await this.repository.save(routine);
    return routine;
  }
}
