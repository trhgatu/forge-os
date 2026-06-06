import { CreateTaskHandler } from './create-task/create-task.handler';
import { UpdateTaskHandler } from './update-task/update-task.handler';
import { DeleteTaskHandler } from './delete-task/delete-task.handler';

export * from './create-task/create-task.command';
export * from './create-task/create-task.handler';
export * from './update-task/update-task.command';
export * from './update-task/update-task.handler';
export * from './delete-task/delete-task.command';
export * from './delete-task/delete-task.handler';

export const CommandHandlers = [CreateTaskHandler, UpdateTaskHandler, DeleteTaskHandler];
