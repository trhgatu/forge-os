import { GetAllHabitsHandler } from './get-all-habits/get-all-habits.handler';

export * from './get-all-habits/get-all-habits.query';
export * from './get-all-habits/get-all-habits.handler';

export const QueryHandlers = [GetAllHabitsHandler];
