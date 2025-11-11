import { Quote } from '../../domain/quote.entity';
import { QuoteId } from '../../domain/value-objects/quote-id.vo';
import { PaginatedResult } from '@shared/types/paginated-result';
import { QuoteFilter } from '../queries/quote-filter';

export abstract class QuoteRepository {
  abstract save(quote: Quote): Promise<void>;
  abstract findById(id: QuoteId): Promise<Quote | null>;
  abstract findAll(filter: QuoteFilter): Promise<PaginatedResult<Quote>>;
  abstract delete(id: QuoteId): Promise<void>;
  abstract softDelete(id: QuoteId): Promise<void>;
  abstract restore(id: QuoteId): Promise<void>;
}
