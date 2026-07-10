import { Journal } from './journal.entity';
import { JournalId } from './value-objects/journal-id.vo';
import { JournalStatus, JournalType, JournalSource, JournalRelationType } from './enums';
import { MoodType } from '@shared/enums';

describe('Journal (Domain Entity Unit Test)', () => {
  const userId = 'user-uuid-123';
  const journalIdStr = 'journal-uuid-456';

  const createBaseProps = () => ({
    title: 'Daily Reflection',
    content: 'Today was a productive day focused on coding.',
    mood: MoodType.INSPIRED,
    type: JournalType.REFLECTION,
    status: JournalStatus.DRAFT,
    source: JournalSource.USER,
    userId,
    relations: [],
    tags: [],
  });

  it('should successfully create a journal with domain events', () => {
    const props = createBaseProps();
    const id = JournalId.fromString(journalIdStr);

    const journal = Journal.create(props, id);

    expect(journal.id.value).toBe(journalIdStr);
    expect(journal.title).toBe(props.title);
    expect(journal.content).toBe(props.content);
    expect(journal.mood).toBe(props.mood);
    expect(journal.type).toBe(props.type);
    expect(journal.status).toBe(props.status);
    expect(journal.source).toBe(props.source);
    expect(journal.userId).toBe(userId);
    expect(journal.createdBy).toBe(userId);
    expect(journal.isJournalDeleted).toBe(false);
    expect(journal.tags).toEqual([]);
    expect(journal.relations).toEqual([]);
    expect(journal.createdAt).toBeInstanceOf(Date);
    expect(journal.updatedAt).toBeInstanceOf(Date);

    // Verify domain events
    const events = journal.domainEvents;
    expect(events).toHaveLength(1);
    expect(events[0]).toEqual({ type: 'journal.created', id: journalIdStr });
  });

  it('should update content and title and add journal.updated event', () => {
    const journal = Journal.create(createBaseProps(), JournalId.fromString(journalIdStr));
    const originalUpdatedAt = journal.updatedAt;

    const newContent = 'Updated today with more progress on tests.';
    const newTitle = 'Refined Daily Reflection';

    // Clear initial create event
    journal.clearDomainEvents();

    journal.updateContent(newContent, newTitle);

    expect(journal.content).toBe(newContent);
    expect(journal.title).toBe(newTitle);
    expect(journal.updatedAt.getTime()).toBeGreaterThanOrEqual(originalUpdatedAt.getTime());

    const events = journal.domainEvents;
    expect(events).toHaveLength(1);
    expect(events[0]).toEqual({ type: 'journal.updated', id: journalIdStr });
  });

  it('should change mood correctly', () => {
    const journal = Journal.create(createBaseProps(), JournalId.fromString(journalIdStr));
    const originalUpdatedAt = journal.updatedAt;

    journal.changeMood(MoodType.CALM);

    expect(journal.mood).toBe(MoodType.CALM);
    expect(journal.updatedAt.getTime()).toBeGreaterThanOrEqual(originalUpdatedAt.getTime());
  });

  it('should publish draft journal', () => {
    const journal = Journal.create(createBaseProps(), JournalId.fromString(journalIdStr));
    expect(journal.status).toBe(JournalStatus.DRAFT);

    journal.publish();

    expect(journal.status).toBe(JournalStatus.PUBLISHED);
  });

  it('should archive journal', () => {
    const journal = Journal.create(createBaseProps(), JournalId.fromString(journalIdStr));

    journal.archive();

    expect(journal.status).toBe(JournalStatus.ARCHIVED);
  });

  it('should append unique tags and ignore duplicates', () => {
    const journal = Journal.create(
      {
        ...createBaseProps(),
        tags: ['coding', 'health'],
      },
      JournalId.fromString(journalIdStr),
    );

    journal.addTags(['health', 'mindset', 'coding']);

    expect(journal.tags).toHaveLength(3);
    expect(journal.tags).toContain('coding');
    expect(journal.tags).toContain('health');
    expect(journal.tags).toContain('mindset');
  });

  it('should set relations and analysis props correctly', () => {
    const journal = Journal.create(createBaseProps(), JournalId.fromString(journalIdStr));
    const relations = [{ type: JournalRelationType.TASK, id: 'task-123' }];

    journal.setRelations(relations);
    expect(journal.relations).toEqual(relations);

    const analysis = { sentiment: 'positive', score: 0.9 };
    journal.updateAnalysis(analysis);
    expect(journal.analysis).toEqual(analysis);
  });

  it('should delete and restore journal with appropriate domain events', () => {
    const journal = Journal.create(createBaseProps(), JournalId.fromString(journalIdStr));
    journal.clearDomainEvents(); // Clear create event

    expect(journal.isJournalDeleted).toBe(false);
    expect(journal.journalDeletedAt).toBeUndefined();

    // Delete
    journal.delete();
    expect(journal.isJournalDeleted).toBe(true);
    expect(journal.journalDeletedAt).toBeInstanceOf(Date);

    let events = journal.domainEvents;
    expect(events).toHaveLength(1);
    expect(events[0]).toEqual({ type: 'journal.deleted', id: journalIdStr });

    // Clear delete event before restoring
    journal.clearDomainEvents();

    // Restore
    journal.restore();
    expect(journal.isJournalDeleted).toBe(false);
    expect(journal.journalDeletedAt).toBeUndefined();

    events = journal.domainEvents;
    expect(events).toHaveLength(1);
    expect(events[0]).toEqual({ type: 'journal.restored', id: journalIdStr });
  });
});
