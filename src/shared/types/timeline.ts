import { MoodType } from "./journal";
import {
  MemoryMetadata,
  QuoteMetadata,
  JournalMetadata,
  MoodMetadata,
  MilestoneMetadata,
  InsightMetadata,
} from "./timeline.metadata";

export type TimelineType = "memory" | "journal" | "quote" | "mood" | "milestone" | "insight";

export interface TimelineMetadataMap {
  memory: MemoryMetadata;
  journal: JournalMetadata;
  quote: QuoteMetadata;
  mood: MoodMetadata;
  milestone: MilestoneMetadata;
  insight: InsightMetadata;
}
export interface TimelineAnalysis {
  significance: string;
  pattern: string;
  temporalContext: string;
}

export interface TimelineItem<T extends TimelineType = TimelineType> {
  id: string;
  type: T;
  date: Date;
  title: string;
  content: string;
  mood: MoodType;
  tags: string[];
  imageUrl?: string;
  metadata?: TimelineMetadataMap[T];
  analysis?: TimelineAnalysis;
}
