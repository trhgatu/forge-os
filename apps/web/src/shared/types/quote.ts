import { MoodType } from "./journal";

export interface QuoteAnalysis {
  meaning: string;
  themes: string[];
  sentimentScore: number;
  reflectionPrompt: string;
}

export interface Quote {
  id: string;
  text: string;
  author: string;
  source?: string;
  mood: MoodType;
  tags: string[];
  isFavorite: boolean;
  dateAdded: Date;
  reflectionDepth: number;
  analysis?: QuoteAnalysis;
  imageUrl?: string;
}
