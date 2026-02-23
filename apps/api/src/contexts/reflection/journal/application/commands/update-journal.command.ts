import { JournalId } from '../../domain/value-objects/journal-id.vo';
import { JournalRelationType, JournalType, JournalStatus } from '../../domain/enums';
import { MoodType } from '@shared/enums';

export interface UpdateJournalRelationPayload {
  type: JournalRelationType;
  id: string;
}

export interface UpdateJournalPayload {
  title?: string;
  content?: string;
  mood?: MoodType;
  tags?: string[];
  type?: JournalType;
  status?: JournalStatus;
  source?: 'user' | 'ai' | 'system';
  relations?: UpdateJournalRelationPayload[];
}

export class UpdateJournalCommand {
  constructor(
    public readonly id: JournalId,
    public readonly payload: UpdateJournalPayload,
  ) {}
}
