import { GetAllProjectsHandler } from './get-all-projects.handler';
import { GetProjectByIdHandler } from './get-project-by-id.handler';
import { CreateProjectHandler } from './create-project.handler';
import { SyncProjectHandler } from './sync-project.handler';
import { UpdateProjectHandler } from './update-project.handler';

import { GetGithubStatsHandler } from './get-github-stats.handler';
import { GetGithubReposHandler } from './get-github-repos.handler';

import { DeleteProjectHandler } from './delete-project.handler';

export const CommandHandlers = [
  CreateProjectHandler,
  SyncProjectHandler,
  UpdateProjectHandler,
  DeleteProjectHandler,
];
export const QueryHandlers = [
  GetAllProjectsHandler,
  GetProjectByIdHandler,
  GetGithubStatsHandler,
  GetGithubReposHandler,
];
