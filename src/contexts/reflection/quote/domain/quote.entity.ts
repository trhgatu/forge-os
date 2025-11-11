import { QuoteStatus } from '@shared/enums';
import { QuoteId } from './value-objects/quote-id.vo';

interface QuoteProps {
  content: Map<string, string>;
  author?: string;
  source?: string;
  tags?: string[];
  status: QuoteStatus;
  createdAt: Date;
  updatedAt: Date;
}

export class Quote {
  private constructor(
    public readonly id: QuoteId,
    private props: QuoteProps,
    private isDeleted = false,
    private deletedAt?: Date,
  ) {}

  static create(
    props: Omit<QuoteProps, 'createdAt' | 'updatedAt'>,
    id: QuoteId,
    now: Date,
  ): Quote {
    return new Quote(id, {
      ...props,
      tags: props.tags ?? [],
      status: props.status ?? QuoteStatus.INTERNAL,
      createdAt: now,
      updatedAt: now,
    });
  }

  static createFromPersistence(
    data: QuoteProps & {
      id: string;
      isDeleted?: boolean;
      deletedAt?: Date;
    },
  ): Quote {
    return new Quote(
      QuoteId.create(data.id),
      {
        ...data,
      },
      data.isDeleted ?? false,
      data.deletedAt,
    );
  }

  updateInfo(
    props: Partial<Omit<QuoteProps, 'createdAt' | 'updatedAt'>>,
  ): void {
    if (props.content) {
      for (const [lang, val] of props.content.entries()) {
        this.props.content.set(lang, val);
      }
    }

    if (props.author !== undefined) {
      this.props.author = props.author;
    }

    if (props.source !== undefined) {
      this.props.source = props.source;
    }

    if (props.tags) {
      this.props.tags = props.tags;
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

  get isQuoteDeleted(): boolean {
    return this.isDeleted;
  }

  localizedContent(lang: string): string {
    return this.props.content.get(lang) ?? this.props.content.get('en') ?? '';
  }

  get content() {
    return this.props.content;
  }

  get author() {
    return this.props.author;
  }

  get source() {
    return this.props.source;
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
      content: this.props.content,
      author: this.props.author,
      source: this.props.source,
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
      content: this.localizedContent(lang),
      author: this.author,
      source: this.source,
      tags: this.tags,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      isDeleted: this.isDeleted,
      deletedAt: this.deletedAt,
    };
  }
}
