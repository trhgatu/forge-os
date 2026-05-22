export interface UserStats {
  userId: string;
  xp: number;
  level: number;
  title: string;
  streak: number;
  lastActivityDate: Date;
  achievements: string[];
}

export type { Quest, QuestObjective } from '../quests/types';

export interface Habit {
  id: string;
  title: string;
  description: string | null;
  xpReward: number;
  difficulty: string;    // easy, medium, hard
  frequency: any;
  streak: number;
  maxStreak: number;
  habitStrength: number;
  isActive: boolean;
  createdAt: string;
}

export interface RoutineStep {
  habitId: string;
  title: string;
  xpReward: number;
  order: number;
}

export interface Routine {
  id: string;
  title: string;
  comboXp: number;
  isActive: boolean;
  steps: RoutineStep[];
  createdAt: string;
}
