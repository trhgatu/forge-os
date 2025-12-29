import { MemoryResponse } from '../../../memory/presentation/dto/memory.response';
import { JournalResponse } from '../../../journal/presentation/dto/journal.response';
import { MoodResponse } from '../../../mood/presentation/dto/mood.response';

export type TimelineItemDto =
  | (MemoryResponse & { type: 'create-memory' }) // 'create-memory' might be the type or just 'memory'
  | (JournalResponse & { type: 'create-journal' })
  | (MoodResponse & { type: 'log-mood' });

// Actually, let's stick to simple types 'memory', 'journal', 'mood' to match frontend expected types roughly,
// OR we map them.
// Frontend types in `mockData.ts` were: "milestone" | "mood" | "journal" | "quote" | "memory"
// So 'memory' maps to 'memory', 'journal' to 'journal', 'mood' to 'mood'.

export type TimelineResponse =
  | (MemoryResponse & { type: 'memory' })
  | (JournalResponse & { type: 'journal' })
  | (MoodResponse & { type: 'mood' });
