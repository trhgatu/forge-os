import { CreateJournalHandler } from './create-journal.handler';
import { UpdateJournalHandler } from './update-journal.handler';
import { DeleteJournalHandler } from './delete-journal.handler';
import { SoftDeleteJournalHandler } from './soft-delete-journal.handler';
import { RestoreJournalHandler } from './restore-journal.handler';

import { GetAllJournalsHandler } from './get-all-journals.handler';
import { GetJournalByIdHandler } from './get-journal-by-id.handler';
import { GetAllJournalsForPublicHandler } from './get-all-journals-for-public.handler';
import { GetJournalByIdForPublicHandler } from './get-journal-by-id-public.handler';

import { InvalidateJournalCacheHandler } from './invalidate-journal-cache.handler';
import { LogJournalActivityHandler } from './log-journal-activity.handler';

export const JournalHandlers = [
  // Commands
  CreateJournalHandler,
  UpdateJournalHandler,
  DeleteJournalHandler,
  SoftDeleteJournalHandler,
  RestoreJournalHandler,

  // Queries
  GetAllJournalsHandler,
  GetJournalByIdHandler,
  GetAllJournalsForPublicHandler,
  GetJournalByIdForPublicHandler,

  // Events
  InvalidateJournalCacheHandler,
  LogJournalActivityHandler,
];

export * from './create-journal.handler';
export * from './update-journal.handler';
export * from './delete-journal.handler';
export * from './soft-delete-journal.handler';
export * from './restore-journal.handler';

export * from './get-all-journals.handler';
export * from './get-journal-by-id.handler';
export * from './get-all-journals-for-public.handler';
export * from './get-journal-by-id-public.handler';

export * from './invalidate-journal-cache.handler';
export * from './log-journal-activity.handler';
