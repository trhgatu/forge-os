export enum MoodType {
  HAPPY = 'happy',
  JOY = 'joy',
  CALM = 'calm',
  INSPIRED = 'inspired',
  NEUTRAL = 'neutral',
  SAD = 'sad',
  STRESSED = 'stressed',
  LONELY = 'lonely',
  ANGRY = 'angry',
  ENERGETIC = 'energetic',
  EMPTY = 'empty',
  FOCUSED = 'focused',
  ANXIOUS = 'anxious',
  NOSTALGIC = 'nostalgic',
  TIRED = 'tired',
}

export enum JournalStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  ARCHIVED = 'archived',
  PRIVATE = 'private',
  INTERNAL = 'internal',
  SHARED = 'shared',
}

export enum JournalType {
  DAILY = 'daily',
  THOUGHT = 'thought',
  INSIGHT = 'insight',
  CONVERSATION_LOG = 'conversation_log',
  EVENT = 'event',
  DREAM = 'dream',
  NOTE = 'note',
}

export enum MemoryStatus {
  ACTIVE = 'active',
  ARCHIVED = 'archived',
  INTERNAL = 'internal',
}

export enum QuoteStatus {
  ACTIVE = 'active',
  FAVORITE = 'favorite',
  ARCHIVED = 'archived',
  INTERNAL = 'internal',
}

export interface JournalAnalysis {
  sentimentScore: number;
  keywords: string[];
  summary: string;
  suggestedAction: string;
}

export interface JournalEntry {
  id: string;
  title?: string;
  content: string;
  mood?: MoodType;
  tags: string[];
  type: JournalType;
  status: JournalStatus;
  createdAt: string;
  updatedAt: string;
  date: Date;
  isDraft?: boolean;
  analysis?: JournalAnalysis;
}
