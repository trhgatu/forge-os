import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetGithubStatsQuery } from '../queries/get-github-stats.query';
import { GithubRepository } from '../ports/github.repository';

@QueryHandler(GetGithubStatsQuery)
export class GetGithubStatsHandler
  implements IQueryHandler<GetGithubStatsQuery>
{
  constructor(
    @Inject('GithubRepository')
    private readonly githubRepository: GithubRepository,
  ) {}

  async execute(query: GetGithubStatsQuery) {
    return this.githubRepository.getUserContributionStats(query.username);
  }
}
