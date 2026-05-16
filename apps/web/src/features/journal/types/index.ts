import type {
  JournalEntry,
  MoodType,
  JournalAnalysis
} from '@forge/reflection';
import {
  JournalStatus,
  JournalType
} from '@forge/reflection';

export { JournalStatus, JournalType };
export type { JournalEntry, MoodType, JournalAnalysis };

// DTO for Create
export interface CreateJournalDto {
  title?: string;
  content: string;
  mood?: string;
  tags?: string[];
  type?: JournalType;
  status?: JournalStatus;
  source?: 'user' | 'ai' | 'system';
  analysis?: any;
}

// Response from Backend
export interface RawJournalItem {
  id: string;
  title?: string;
  content: string;
  mood?: string;
  tags?: string[];
  type?: string;
  status?: string;
  createdAt: string;
  updatedAt: string;
  analysis?: any;
}

// Helper Types
export interface JournalFilter {
  page?: number;
  limit?: number;
  search?: string;
  tags?: string[];
}



