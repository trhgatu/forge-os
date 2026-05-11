import { UserStats } from '../user-stats.entity';

export abstract class UserStatsRepository {
  abstract findByUserId(userId: string): Promise<UserStats | null>;
  abstract save(stats: UserStats): Promise<void>;
}
