import { CreateHabitHandler } from './create-habit/create-habit.handler';
import { CompleteHabitHandler } from './complete-habit/complete-habit.handler';
import { UpdateHabitHandler } from './update-habit/update-habit.handler';
import { DeleteHabitHandler } from './delete-habit/delete-habit.handler';

export * from './create-habit/create-habit.command';
export * from './create-habit/create-habit.handler';
export * from './complete-habit/complete-habit.command';
export * from './complete-habit/complete-habit.handler';
export * from './update-habit/update-habit.command';
export * from './update-habit/update-habit.handler';
export * from './delete-habit/delete-habit.command';
export * from './delete-habit/delete-habit.handler';

export const CommandHandlers = [
  CreateHabitHandler,
  CompleteHabitHandler,
  UpdateHabitHandler,
  DeleteHabitHandler,
];
