export interface UserStats {
  userId: string;
  xp: number;
  level: number;
  title: string;
  streak: number;
  lastActivityDate: Date;
  achievements: string[];
}
