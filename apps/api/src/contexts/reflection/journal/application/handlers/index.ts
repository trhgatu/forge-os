import { CreateJournalHandler } from './create-journal.handler';
import { UpdateJournalHandler } from './update-journal.handler';
import { DeleteJournalHandler } from './delete-journal.handler';
import { RestoreJournalHandler } from './restore-journal.handler';

import { GetAllJournalsHandler } from './get-all-journals.handler';
import { GetJournalByIdHandler } from './get-journal-by-id.handler';
import { GetAllJournalsForPublicHandler } from './get-all-journals-for-public.handler';
import { GetJournalByIdForPublicHandler } from './get-journal-by-id-public.handler';

export const CommandHandlers = [
  CreateJournalHandler,
  UpdateJournalHandler,
  DeleteJournalHandler,
  RestoreJournalHandler,
];

export const QueryHandlers = [
  GetAllJournalsHandler,
  GetJournalByIdHandler,
  GetAllJournalsForPublicHandler,
  GetJournalByIdForPublicHandler,
];
