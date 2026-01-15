import { JournalFilter } from './journal-filter';

export class GetAllJournalsForPublicQuery {
  constructor(public readonly payload: JournalFilter) {}
}
