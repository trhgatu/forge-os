import { Court } from '../../domain/court.entity';
import { CourtId } from '../../domain/value-objects/court-id.vo';
import { CourtFilter } from '../../application/queries/court-filter';
import { PaginatedResult } from '@shared/types/paginated-result';

export interface CourtRepository {
  save(court: Court): Promise<void>;
  findById(id: CourtId): Promise<Court | null>;
  findAll(filter: CourtFilter): Promise<PaginatedResult<Court>>;
  delete(id: CourtId): Promise<void>;
  softDelete(id: CourtId): Promise<void>;
  restore(id: CourtId): Promise<void>;
  existsBySlug(slug: string): Promise<boolean>;
}
