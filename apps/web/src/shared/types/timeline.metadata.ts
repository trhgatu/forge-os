export interface MemoryMetadata {
  alt?: string;
  location?: string;
  people?: string[];
}

export interface QuoteMetadata {
  author?: string;
  source?: string;
}

export interface JournalMetadata {
  wordCount?: number;
}

export interface MoodMetadata {
  intensity?: number;
}

export interface MilestoneMetadata {
  achieved?: boolean;
  progress?: number;
}

export interface InsightMetadata {
  category?: string;
  confidence?: number;
}
