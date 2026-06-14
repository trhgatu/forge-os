export interface UserStats {
  userId: string;
  xp: number;
  level: number;
  title: string;
  streak: number;
  lastActivityDate: Date;
  achievements: string[];
  discipline: number;
  consistency: number;
  willpower: number;
  awareness: number;
  presence: number;
}

export type { Quest, QuestObjective } from '../quests/types';

export interface Habit {
  id: string;
  title: string;
  description: string | null;
  xpReward: number;
  difficulty: string;
  frequency: any;
  streak: number;
  maxStreak: number;
  habitStrength: number;
  isActive: boolean;
  isCompletedToday?: boolean;
  actionType?: string | null;
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
  targetTime?: string | null;
  frequency?: any | null;
  completions: string[];
  createdAt: string;
}

export interface GoalObjective {
  id: string;
  type: string;
  targetCount: number;
  referenceId: string | null;
  currentCount?: number;
  isCompleted?: boolean;
}

export interface Goal {
  id: string;
  title: string;
  description: string | null;
  xpReward: number;
  badgeIcon: string | null;
  isActive?: boolean;
  isCompleted?: boolean;
  completedAt?: string | null;
  objectives: GoalObjective[];
}
