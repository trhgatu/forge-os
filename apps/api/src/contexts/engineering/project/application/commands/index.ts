import { CreateProjectHandler } from './create-project/create-project.handler';
import { UpdateProjectHandler } from './update-project/update-project.handler';
import { DeleteProjectHandler } from './delete-project/delete-project.handler';
import { SyncProjectHandler } from './sync-project/sync-project.handler';

export * from './create-project/create-project.command';
export * from './update-project/update-project.command';
export * from './delete-project/delete-project.command';
export * from './sync-project/sync-project.command';

export const ProjectCommandHandlers = [
  CreateProjectHandler,
  UpdateProjectHandler,
  DeleteProjectHandler,
  SyncProjectHandler,
];
