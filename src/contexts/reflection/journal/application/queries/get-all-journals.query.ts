import { JournalFilter } from './journal-filter';

export class GetAllJournalsQuery {
  constructor(public readonly filter: JournalFilter) {}
}
