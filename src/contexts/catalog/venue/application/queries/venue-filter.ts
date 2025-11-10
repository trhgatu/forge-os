import { SportType, VenueStatus } from '@shared/enums';

export interface VenueFilter {
  keyword?: string;
  status?: VenueStatus;
  sportType?: SportType;
  isDeleted?: boolean;

  page?: number;
  limit?: number;
  skip?: number;
}
