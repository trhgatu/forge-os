import { SportStatus } from '@shared/enums';

export class GetAllSportsQuery {
  constructor(
    public readonly payload: {
      page?: number;
      limit?: number;
      keyword?: string;
      status?: SportStatus;
      isDeleted?: boolean;
    },
  ) {}
}
