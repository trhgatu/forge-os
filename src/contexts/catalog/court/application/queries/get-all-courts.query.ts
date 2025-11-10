import { CourtStatus, SportType } from '@shared/enums';

export class GetAllCourtsQuery {
  constructor(
    public readonly payload: {
      page?: number;
      limit?: number;
      keyword?: string;
      status?: CourtStatus;
      sportType?: SportType;
      isDeleted?: boolean;
    },
  ) {}
}
