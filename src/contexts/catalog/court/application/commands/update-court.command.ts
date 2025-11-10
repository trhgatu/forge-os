import { CourtId } from '../../domain/value-objects/court-id.vo';
import { CourtStatus, SportType } from '@shared/enums';

export interface UpdateCourtPayload {
  name?: string;
  slug?: string;
  description?: string;
  venueId?: string;
  coverImage?: string;
  sportType?: SportType;
  images?: string[];
  pricePerHour?: number;
  isIndoor?: boolean;
  maxPlayers?: number;
  status?: CourtStatus;
}

export class UpdateCourtCommand {
  constructor(
    public readonly id: CourtId,
    public readonly payload: UpdateCourtPayload,
  ) {}
}
