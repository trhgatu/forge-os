import { Routine } from './routine.entity';

export abstract class RoutinesRepository {
  abstract save(routine: Routine): Promise<void>;
  abstract findById(id: string, userId?: string): Promise<Routine | null>;
  abstract findAll(userId: string): Promise<Routine[]>;
  abstract addHabitToRoutine(routineId: string, habitId: string, order: number): Promise<void>;
  abstract removeHabitFromRoutine(routineId: string, habitId: string): Promise<void>;
}
