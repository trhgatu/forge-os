import { MemoryStatus, MoodType } from '@shared/enums';
import { MemoryId } from './value-objects/memory-id.vo';
import { AggregateRoot } from '@shared/domain/aggregate-root.base';

interface MemoryProps {
  title: Map<string, string>;
  content: Map<string, string>;
  mood?: MoodType;
  tags?: string[];
  status: MemoryStatus;
  userId?: string;
  imageUrl?: string;
  type?: string;
  createdBy?: string;
  updatedBy?: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Memory extends AggregateRoot<MemoryId> {
  private constructor(
    id: MemoryId,
    private props: MemoryProps,
    private isDeleted = false,
    private deletedAt?: Date,
  ) {
    super(id);
  }

  static create(
    props: Omit<MemoryProps, 'createdAt' | 'updatedAt'>,
    id: MemoryId,
    now: Date,
  ): Memory {
    return new Memory(id, {
      ...props,
      status: props.status ?? MemoryStatus.INTERNAL,
      tags: props.tags ?? [],
      createdBy: props.userId,
      updatedBy: undefined,
      createdAt: now,
      updatedAt: now,
    });
  }

  static createFromPersistence(
    props: MemoryProps,
    id: string,
    isDeleted = false,
    deletedAt?: Date,
  ): Memory {
    return new Memory(MemoryId.create(id), props, isDeleted, deletedAt);
  }

  updateInfo(props: Partial<Omit<MemoryProps, 'createdAt' | 'updatedAt'>>): void {
    if (props.title) {
      for (const [lang, val] of props.title.entries()) {
        this.props.title.set(lang, val);
      }
    }

    if (props.content) {
      for (const [lang, val] of props.content.entries()) {
        this.props.content.set(lang, val);
      }
    }

    if (props.tags) this.props.tags = props.tags;
    if (props.mood !== undefined) this.props.mood = props.mood;
    if (props.status !== undefined) this.props.status = props.status;
    if (props.imageUrl !== undefined) this.props.imageUrl = props.imageUrl;
    if (props.type !== undefined) this.props.type = props.type;
    if (props.userId !== undefined) this.props.updatedBy = props.userId;

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

  get isMemoryDeleted(): boolean {
    return this.isDeleted;
  }

  localizedTitle(lang: string): string {
    const val = this.props.title.get(lang) ?? this.props.title.get('en');
    if (val) return val;
    return this.props.title.values().next().value ?? '';
  }

  localizedContent(lang: string): string {
    const val = this.props.content.get(lang) ?? this.props.content.get('en');
    if (val) return val;
    return this.props.content.values().next().value ?? '';
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
  get status() {
    return this.props.status;
  }
  get userId() {
    return this.props.userId;
  }
  get imageUrl() {
    return this.props.imageUrl;
  }
  get type() {
    return this.props.type;
  }
  get createdBy() {
    return this.props.createdBy;
  }
  get updatedBy() {
    return this.props.updatedBy;
  }
  get createdAt() {
    return this.props.createdAt;
  }
  get updatedAt() {
    return this.props.updatedAt;
  }

  toPersistence() {
    return {
      id: this.id.toString(),
      ...this.props,
      isDeleted: this.isDeleted,
      deletedAt: this.deletedAt,
    };
  }

  toPrimitives(lang: string) {
    return {
      id: this.id.toString(),
      title: this.localizedTitle(lang),
      content: this.localizedContent(lang),
      mood: this.mood,
      tags: this.tags,
      status: this.status,
      userId: this.userId,
      imageUrl: this.imageUrl,
      type: this.type,
      createdBy: this.createdBy,
      updatedBy: this.updatedBy,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      isDeleted: this.isDeleted,
      deletedAt: this.deletedAt,
    };
  }
}
