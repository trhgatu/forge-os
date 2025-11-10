import { Coordinates } from '../../domain/venue.entity';
import { VenueStatus } from '@shared/enums';

export interface CreateVenuePayload {
  name: string;
  location: string;
  sportType: string;
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

export class CreateVenueCommand {
  constructor(public readonly payload: CreateVenuePayload) {}
}
