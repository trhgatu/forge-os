import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UserStatsRepository } from '../../domain/ports/user-stats.repository';
import { UserStats } from '../../domain/user-stats.entity';

export class GetUserStatsQuery {
  constructor(public readonly userId: string) {}
}

@QueryHandler(GetUserStatsQuery)
export class GetUserStatsHandler implements IQueryHandler<GetUserStatsQuery> {
  constructor(
    @Inject('UserStatsRepository')
    private readonly userStatsRepository: UserStatsRepository,
  ) {}

  async execute(query: GetUserStatsQuery): Promise<UserStats | null> {
    return this.userStatsRepository.findByUserId(query.userId);
  }
}
