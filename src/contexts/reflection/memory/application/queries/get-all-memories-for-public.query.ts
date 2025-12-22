import { MemoryStatus } from '@shared/enums';

export interface GetAllMemoriesForPublicPayload {
  page?: number;
  limit?: number;
  keyword?: string;
  status?: MemoryStatus;
  tags?: string[];
  mood?: string;
  lang?: string;
}

export class GetAllMemoriesForPublicQuery {
  constructor(public readonly payload: GetAllMemoriesForPublicPayload) {}
}
