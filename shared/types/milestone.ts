export type MilestoneType =
  | "goal"
  | "habit"
  | "routine"
  | "project"
  | "freeform";

export type MilestoneStatus =
  | "pending"
  | "in_progress"
  | "completed"
  | "overdue";

export interface SubStep {
  id: string;
  title: string;
  isCompleted: boolean;
}

export interface MilestoneAnalysis {
  difficultyScore: number;
  suggestedSubSteps: string[];
  blockerDetection: string;
  energyRequirement: string;
}

export interface RichMilestone {
  id: string;
  title: string;
  description: string;
  type: MilestoneType;
  status: MilestoneStatus;
  dueDate: Date;
  completedDate?: Date;
  subSteps: SubStep[];
  progress: number;
  difficulty: number;
  linkedEntityId?: string;
  tags: string[];
  analysis?: MilestoneAnalysis;
}
