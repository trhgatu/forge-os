export interface QuestObjective {
  id: string;
  type: string;
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
  type: string;
  xpReward: number;
  isCompleted: boolean;
  isActive?: boolean;
  objectives: QuestObjective[];
  createdAt?: string;
}
