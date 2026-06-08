import { Routine } from './routine.entity';

export abstract class RoutinesRepository {
  abstract save(routine: Routine): Promise<void>;
  abstract findById(id: string, userId?: string): Promise<Routine | null>;
  abstract findAll(userId: string): Promise<Routine[]>;
  abstract addHabitToRoutine(routineId: string, habitId: string, order: number): Promise<void>;
  abstract removeHabitFromRoutine(routineId: string, habitId: string): Promise<void>;
  abstract delete(id: string, userId: string): Promise<void>;
  abstract saveRoutineCompletion(
    userId: string,
    routineId: string,
    completedAt: Date,
  ): Promise<void>;
  abstract hasCompletedRoutineToday(
    userId: string,
    routineId: string,
    dateStr: string,
  ): Promise<boolean>;
}
