export type MoodType =
  | "joy"
  | "calm"
  | "inspired"
  | "neutral"
  | "sad"
  | "stressed"
  | "lonely"
  | "angry"
  | "energetic"
  | "empty"
  | "focused"
  | "anxious"
  | "tired";

export interface JournalAnalysis {
  sentimentScore: number;
  keywords: string[];
  summary: string;
  suggestedAction: string;
}

export interface JournalEntry {
  id: string;
  title: string;
  content: string;
  date: Date;
  mood: MoodType;
  tags: string[];
  analysis?: JournalAnalysis;
  isDraft?: boolean;
}
