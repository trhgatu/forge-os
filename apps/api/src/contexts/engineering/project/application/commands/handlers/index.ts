import { CreateProjectHandler } from './create-project.handler';
import { DeleteProjectHandler } from './delete-project.handler';
import { SyncProjectHandler } from './sync-project.handler';
import { UpdateProjectHandler } from './update-project.handler';

export const CommandHandlers = [
  CreateProjectHandler,
  DeleteProjectHandler,
  SyncProjectHandler,
  UpdateProjectHandler,
];
