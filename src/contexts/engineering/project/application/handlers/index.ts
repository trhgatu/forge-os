import { GetProjectsHandler, GetProjectHandler } from './query.handlers';
import { CreateProjectHandler } from './command.handlers';
import { SyncProjectHandler } from './sync-project.handler';
import { UpdateProjectHandler } from './update-project.handler';

import { GetGithubStatsHandler } from './get-github-stats.handler';
import { GetGithubReposHandler } from './get-github-repos.handler';

export const CommandHandlers = [
  CreateProjectHandler,
  SyncProjectHandler,
  UpdateProjectHandler,
];
export const QueryHandlers = [
  GetProjectsHandler,
  GetProjectHandler,
  GetGithubStatsHandler,
  GetGithubReposHandler,
];
