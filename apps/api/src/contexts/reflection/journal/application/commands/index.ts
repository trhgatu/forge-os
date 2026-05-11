export * from './create-journal/create-journal.command';
export * from './create-journal/create-journal.handler';
export * from './update-journal/update-journal.command';
export * from './update-journal/update-journal.handler';
export * from './soft-delete-journal/soft-delete-journal.command';
export * from './soft-delete-journal/soft-delete-journal.handler';
export * from './restore-journal/restore-journal.command';
export * from './restore-journal/restore-journal.handler';

import { CreateJournalHandler } from './create-journal/create-journal.handler';
import { UpdateJournalHandler } from './update-journal/update-journal.handler';
import { SoftDeleteJournalHandler } from './soft-delete-journal/soft-delete-journal.handler';
import { RestoreJournalHandler } from './restore-journal/restore-journal.handler';

export const JournalCommandHandlers = [
  CreateJournalHandler,
  UpdateJournalHandler,
  SoftDeleteJournalHandler,
  RestoreJournalHandler,
];
