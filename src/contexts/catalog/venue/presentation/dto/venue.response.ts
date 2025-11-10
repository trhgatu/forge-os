export interface VenueResponse {
  id: string;
  name: string;
  slug?: string;
  location: string;
  sportType: string;
  status: string;
  description?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
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
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
}
