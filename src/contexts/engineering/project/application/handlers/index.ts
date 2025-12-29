import { GetProjectsHandler, GetProjectHandler } from './query.handlers';
import { CreateProjectHandler } from './command.handlers';
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
  GetProjectsHandler,
  GetProjectHandler,
  GetGithubStatsHandler,
  GetGithubReposHandler,
];
