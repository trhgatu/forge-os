import { MemoryStatus, MoodType } from '@shared/enums';
import { MemoryId } from './value-objects/memory-id.vo';

interface MemoryProps {
  title: Map<string, string>;
  content: Map<string, string>;
  mood?: MoodType;
  tags?: string[];
  status: MemoryStatus;
  createdAt: Date;
  updatedAt: Date;
}

export class Memory {
  private constructor(
    public readonly id: MemoryId,
    private props: MemoryProps,
    private isDeleted = false,
    private deletedAt?: Date,
  ) {}

  static create(
    props: Omit<MemoryProps, 'createdAt' | 'updatedAt'>,
    id: MemoryId,
    now: Date,
  ): Memory {
    return new Memory(id, {
      ...props,
      status: props.status ?? MemoryStatus.INTERNAL,
      tags: props.tags ?? [],
      createdAt: now,
      updatedAt: now,
    });
  }

  static createFromPersistence(
    data: MemoryProps & {
      id: string;
      isDeleted?: boolean;
      deletedAt?: Date;
    },
  ): Memory {
    return new Memory(
      MemoryId.create(data.id),
      {
        ...data,
      },
      data.isDeleted ?? false,
      data.deletedAt,
    );
  }

  updateInfo(
    props: Partial<Omit<MemoryProps, 'createdAt' | 'updatedAt'>>,
  ): void {
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

    if (props.tags) {
      this.props.tags = props.tags;
    }

    if (props.mood !== undefined) {
      this.props.mood = props.mood;
    }

    if (props.status !== undefined) {
      this.props.status = props.status;
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

  get isMemoryDeleted(): boolean {
    return this.isDeleted;
  }

  localizedTitle(lang: string): string {
    return this.props.title.get(lang) ?? this.props.title.get('en') ?? '';
  }

  localizedContent(lang: string): string {
    return this.props.content.get(lang) ?? this.props.content.get('en') ?? '';
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

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  toPersistence() {
    return {
      id: this.id.toString(),
      title: this.props.title,
      content: this.props.content,
      mood: this.props.mood,
      tags: this.props.tags,
      status: this.props.status,
      createdAt: this.props.createdAt,
      updatedAt: this.props.updatedAt,
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
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      isDeleted: this.isDeleted,
      deletedAt: this.deletedAt,
    };
  }
}
