import { Habit } from './habit.entity';
import { HabitId } from './value-objects/habit-id.vo';

export abstract class HabitsRepository {
  abstract saveHabit(habit: Habit): Promise<void>;
  abstract findHabitById(id: HabitId, userId?: string): Promise<Habit | null>;
  abstract findAllHabits(userId: string): Promise<Habit[]>;
  abstract saveHabitCompletion(userId: string, habitId: string, completedAt: Date): Promise<void>;
  abstract hasCompletedHabitToday(
    userId: string,
    habitId: string,
    dateStr: string,
  ): Promise<boolean>;
  abstract findByActionType(userId: string, actionType: string): Promise<Habit[]>;
  abstract deleteHabit(id: HabitId, userId: string): Promise<void>;
}
