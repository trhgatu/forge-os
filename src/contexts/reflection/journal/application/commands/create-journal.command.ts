import { MoodType } from '@shared/enums';
import {
  JournalStatus,
  JournalType,
  JournalRelationType,
} from '../../domain/enums';

export interface CreateJournalRelationPayload {
  type: JournalRelationType;
  id: string;
}

export interface CreateJournalPayload {
  title?: string;
  content: string;
  mood?: MoodType;
  tags?: string[];
  type?: JournalType;
  status?: JournalStatus;
  source?: 'user' | 'ai' | 'system';
  relations?: CreateJournalRelationPayload[];
}

export class CreateJournalCommand {
  constructor(public readonly payload: CreateJournalPayload) {}
}
