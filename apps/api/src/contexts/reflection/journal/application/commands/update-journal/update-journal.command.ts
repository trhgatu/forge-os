import { JournalId } from '../../../domain/value-objects/journal-id.vo';
import { MoodType } from '@shared/enums';

export interface UpdateJournalRelationPayload {
  type: string;
  id: string;
}

export interface UpdateJournalPayload {
  title?: string;
  content?: string;
  mood?: MoodType;
  tags?: string[];
  type?: string;
  status?: string;
  source?: 'user' | 'ai' | 'system';
  relations?: UpdateJournalRelationPayload[];
  analysis?: any;
  userId?: string;
}

export class UpdateJournalCommand {
  constructor(
    public readonly id: JournalId,
    public readonly payload: UpdateJournalPayload,
  ) {}
}
