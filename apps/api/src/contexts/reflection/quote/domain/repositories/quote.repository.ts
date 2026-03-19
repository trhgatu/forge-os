import { Quote } from '../../domain/entities/quote.entity';
import { QuoteId } from '../../domain/value-objects/quote-id.vo';
import { PaginatedResult } from '@shared/types/paginated-result';
import { QuoteFilter } from '../../application/queries/quote-filter';

export abstract class QuoteRepository {
  abstract save(quote: Quote): Promise<void>;
  abstract findById(id: QuoteId): Promise<Quote | null>;
  abstract findAll(filter: QuoteFilter): Promise<PaginatedResult<Quote>>;
  abstract findRandom(status?: string): Promise<Quote | null>;
  abstract findDaily(date: string): Promise<Quote | null>;
  abstract delete(id: QuoteId): Promise<void>;
  abstract softDelete(id: QuoteId): Promise<void>;
  abstract restore(id: QuoteId): Promise<void>;
}
