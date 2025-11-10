import { Venue } from '../../domain/venue.entity';
import { VenueId } from '../../domain/value-objects/venue-id.vo';
import { VenueFilter } from '../queries/venue-filter';
import { PaginatedResult } from '@shared/types/paginated-result';

export interface VenueRepository {
  save(venue: Venue): Promise<void>;
  findById(id: VenueId): Promise<Venue | null>;
  findAll(query: VenueFilter): Promise<PaginatedResult<Venue>>;
  delete(id: VenueId): Promise<void>;
  softDelete(id: VenueId): Promise<void>;
  restore(id: VenueId): Promise<void>;
  existsBySlug(slug: string): Promise<boolean>;
}
