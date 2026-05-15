import type { MoodType } from '@forge/reflection';

export type MemoryType = 'moment' | 'milestone' | 'insight' | 'challenge';

export interface MemoryAnalysis {
  coreMeaning: string;
  emotionalPattern: string;
  timelineConnection: string;
  sentimentScore: number;
}

export interface Memory {
  id: string;
  title: string;
  content: string;
  date: Date;
  type: MemoryType;
  mood: MoodType;
  tags: string[];
  imageUrl?: string;
  analysis?: MemoryAnalysis;
  reflectionDepth: number;
}

export type CreateMemoryPayload = Omit<Memory, 'id' | 'date' | 'analysis' | 'reflectionDepth'>;



