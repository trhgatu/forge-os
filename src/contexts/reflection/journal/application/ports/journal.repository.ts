import { Journal } from '../../domain/journal.entity';
import { JournalId } from '../../domain/value-objects/journal-id.vo';
import { PaginatedResult } from '@shared/types/paginated-result';
import { JournalFilter } from '../queries/journal-filter';

export abstract class JournalRepository {
  abstract save(journal: Journal): Promise<void>;
  abstract findById(id: JournalId): Promise<Journal | null>;
  abstract findAll(filter: JournalFilter): Promise<PaginatedResult<Journal>>;
  abstract delete(id: JournalId): Promise<void>;
  abstract softDelete(id: JournalId): Promise<void>;
}
