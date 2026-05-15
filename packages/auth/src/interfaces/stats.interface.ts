export interface UserStats {
  userId: string;
  xp: number;
  level: number;
  title: string;
  streak: number;
  lastActivityDate: string | null;
  achievements: string[];
}

export type UserStatsDto = UserStats;
