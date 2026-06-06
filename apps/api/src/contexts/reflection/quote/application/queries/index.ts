import { GetAllQuotesHandler } from './get-all-quotes/get-all-quotes.handler';
import { GetAllQuotesForPublicHandler } from './get-all-quotes-for-public/get-all-quotes-for-public.handler';
import { GetDailyQuoteHandler } from './get-daily-quote/get-daily-quote.handler';
import { GetQuoteByIdHandler } from './get-quote-by-id/get-quote-by-id.handler';
import { GetQuoteByIdForPublicHandler } from './get-quote-by-id-for-public/get-quote-by-id-for-public.handler';
import { GetRandomQuoteHandler } from './get-random-quote/get-random-quote.handler';

export * from './get-all-quotes/get-all-quotes.query';
export * from './get-all-quotes-for-public/get-all-quotes-for-public.query';
export * from './get-daily-quote/get-daily-quote.query';
export * from './get-quote-by-id/get-quote-by-id.query';
export * from './get-quote-by-id-for-public/get-quote-by-id-for-public.query';
export * from './get-random-quote/get-random-quote.query';
export * from './quote-filter';

export const QuoteQueryHandlers = [
  GetAllQuotesHandler,
  GetAllQuotesForPublicHandler,
  GetDailyQuoteHandler,
  GetQuoteByIdHandler,
  GetQuoteByIdForPublicHandler,
  GetRandomQuoteHandler,
];
