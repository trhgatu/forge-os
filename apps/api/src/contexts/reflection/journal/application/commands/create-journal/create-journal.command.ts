import { MoodType } from '@shared/enums';

export interface CreateJournalRelationPayload {
  type: string;
  id: string;
}

export interface CreateJournalPayload {
  title?: string;
  content: string;
  mood?: MoodType;
  tags?: string[];
  type?: string;
  status?: string;
  source?: string;
  relations?: CreateJournalRelationPayload[];
  userId?: string;
}

export class CreateJournalCommand {
  constructor(public readonly payload: CreateJournalPayload) {}
}
