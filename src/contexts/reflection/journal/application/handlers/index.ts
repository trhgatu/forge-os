import { CreateJournalHandler } from './create-journal.handler';
import { UpdateJournalHandler } from './update-journal.handler';
import { DeleteJournalHandler } from './delete-journal.handler';
import { SoftDeleteJournalHandler } from './soft-delete-journal.handler';
import { RestoreJournalHandler } from './restore-journal.handler';
import { GetAllJournalsHandler } from './get-all-journals.handler';
import { GetJournalByIdHandler } from './get-journal-by-id.handler';

export const JournalHandlers = [
  CreateJournalHandler,
  UpdateJournalHandler,
  DeleteJournalHandler,
  SoftDeleteJournalHandler,
  RestoreJournalHandler,
  GetAllJournalsHandler,
  GetJournalByIdHandler,
];
