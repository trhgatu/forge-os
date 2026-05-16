import { GetAllProjectsHandler } from './get-all-projects.handler';
import { GetProjectByIdHandler } from './get-project-by-id.handler';
import { GetGithubStatsHandler } from './get-github-stats.handler';
import { GetGithubReposHandler } from './get-github-repos.handler';

export const QueryHandlers = [
  GetAllProjectsHandler,
  GetProjectByIdHandler,
  GetGithubStatsHandler,
  GetGithubReposHandler,
];
