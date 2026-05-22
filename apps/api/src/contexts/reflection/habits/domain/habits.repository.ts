import { Habit } from './habit.entity';

export abstract class HabitsRepository {
  abstract saveHabit(habit: Habit): Promise<void>;
  abstract findHabitById(id: string, userId?: string): Promise<Habit | null>;
  abstract findAllHabits(userId: string): Promise<Habit[]>;
  abstract saveHabitCompletion(userId: string, habitId: string, completedAt: Date): Promise<void>;
  abstract hasCompletedHabitToday(
    userId: string,
    habitId: string,
    dateStr: string,
  ): Promise<boolean>;
}
