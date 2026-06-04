import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetGithubStatsQuery } from './get-github-stats.query';
import { GithubRepository } from '../../ports/github.repository';
import { GithubContributionStats } from '../../../domain/project.interfaces';

@QueryHandler(GetGithubStatsQuery)
export class GetGithubStatsHandler implements IQueryHandler<
  GetGithubStatsQuery,
  GithubContributionStats
> {
  constructor(
    @Inject('GithubRepository')
    private readonly githubRepository: GithubRepository,
  ) {}

  async execute(query: GetGithubStatsQuery): Promise<GithubContributionStats> {
    return this.githubRepository.getUserContributionStats(query.username);
  }
}
