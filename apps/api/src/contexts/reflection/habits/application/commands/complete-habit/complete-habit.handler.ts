import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { CompleteHabitCommand } from './complete-habit.command';
import { HabitsRepository } from '../../../domain/habits.repository';
import { HabitCompletedEvent } from '../../../domain/events/habit-completed.event';
import { NotFoundException, BadRequestException } from '@nestjs/common';

@CommandHandler(CompleteHabitCommand)
export class CompleteHabitHandler implements ICommandHandler<CompleteHabitCommand> {
  constructor(
    private readonly repository: HabitsRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: CompleteHabitCommand): Promise<void> {
    const { userId, habitId } = command;

    const habit = await this.repository.findHabitById(habitId, userId);
    if (!habit || !habit.isActive) {
      throw new NotFoundException('Habit not found or inactive');
    }

    const todayStr = new Date().toISOString().split('T')[0];
    const alreadyCompleted = await this.repository.hasCompletedHabitToday(
      userId,
      habitId,
      todayStr,
    );
    if (alreadyCompleted) {
      throw new BadRequestException('Habit already completed today');
    }

    const completedAt = new Date();
    await this.repository.saveHabitCompletion(userId, habitId, completedAt);

    habit.streak += 1;
    if (habit.streak > habit.maxStreak) {
      habit.maxStreak = habit.streak;
    }
    habit.habitStrength = Math.min(100, habit.habitStrength + 5);
    await this.repository.saveHabit(habit);

    this.eventBus.publish(
      new HabitCompletedEvent(userId, habitId, habit.title, habit.xpReward, completedAt),
    );
  }
}
