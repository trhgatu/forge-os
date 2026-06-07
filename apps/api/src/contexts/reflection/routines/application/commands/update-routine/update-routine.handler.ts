import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { NotFoundException, ForbiddenException } from '@nestjs/common';
import { UpdateRoutineCommand } from './update-routine.command';
import { RoutinesRepository } from '../../../domain/routines.repository';
import { Routine } from '../../../domain/routine.entity';

@CommandHandler(UpdateRoutineCommand)
export class UpdateRoutineHandler implements ICommandHandler<UpdateRoutineCommand> {
  constructor(private readonly repository: RoutinesRepository) {}

  async execute(command: UpdateRoutineCommand): Promise<Routine> {
    const { userId, id, title } = command;

    const routine = await this.repository.findById(id);
    if (!routine) {
      throw new NotFoundException('Routine chain not found');
    }

    if (routine.userId !== userId) {
      throw new ForbiddenException('You do not own this routine chain');
    }

    routine.title = title;

    await this.repository.save(routine);
    return routine;
  }
}
