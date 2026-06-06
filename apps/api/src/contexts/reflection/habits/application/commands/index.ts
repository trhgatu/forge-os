import { CreateHabitHandler } from './create-habit/create-habit.handler';
import { CompleteHabitHandler } from './complete-habit/complete-habit.handler';

export * from './create-habit/create-habit.command';
export * from './create-habit/create-habit.handler';
export * from './complete-habit/complete-habit.command';
export * from './complete-habit/complete-habit.handler';

export const CommandHandlers = [CreateHabitHandler, CompleteHabitHandler];
