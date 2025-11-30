export type GoalType = "life" | "project" | "micro";
export type GoalStatus = "not_started" | "in_progress" | "paused" | "completed";

export interface Milestone {
  id: string;
  title: string;
  isCompleted: boolean;
  targetDate?: Date;
}

export interface GoalAnalysis {
  risks: string[];
  energyLevel: number;
  suggestedHabit: string;
  motivation: string;
}

export interface Goal {
  id: string;
  title: string;
  description: string;
  category: string;
  type: GoalType;
  status: GoalStatus;
  priority: number;
  progress: number;
  dueDate?: Date;
  milestones: Milestone[];
  tags: string[];
  analysis?: GoalAnalysis;
  dateCreated: Date;
}
