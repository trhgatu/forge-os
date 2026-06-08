import { CommandHandler, ICommandHandler, CommandBus } from '@nestjs/cqrs';
import { CompleteRoutineCommand } from './complete-routine.command';
import { RoutinesRepository } from '../../../domain/routines.repository';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { AwardXpCommand } from '../../../../../gamification/application/commands/award-xp.command';

@CommandHandler(CompleteRoutineCommand)
export class CompleteRoutineHandler implements ICommandHandler<CompleteRoutineCommand> {
  constructor(
    private readonly repository: RoutinesRepository,
    private readonly commandBus: CommandBus,
  ) {}

  async execute(command: CompleteRoutineCommand): Promise<void> {
    const { userId, routineId } = command;

    const routine = await this.repository.findById(routineId, userId);
    if (!routine || !routine.isActive) {
      throw new NotFoundException('Routine chain not found or inactive');
    }

    const todayStr = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
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

    // Update streak logic
    routine.streak += 1;
    if (routine.streak > routine.maxStreak) {
      routine.maxStreak = routine.streak;
    }
    await this.repository.save(routine);

    // Award Combo XP
    if (routine.comboXp > 0) {
      await this.commandBus.execute(
        new AwardXpCommand(userId, routine.comboXp, `Routine Combo: ${routine.title}`),
      );
    }
  }
}
