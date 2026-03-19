// Commands
import { CreateQuoteHandler } from './commands/create-quote/create-quote.handler';
import { UpdateQuoteHandler } from './commands/update-quote/update-quote.handler';
import { DeleteQuoteHandler } from './commands/delete-quote/delete-quote.handler';
import { SoftDeleteQuoteHandler } from './commands/delete-quote/soft-delete-quote.handler';
import { RestoreQuoteHandler } from './commands/restore-quote/restore-quote.handler';

// Queries
import { GetAllQuotesHandler } from './queries/get-all/get-all-quotes.handler';
import { GetAllQuotesForPublicHandler } from './queries/get-all/get-all-quotes-for-public.handler';
import { GetDailyQuoteHandler } from './queries/get-daily/get-daily-quote.handler';
import { GetQuoteByIdForPublicHandler } from './queries/get-by-id/get-quote-by-id-public.handler';

// Events
import { InvalidateQuoteCacheHandler } from './events/handlers/invalidate-quote-cache.handler';
import { LogQuoteActivityHandler } from './events/handlers/log-quote-activity.handler';

export const QuoteHandlers = [
  // Command Handlers
  CreateQuoteHandler,
  UpdateQuoteHandler,
  DeleteQuoteHandler,
  SoftDeleteQuoteHandler,
  RestoreQuoteHandler,

  // Query Handlers
  GetAllQuotesHandler,
  GetAllQuotesForPublicHandler,
  GetDailyQuoteHandler,
  GetQuoteByIdForPublicHandler,

  // Event Handlers
  InvalidateQuoteCacheHandler,
  LogQuoteActivityHandler,
];
