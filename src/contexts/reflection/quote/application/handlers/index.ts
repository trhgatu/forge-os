import { CreateQuoteHandler } from './create-quote.handler';
import { DeleteQuoteHandler } from './delete-quote.handler';
import { RestoreQuoteHandler } from './restore-quote.handler';
import { UpdateQuoteHandler } from './update-quote.handler';
import { SoftDeleteQuoteHandler } from './soft-delete-quote.handler';
import { GetAllQuotesHandler } from './get-all-quotes.handler';
import { GetQuoteByIdHandler } from './get-quote-by-id.handler';
import { GetAllQuotesForPublicHandler } from './get-all-quotes-for-public.handler';
import { GetQuoteByIdForPublicHandler } from './get-quote-by-id-public.handler';
import { GetRandomQuoteHandler } from './get-random-quote.handler';
import { GetDailyQuoteHandler } from './get-daily-quote.handler';
import { InvalidateQuoteCacheHandler } from './invalidate-quote-cache.handler';

export const QuoteHandlers = [
  CreateQuoteHandler,
  UpdateQuoteHandler,
  DeleteQuoteHandler,
  SoftDeleteQuoteHandler,
  RestoreQuoteHandler,

  GetAllQuotesHandler,
  GetQuoteByIdHandler,
  GetAllQuotesForPublicHandler,
  GetQuoteByIdForPublicHandler,
  GetRandomQuoteHandler,
  GetDailyQuoteHandler,

  InvalidateQuoteCacheHandler,
];

export * from './create-quote.handler';
export * from './delete-quote.handler';
export * from './restore-quote.handler';
export * from './update-quote.handler';
export * from './get-random-quote.handler';
export * from './soft-delete-quote.handler';
export * from './get-all-quotes.handler';
export * from './get-quote-by-id.handler';
export * from './get-all-quotes-for-public.handler';
export * from './get-quote-by-id-public.handler';
export * from './invalidate-quote-cache.handler';
export * from './get-daily-quote.handler';
