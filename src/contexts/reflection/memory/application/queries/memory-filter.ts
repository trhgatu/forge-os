import { MemoryStatus } from '@shared/enums';

export interface MemoryFilter {
  keyword?: string;
  status?: MemoryStatus;
  isDeleted?: boolean;
  tags?: string[];
  mood?: string;
  page?: number;
  limit?: number;
}
