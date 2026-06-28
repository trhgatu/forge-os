import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { NotFoundException, ForbiddenException } from '@nestjs/common';
import { UpdateRoutineCommand } from './update-routine.command';
import { RoutinesRepository } from '../../../domain/routines.repository';
import { Routine } from '../../../domain/routine.entity';
import { RoutineId } from '../../../domain/value-objects/routine-id.vo';

@CommandHandler(UpdateRoutineCommand)
export class UpdateRoutineHandler implements ICommandHandler<UpdateRoutineCommand> {
  constructor(private readonly repository: RoutinesRepository) {}

  async execute(command: UpdateRoutineCommand): Promise<Routine> {
    const { userId, id, title, comboXp, targetTime, frequency } = command;
    const rId = RoutineId.fromString(id);

    const routine = await this.repository.findById(rId);
    if (!routine) {
      throw new NotFoundException('Routine chain not found');
    }

    if (routine.userId !== userId) {
      throw new ForbiddenException('You do not own this routine chain');
    }

    const updateData: any = {};
    if (title !== undefined) updateData.title = title;
    if (comboXp !== undefined) updateData.comboXp = comboXp;
    if (targetTime !== undefined) updateData.targetTime = targetTime;
    if (frequency !== undefined) updateData.frequency = frequency;

    routine.update(updateData);

    await this.repository.save(routine);
    return routine;
  }
}
