import { MemoryStatus } from '@shared/enums';

export class GetAllMemoriesQuery {
  constructor(
    public readonly payload: {
      lang?: string;
      page?: number;
      limit?: number;
      keyword?: string;
      status?: MemoryStatus;
      mood?: string;
      tags?: string[];
      isDeleted?: boolean;
    },
  ) {}
}
