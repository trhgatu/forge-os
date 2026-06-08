import { CreateQuestHandler } from './create-quest/create-quest.handler';
import { DeleteQuestHandler } from './delete-quest/delete-quest.handler';
import { IncrementObjectiveProgressHandler } from './increment-objective-progress/increment-objective-progress.handler';
import { UpdateQuestHandler } from './update-quest/update-quest.handler';

export * from './create-quest/create-quest.command';
export * from './create-quest/create-quest.handler';
export * from './delete-quest/delete-quest.command';
export * from './delete-quest/delete-quest.handler';
export * from './increment-objective-progress/increment-objective-progress.command';
export * from './increment-objective-progress/increment-objective-progress.handler';
export * from './update-quest/update-quest.command';
export * from './update-quest/update-quest.handler';

export const CommandHandlers = [
  CreateQuestHandler,
  DeleteQuestHandler,
  IncrementObjectiveProgressHandler,
  UpdateQuestHandler,
];
