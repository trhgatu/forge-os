export interface CourtResponse {
  id: string;
  name: string;
  slug?: string;
  sportType: string;
  status: string;
  description?: string;
  coverImage?: string;
  images?: string[];
  pricePerHour?: number;
  isIndoor: boolean | null;
  maxPlayers?: number;
  venueId?: string;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
}
