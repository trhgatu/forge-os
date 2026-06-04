import { GetTasksHandler } from './get-tasks/get-tasks.handler';
import { GetTaskByIdHandler } from './get-task-by-id/get-task-by-id.handler';

export * from './get-tasks/get-tasks.query';
export * from './get-tasks/get-tasks.handler';
export * from './get-task-by-id/get-task-by-id.query';
export * from './get-task-by-id/get-task-by-id.handler';

export const QueryHandlers = [GetTasksHandler, GetTaskByIdHandler];
