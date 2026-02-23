import type { MoodType } from "./journal";

export interface MoodEntry {
  id: string;
  mood: MoodType;
  intensity: number;
  note: string;
  tags: string[];
  date: Date;
}

export interface MoodAnalysis {
  overallTrend: string;
  triggers: string[];
  prediction: string;
  insight: string;
  actionableStep: string;
}
