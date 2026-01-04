export interface UserStats {
  userId: string;
  props: {
    xp: number;
    level: number;
    title: string;
    streak: number;
    lastActivityDate: Date;
    achievements: string[];
  };
} // Shared with backend entity ideally, but defined here for frontend decoupled usage
