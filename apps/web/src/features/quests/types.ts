export interface QuestObjective {
  id: string;
  type: string;          // CREATE_JOURNAL, CHECK_HABIT, etc.
  targetCount: number;
  currentCount: number;
  referenceType: string;
  referenceId: string | null;
  isCompleted: boolean;
}

export interface Quest {
  id: string;
  title: string;
  description: string | null;
  type: string;          // daily, weekly, main, side
  xpReward: number;
  isCompleted: boolean;
  isActive?: boolean;
  objectives: QuestObjective[];
  createdAt?: string;
}
