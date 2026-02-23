import { MoodType } from '@shared/enums';
import { JournalStatus, JournalType, JournalRelationType } from '../../domain/enums';

export interface JournalRelationResponse {
  type: JournalRelationType;
  id: string;
}

export interface JournalResponse {
  id: string;
  title: string;
  content: string;

  mood?: MoodType;
  tags: string[];

  type: JournalType;
  status: JournalStatus;
  source: 'user' | 'ai' | 'system';

  relations: JournalRelationResponse[];

  createdAt: string;
  updatedAt: string;

  isDeleted: boolean;
  deletedAt: string | null;
}
