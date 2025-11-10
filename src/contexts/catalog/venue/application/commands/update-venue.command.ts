import { VenueStatus } from '@shared/enums';
import { Coordinates } from '../../domain/venue.entity';
import { VenueId } from '../../domain/value-objects/venue-id.vo';

export interface UpdateVenuePayload {
  name?: string;
  slug?: string;
  location?: string;
  sportType?: string;
  description?: string;
  coordinates?: Coordinates;
  coverImage?: string;
  images?: string[];
  numOfCourts?: number;
  phoneNumber?: string;
  email?: string;
  website?: string;
  openHour?: string;
  closeHour?: string;
  pricePerHour?: number;
  ownerId?: string;
  status?: VenueStatus;
}

export class UpdateVenueCommand {
  constructor(
    public readonly id: VenueId,
    public readonly payload: UpdateVenuePayload,
  ) {}
}
