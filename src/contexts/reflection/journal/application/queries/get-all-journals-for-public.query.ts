import { MoodType } from '@shared/enums';
import { JournalStatus } from '../../domain/enums/journal-status.enum';
import { JournalType } from '../../domain/enums/journal-type.enum';

export interface GetAllJournalsForPublicPayload {
  page?: number;
  limit?: number;
  keyword?: string;

  status?: JournalStatus;
  type?: JournalType;
  mood?: MoodType;
  source?: 'user' | 'ai' | 'system';

  tags?: string[];
}

export class GetAllJournalsForPublicQuery {
  constructor(public readonly payload: GetAllJournalsForPublicPayload) {}
}
