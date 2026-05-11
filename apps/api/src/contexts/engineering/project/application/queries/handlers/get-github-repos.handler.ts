import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetGithubReposQuery } from '../get-github-repos.query';
import { GithubRepository } from '../../ports/github.repository';
import { GithubRepo } from '../../../domain/project.interfaces';

@QueryHandler(GetGithubReposQuery)
export class GetGithubReposHandler implements IQueryHandler<GetGithubReposQuery> {
  constructor(
    @Inject('GithubRepository')
    private readonly githubRepository: GithubRepository,
  ) {}

  async execute(query: GetGithubReposQuery): Promise<GithubRepo[]> {
    const { username } = query;
    return this.githubRepository.getUserRepos(username);
  }
}
