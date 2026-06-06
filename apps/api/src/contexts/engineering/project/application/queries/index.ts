import { GetAllProjectsHandler } from './get-all-projects/get-all-projects.handler';
import { GetProjectByIdHandler } from './get-project-by-id/get-project-by-id.handler';
import { GetGithubReposHandler } from './get-github-repos/get-github-repos.handler';
import { GetGithubStatsHandler } from './get-github-stats/get-github-stats.handler';

export * from './get-all-projects/get-all-projects.query';
export * from './get-project-by-id/get-project-by-id.query';
export * from './get-github-repos/get-github-repos.query';
export * from './get-github-stats/get-github-stats.query';
export * from './project-filter';

export const ProjectQueryHandlers = [
  GetAllProjectsHandler,
  GetProjectByIdHandler,
  GetGithubReposHandler,
  GetGithubStatsHandler,
];
