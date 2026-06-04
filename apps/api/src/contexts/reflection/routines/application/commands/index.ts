import { CreateRoutineHandler } from './create-routine/create-routine.handler';
import { AddHabitToRoutineHandler } from './add-habit-to-routine/add-habit-to-routine.handler';

export * from './create-routine/create-routine.command';
export * from './create-routine/create-routine.handler';
export * from './add-habit-to-routine/add-habit-to-routine.command';
export * from './add-habit-to-routine/add-habit-to-routine.handler';

export const CommandHandlers = [CreateRoutineHandler, AddHabitToRoutineHandler];
