import { MoodType } from '@shared/enums';
import { JournalStatus, JournalType } from '../../domain/enums';

export interface JournalFilter {
  keyword?: string;

  status?: JournalStatus;
  type?: JournalType;
  mood?: MoodType;
  source?: 'user' | 'ai' | 'system';

  tags?: string[];
  isDeleted?: boolean;

  page?: number;
  limit?: number;
}
