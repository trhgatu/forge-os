import { MoodType } from '@shared/enums';
import {
  JournalStatus,
  JournalType,
  JournalRelationType,
  JournalSource,
} from '../../../domain/enums';

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
  source?: JournalSource;
  relations?: CreateJournalRelationPayload[];
  userId?: string;
}

export class CreateJournalCommand {
  constructor(public readonly payload: CreateJournalPayload) {}
}
