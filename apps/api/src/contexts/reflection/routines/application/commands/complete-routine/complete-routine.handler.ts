import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { CompleteRoutineCommand } from './complete-routine.command';
import { RoutinesRepository } from '../../../domain/routines.repository';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { RoutineCompletedEvent } from '../../../domain/events/routine-completed.event';

@CommandHandler(CompleteRoutineCommand)
export class CompleteRoutineHandler implements ICommandHandler<CompleteRoutineCommand> {
  constructor(
    private readonly repository: RoutinesRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: CompleteRoutineCommand): Promise<void> {
    const { userId, routineId } = command;

    const routine = await this.repository.findById(routineId, userId);
    if (!routine || !routine.isActive) {
      throw new NotFoundException('Routine chain not found or inactive');
    }

    const todayStr = new Date().toISOString().split('T')[0];
    const alreadyCompleted = await this.repository.hasCompletedRoutineToday(
      userId,
      routineId,
      todayStr,
    );

    if (alreadyCompleted) {
      throw new BadRequestException('Routine chain already completed today');
    }

    const completedAt = new Date();
    await this.repository.saveRoutineCompletion(userId, routineId, completedAt);

    routine.streak += 1;
    if (routine.streak > routine.maxStreak) {
      routine.maxStreak = routine.streak;
    }
    await this.repository.save(routine);

    this.eventBus.publish(
      new RoutineCompletedEvent(userId, routineId, routine.comboXp, completedAt),
    );
  }
}
