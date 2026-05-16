export * from './journal-created.event';
export * from './journal-created.handler';
export * from './journal-modified.event';
export * from './journal-modified.handler';

import { JournalCreatedHandler } from './journal-created.handler';
import { JournalModifiedHandler } from './journal-modified.handler';

export const JournalEventHandlers = [JournalCreatedHandler, JournalModifiedHandler];
