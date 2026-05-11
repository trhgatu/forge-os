import { JournalId } from './value-objects/journal-id.vo';
import { MoodType } from '@shared/enums';
import { JournalStatus, JournalType, JournalRelationType, JournalSource } from './enums';
import { AggregateRoot } from '../../../../shared/domain/aggregate-root.base';

export interface JournalRelation {
  type: JournalRelationType;
  id: string;
}

interface JournalProps {
  title?: string;
  content: string;
  mood?: MoodType;
  tags: string[];
  type: JournalType;
  status: JournalStatus;
  source: JournalSource;
  relations: JournalRelation[];
  createdAt: Date;
  updatedAt: Date;
}

export class Journal extends AggregateRoot<JournalId> {
  private constructor(
    id: JournalId,
    private props: JournalProps,
    private isDeleted = false,
    private deletedAt?: Date,
  ) {
    super(id);
  }

  static create(
    props: Omit<JournalProps, 'createdAt' | 'updatedAt' | 'tags' | 'relations'> & {
      tags?: string[];
      relations?: JournalRelation[];
    },
    id: JournalId,
  ): Journal {
    const now = new Date();
    const journal = new Journal(id, {
      ...props,
      tags: props.tags ?? [],
      relations: props.relations ?? [],
      createdAt: now,
      updatedAt: now,
    });

    journal.addDomainEvent({ type: 'journal.created', id: id.value });
    return journal;
  }

  static createFromPersistence(
    props: JournalProps,
    id: string,
    isDeleted = false,
    deletedAt?: Date,
  ): Journal {
    return new Journal(JournalId.fromString(id), props, isDeleted, deletedAt);
  }

  // --- Semantic Domain Methods ---

  public updateContent(content: string, title?: string): void {
    this.props.content = content;
    if (title !== undefined) this.props.title = title;
    this.props.updatedAt = new Date();
    this.addDomainEvent({ type: 'journal.updated', id: this.id.value });
  }

  public changeMood(mood: MoodType): void {
    this.props.mood = mood;
    this.props.updatedAt = new Date();
  }

  public publish(): void {
    this.props.status = JournalStatus.PUBLISHED;
    this.props.updatedAt = new Date();
  }

  public archive(): void {
    this.props.status = JournalStatus.ARCHIVED;
    this.props.updatedAt = new Date();
  }

  public addTags(tags: string[]): void {
    const uniqueTags = new Set([...this.props.tags, ...tags]);
    this.props.tags = Array.from(uniqueTags);
    this.props.updatedAt = new Date();
  }

  public setRelations(relations: JournalRelation[]): void {
    this.props.relations = relations;
    this.props.updatedAt = new Date();
  }

  public delete(): void {
    if (this.isDeleted) return;
    this.isDeleted = true;
    this.deletedAt = new Date();
    this.props.updatedAt = new Date();
    this.addDomainEvent({ type: 'journal.deleted', id: this.id.value });
  }

  public restore(): void {
    if (!this.isDeleted) return;
    this.isDeleted = false;
    this.deletedAt = undefined;
    this.props.updatedAt = new Date();
    this.addDomainEvent({ type: 'journal.restored', id: this.id.value });
  }

  // --- Getters ---
  get title() {
    return this.props.title;
  }
  get content() {
    return this.props.content;
  }
  get mood() {
    return this.props.mood;
  }
  get tags() {
    return this.props.tags;
  }
  get type() {
    return this.props.type;
  }
  get status() {
    return this.props.status;
  }
  get source() {
    return this.props.source;
  }
  get relations() {
    return this.props.relations;
  }
  get createdAt() {
    return this.props.createdAt;
  }
  get updatedAt() {
    return this.props.updatedAt;
  }
  get isJournalDeleted(): boolean {
    return this.isDeleted;
  }
  get journalDeletedAt() {
    return this.deletedAt;
  }

  public toPersistence() {
    return {
      id: this.id.value,
      ...this.props,
      isDeleted: this.isDeleted,
      deletedAt: this.deletedAt,
    };
  }

  public toPrimitives() {
    return {
      id: this.id.value,
      ...this.props,
      isDeleted: this.isDeleted,
      deletedAt: this.deletedAt,
    };
  }
}
