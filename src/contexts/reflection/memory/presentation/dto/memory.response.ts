import { MemoryStatus, MoodType } from '@shared/enums';

export interface MemoryResponse {
  id: string;
  title: string;
  content: string;
  mood?: MoodType;
  tags: string[];
  status: MemoryStatus;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
}
