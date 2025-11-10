import { Sport } from '../../domain/sport.entity';
import { SportId } from '../../domain/value-objects/sport-id.vo';
import { SportFilter } from '../queries/sport-filter';
import { PaginatedResult } from '@shared/types/paginated-result';

export interface SportRepository {
  save(sport: Sport): Promise<void>;
  findById(id: SportId): Promise<Sport | null>;
  findAll(query: SportFilter): Promise<PaginatedResult<Sport>>;
  delete(id: SportId): Promise<void>;
  softDelete(id: SportId): Promise<void>;
  restore(id: SportId): Promise<void>;
  existsBySlug(slug: string): Promise<boolean>;
}
