import { CreateRoutineHandler } from './create-routine/create-routine.handler';
import { AddHabitToRoutineHandler } from './add-habit-to-routine/add-habit-to-routine.handler';
import { DeleteRoutineHandler } from './delete-routine/delete-routine.handler';
import { UpdateRoutineHandler } from './update-routine/update-routine.handler';
import { ReorderHabitsHandler } from './reorder-habits/reorder-habits.handler';
import { CompleteRoutineHandler } from './complete-routine/complete-routine.handler';

export * from './create-routine/create-routine.command';
export * from './create-routine/create-routine.handler';
export * from './add-habit-to-routine/add-habit-to-routine.command';
export * from './add-habit-to-routine/add-habit-to-routine.handler';
export * from './delete-routine/delete-routine.command';
export * from './delete-routine/delete-routine.handler';
export * from './update-routine/update-routine.command';
export * from './update-routine/update-routine.handler';
export * from './reorder-habits/reorder-habits.command';
export * from './reorder-habits/reorder-habits.handler';
export * from './complete-routine/complete-routine.command';
export * from './complete-routine/complete-routine.handler';

export const CommandHandlers = [
  CreateRoutineHandler,
  AddHabitToRoutineHandler,
  DeleteRoutineHandler,
  UpdateRoutineHandler,
  ReorderHabitsHandler,
  CompleteRoutineHandler,
];
