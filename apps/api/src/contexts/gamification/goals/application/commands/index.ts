import { CreateGoalHandler } from './create-goal/create-goal.handler';
import { DeleteGoalHandler } from './delete-goal/delete-goal.handler';
import { UpdateGoalHandler } from './update-goal/update-goal.handler';

export * from './create-goal/create-goal.command';
export * from './create-goal/create-goal.handler';
export * from './delete-goal/delete-goal.command';
export * from './delete-goal/delete-goal.handler';
export * from './update-goal/update-goal.command';
export * from './update-goal/update-goal.handler';

export const CommandHandlers = [CreateGoalHandler, DeleteGoalHandler, UpdateGoalHandler];
