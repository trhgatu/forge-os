import { JournalId } from './value-objects/journal-id.vo';
import { MoodType } from '@shared/enums';
import { JournalStatus, JournalType, JournalRelationType } from './enums';

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
    props: Omit<JournalProps, 'createdAt' | 'updatedAt' | 'tags' | 'relations'> & {
      tags?: string[];
      relations?: JournalRelation[];
    },
    id: JournalId,
  ): Journal {
    const now = new Date();
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
    const { id, isDeleted, deletedAt, ...props } = data;
    return new Journal(JournalId.create(id), props, isDeleted ?? false, deletedAt);
  }

  updateInfo(
    props: Partial<Omit<JournalProps, 'createdAt' | 'updatedAt' | 'relations' | 'tags'>> & {
      tags?: string[];
      relations?: JournalRelation[];
    },
  ): void {
    Object.assign(this.props, {
      ...props,
      updatedAt: new Date(),
    });
  }

  delete(): void {
    if (this.isDeleted) return;
    this.isDeleted = true;
    this.deletedAt = new Date();
    this.props.updatedAt = new Date();
  }

  restore(): void {
    if (!this.isDeleted) return;
    this.isDeleted = false;
    this.deletedAt = undefined;
    this.props.updatedAt = new Date();
  }

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

  toPersistence() {
    return {
      ...this.props,
      isDeleted: this.isDeleted,
      deletedAt: this.deletedAt,
    };
  }

  toPrimitives() {
    return {
      id: this.id.toString(),
      ...this.props,
      isDeleted: this.isDeleted,
      deletedAt: this.deletedAt,
    };
  }
}
