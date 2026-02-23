import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetGithubReposQuery } from '../queries/get-github-repos.query';
import { GithubRepository } from '../ports/github.repository';
import { GithubRepo } from '../../domain/project.interfaces';
import { LoggerService } from '@shared/logging/logger.service';

@QueryHandler(GetGithubReposQuery)
export class GetGithubReposHandler implements IQueryHandler<GetGithubReposQuery> {
  constructor(
    @Inject('GithubRepository')
    private readonly githubRepository: GithubRepository,
    private readonly logger: LoggerService,
  ) {}

  async execute(query: GetGithubReposQuery): Promise<GithubRepo[]> {
    const { username } = query;
    return this.githubRepository.getUserRepos(username);
  }
}
