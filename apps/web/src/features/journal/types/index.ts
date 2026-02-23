import { MoodType } from "@/shared/types/journal";

export enum JournalStatus {
  PRIVATE = "private",
  INTERNAL = "internal",
  SHARED = "shared",
}

export enum JournalType {
  DAILY = "daily",
  THOUGHT = "thought",
  INSIGHT = "insight",
  CONVERSATION_LOG = "conversation_log",
  EVENT = "event",
  DREAM = "dream",
}

// Frontend-facing entity
export interface JournalEntry {
  id: string;
  title?: string;
  content: string;
  mood?: MoodType;
  tags: string[];
  type: JournalType;
  status: JournalStatus;
  createdAt: string; // ISO String for display
  updatedAt: string;
  date: Date; // Converted Date object for Calendar/UI
  isDraft?: boolean; // For UI state
  analysis?: import("@/shared/types/journal").JournalAnalysis; // Placeholder for AI result
}

// DTO for Create
export interface CreateJournalDto {
  title?: string;
  content: string;
  mood?: string;
  tags?: string[];
  type?: JournalType;
  status?: JournalStatus;
  source?: "user" | "ai" | "system";
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
}

// Helper Types
export interface JournalFilter {
  page?: number;
  limit?: number;
  search?: string;
  tags?: string[];
}
