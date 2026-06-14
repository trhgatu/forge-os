import { Injectable } from '@nestjs/common';
import { Habit } from '../../domain/habit.entity';

@Injectable()
export class HabitPresenter {
  toResponse(habit: Habit) {
    return {
      id: habit.id,
      userId: habit.userId,
      title: habit.title,
      description: habit.description,
      xpReward: habit.xpReward,
      difficulty: habit.difficulty,
      frequency: habit.frequency,
      streak: habit.streak,
      maxStreak: habit.maxStreak,
      habitStrength: habit.habitStrength,
      isActive: habit.isActive,
      actionType: habit.actionType,
      createdAt: habit.createdAt.toISOString(),
      updatedAt: habit.updatedAt.toISOString(),
    };
  }

  toResponseArray(habits: Habit[]) {
    return habits.map((habit) => this.toResponse(habit));
  }
}
