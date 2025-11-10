import { CourtStatus, SportType } from '@shared/enums';

export interface CreateCourtPayload {
  name: string;
  description?: string;
  venueId: string;
  coverImage?: string;
  sportType: SportType;
  images?: string[];
  pricePerHour?: number;
  isIndoor?: boolean;
  maxPlayers?: number;
  status?: CourtStatus;
}

export class CreateCourtCommand {
  constructor(public readonly payload: CreateCourtPayload) {}
}
