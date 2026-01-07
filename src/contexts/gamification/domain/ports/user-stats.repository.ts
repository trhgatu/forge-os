import { UserStats } from '../user-stats.entity';

export interface UserStatsRepository {
  findByUserId(userId: string): Promise<UserStats | null>;
  save(stats: UserStats): Promise<void>;
}
