import { GetProjectsHandler, GetProjectHandler } from './query.handlers';
import { CreateProjectHandler } from './command.handlers';
import { SyncProjectHandler } from './sync-project.handler';
import { UpdateProjectHandler } from './update-project.handler';

export const CommandHandlers = [
  CreateProjectHandler,
  SyncProjectHandler,
  UpdateProjectHandler,
];
export const QueryHandlers = [GetProjectsHandler, GetProjectHandler];
