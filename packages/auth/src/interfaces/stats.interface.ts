export interface UserStats {
  userId: string;
  xp: number;
  level: number;
  title: string;
  streak: number;
  lastActivityDate: string | null;
  achievements: string[];
  discipline: number;
  consistency: number;
  willpower: number;
  awareness: number;
  presence: number;
}

export type UserStatsDto = UserStats;
