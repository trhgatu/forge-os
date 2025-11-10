import { VenueId } from '../../../venue/domain/value-objects/venue-id.vo';
import { CourtStatus, SportType } from '@shared/enums';

export interface CourtFilter {
  keyword?: string;
  status?: CourtStatus;
  sportType?: SportType;
  isDeleted?: boolean;
  venueId?: VenueId;
  page?: number;
  limit?: number;
}
