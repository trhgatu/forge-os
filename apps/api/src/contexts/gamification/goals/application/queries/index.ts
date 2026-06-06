import { GetGoalsHandler } from './get-goals/get-goals.handler';
import { GetGoalByIdHandler } from './get-goal-by-id/get-goal-by-id.handler';

export * from './get-goals/get-goals.query';
export * from './get-goals/get-goals.handler';
export * from './get-goal-by-id/get-goal-by-id.query';
export * from './get-goal-by-id/get-goal-by-id.handler';

export const QueryHandlers = [GetGoalsHandler, GetGoalByIdHandler];
