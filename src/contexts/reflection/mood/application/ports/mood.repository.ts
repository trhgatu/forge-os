import { PaginatedResult } from '@shared/types/paginated-result';
import { Mood } from '../../domain/mood.entity';
import { MoodId } from '../../domain/value-objects/mood-id.vo';
import { MoodFilter } from '../queries/mood-filter';

export abstract class MoodRepository {
  abstract save(mood: Mood): Promise<void>;
  abstract findById(id: MoodId): Promise<Mood | null>;
  abstract findAll(filter: MoodFilter): Promise<PaginatedResult<Mood>>;
  abstract delete(id: MoodId): Promise<void>;
  abstract softDelete(id: MoodId): Promise<void>;
  abstract restore(id: MoodId): Promise<void>;
}
