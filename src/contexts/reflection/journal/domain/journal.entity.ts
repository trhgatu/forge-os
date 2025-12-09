import { JournalId } from './value-objects/journal-id.vo';
import { MoodType } from '@shared/enums';
import { JournalStatus, JournalType, JournalRelationType } from './enums';

interface JournalRelation {
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
  source: 'user' | 'ai' | 'system';
  relations: JournalRelation[];
  createdAt: Date;
  updatedAt: Date;
}

export class Journal {
  private constructor(
    public readonly id: JournalId,
    private props: JournalProps,
    private isDeleted = false,
    private deletedAt?: Date,
  ) {}

  static create(
    props: Omit<
      JournalProps,
      'createdAt' | 'updatedAt' | 'tags' | 'relations'
    > & { tags?: string[]; relations?: JournalRelation[] },
    id: JournalId,
    now: Date,
  ): Journal {
    return new Journal(id, {
      ...props,
      tags: props.tags ?? [],
      relations: props.relations ?? [],
      createdAt: now,
      updatedAt: now,
    });
  }

  static createFromPersistence(
    data: JournalProps & {
      id: string;
      isDeleted?: boolean;
      deletedAt?: Date;
    },
  ): Journal {
    return new Journal(
      JournalId.create(data.id),
      { ...data },
      data.isDeleted ?? false,
      data.deletedAt,
    );
  }

  updateInfo(
    props: Partial<
      Omit<JournalProps, 'createdAt' | 'updatedAt' | 'relations' | 'tags'>
    > & {
      tags?: string[];
      relations?: JournalRelation[];
    },
  ): void {
    if (props.title !== undefined) {
      this.props.title = props.title;
    }

    if (props.content !== undefined) {
      this.props.content = props.content;
    }

    if (props.mood !== undefined) {
      this.props.mood = props.mood;
    }

    if (props.status !== undefined) {
      this.props.status = props.status;
    }

    if (props.type !== undefined) {
      this.props.type = props.type;
    }

    if (props.source !== undefined) {
      this.props.source = props.source;
    }

    if (props.tags !== undefined) {
      this.props.tags = props.tags;
    }

    if (props.relations !== undefined) {
      this.props.relations = props.relations;
    }

    this.props.updatedAt = new Date();
  }

  delete(): void {
    if (this.isDeleted) return;
    this.isDeleted = true;
    this.deletedAt = new Date();
  }

  restore(): void {
    if (!this.isDeleted) return;
    this.isDeleted = false;
    this.deletedAt = undefined;
  }

  // ============
  //   GETTERS
  // ============

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

  // ================
  //   SERIALIZATION
  // ================
  toPersistence() {
    return {
      id: this.id.toString(),
      title: this.props.title,
      content: this.props.content,
      mood: this.props.mood,
      tags: this.props.tags,
      type: this.props.type,
      status: this.props.status,
      source: this.props.source,
      relations: this.props.relations,
      createdAt: this.props.createdAt,
      updatedAt: this.props.updatedAt,
      isDeleted: this.isDeleted,
      deletedAt: this.deletedAt,
    };
  }

  toPrimitives() {
    return {
      id: this.id.toString(),
      title: this.props.title,
      content: this.props.content,
      mood: this.props.mood,
      tags: this.props.tags,
      type: this.props.type,
      status: this.props.status,
      source: this.props.source,
      relations: this.props.relations,
      createdAt: this.props.createdAt,
      updatedAt: this.props.updatedAt,
      isDeleted: this.isDeleted,
      deletedAt: this.deletedAt,
    };
  }
}
