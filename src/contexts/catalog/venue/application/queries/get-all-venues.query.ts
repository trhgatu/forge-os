// application/queries/get-all-venues.query.ts
import { VenueStatus, SportType } from '@shared/enums';

export class GetAllVenuesQuery {
  constructor(
    public readonly payload: {
      page?: number;
      limit?: number;
      keyword?: string;
      status?: VenueStatus;
      sportType?: SportType;
      isDeleted?: boolean;
    },
  ) {}
}
