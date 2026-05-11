export * from './get-all-journals/get-all-journals.query';
export * from './get-all-journals/get-all-journals.handler';
export * from './get-journal-by-id/get-journal-by-id.query';
export * from './get-journal-by-id/get-journal-by-id.handler';
export * from './get-all-journals-for-public/get-all-journals-for-public.query';
export * from './get-all-journals-for-public/get-all-journals-for-public.handler';
export * from './get-journal-by-id-for-public/get-journal-by-id-for-public.query';
export * from './get-journal-by-id-for-public/get-journal-by-id-for-public.handler';

import { GetAllJournalsHandler } from './get-all-journals/get-all-journals.handler';
import { GetJournalByIdHandler } from './get-journal-by-id/get-journal-by-id.handler';
import { GetAllJournalsForPublicHandler } from './get-all-journals-for-public/get-all-journals-for-public.handler';
import { GetJournalByIdForPublicHandler } from './get-journal-by-id-for-public/get-journal-by-id-for-public.handler';

export const JournalQueryHandlers = [
  GetAllJournalsHandler,
  GetJournalByIdHandler,
  GetAllJournalsForPublicHandler,
  GetJournalByIdForPublicHandler,
];
