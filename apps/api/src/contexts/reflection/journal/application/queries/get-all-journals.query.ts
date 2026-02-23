import { MoodType } from '@shared/enums';
import { JournalStatus, JournalType } from '../../domain/enums';

export class GetAllJournalsQuery {
  constructor(
    public readonly payload: {
      page?: number;
      limit?: number;
      keyword?: string;

      status?: JournalStatus;
      type?: JournalType;
      mood?: MoodType;
      source?: 'user' | 'ai' | 'system';
      tags?: string[];

      isDeleted?: boolean;
    },
  ) {}
}
