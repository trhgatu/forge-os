import { MoodType } from "./journal";

export type TimelineType =
  | "memory"
  | "journal"
  | "quote"
  | "mood"
  | "milestone"
  | "insight";

export interface TimelineAnalysis {
  significance: string;
  pattern: string;
  temporalContext: string;
}

export interface TimelineItem {
  id: string;
  type: TimelineType;
  date: Date;
  title: string;
  content: string;
  mood: MoodType;
  tags: string[];
  imageUrl?: string;
  metadata?: any;
  analysis?: TimelineAnalysis;
}
