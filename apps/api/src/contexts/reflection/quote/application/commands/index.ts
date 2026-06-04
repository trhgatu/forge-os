import { CreateQuoteHandler } from './create-quote/create-quote.handler';
import { UpdateQuoteHandler } from './update-quote/update-quote.handler';
import { DeleteQuoteHandler } from './delete-quote/delete-quote.handler';
import { SoftDeleteQuoteHandler } from './soft-delete-quote/soft-delete-quote.handler';
import { RestoreQuoteHandler } from './restore-quote/restore-quote.handler';

export * from './create-quote/create-quote.command';
export * from './update-quote/update-quote.command';
export * from './delete-quote/delete-quote.command';
export * from './soft-delete-quote/soft-delete-quote.command';
export * from './restore-quote/restore-quote.command';

export const QuoteCommandHandlers = [
  CreateQuoteHandler,
  UpdateQuoteHandler,
  DeleteQuoteHandler,
  SoftDeleteQuoteHandler,
  RestoreQuoteHandler,
];
