export * from './task-completed.event';
export * from './task-completed.handler';

import { TaskCompletedHandler } from './task-completed.handler';

export const TaskEventHandlers = [TaskCompletedHandler];
