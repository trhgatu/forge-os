import { MoodType } from "@/shared/types/journal";

export enum JournalStatus {
  DRAFT = "draft",
  PUBLISHED = "published",
  ARCHIVED = "archived",
}

export enum JournalType {
  NOTE = "note",
  REFLECTION = "reflection",
  GRATITUDE = "gratitude",
  DREAM = "dream",
}

// Frontend-facing entity (what useJournal returns)
export interface JournalEntry {
  id: string;
  title?: string;
  content: string;
  mood?: MoodType; // Can be string or enum depending on backend
  tags: string[];
  type: JournalType;
  status: JournalStatus;
  createdAt: string; // ISO String
  updatedAt: string;
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

// Response from Backend (matches backend DTO + ID + timestamps)
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
