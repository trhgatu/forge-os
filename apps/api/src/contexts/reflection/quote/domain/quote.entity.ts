import { QuoteStatus } from '@shared/enums';
import { QuoteId } from './value-objects/quote-id.vo';

interface QuoteProps {
  content: Map<string, string>;
  author?: string;
  source?: string;
  tags?: string[];
  mood?: string;
  status: QuoteStatus;
  createdAt: Date;
  updatedAt: Date;
}

export class Quote {
  private constructor(
    private readonly _id: QuoteId,
    private props: QuoteProps,
    private isDeleted = false,
    private deletedAt?: Date,
  ) {}

  public get id(): QuoteId {
    return this._id;
  }

  static create(props: Omit<QuoteProps, 'createdAt' | 'updatedAt'>, id: QuoteId, now: Date): Quote {
    return new Quote(id, {
      ...props,
      tags: props.tags ?? [],
      status: props.status ?? QuoteStatus.INTERNAL,
      createdAt: now,
      updatedAt: now,
    });
  }

  static createFromPersistence(
    props: QuoteProps,
    id: string,
    isDeleted = false,
    deletedAt?: Date,
  ): Quote {
    return new Quote(QuoteId.create(id), props, isDeleted, deletedAt);
  }

  updateInfo(props: Partial<Omit<QuoteProps, 'createdAt' | 'updatedAt'>>): void {
    if (props.content) {
      for (const [lang, val] of props.content.entries()) {
        this.props.content.set(lang, val);
      }
    }

    if (props.author !== undefined) this.props.author = props.author;
    if (props.source !== undefined) this.props.source = props.source;
    if (props.tags) this.props.tags = props.tags;
    if (props.mood !== undefined) this.props.mood = props.mood;
    if (props.status !== undefined) this.props.status = props.status;

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

  get isQuoteDeleted(): boolean { return this.isDeleted; }

  localizedContent(lang: string): string {
    return this.props.content.get(lang) ?? this.props.content.get('en') ?? '';
  }

  get content() { return this.props.content; }
  get author() { return this.props.author; }
  get source() { return this.props.source; }
  get tags() { return this.props.tags; }
  get mood() { return this.props.mood; }
  get status() { return this.props.status; }
  get createdAt() { return this.props.createdAt; }
  get updatedAt() { return this.props.updatedAt; }

  toPersistence() {
    return {
      id: this._id.toString(),
      ...this.props,
      isDeleted: this.isDeleted,
      deletedAt: this.deletedAt,
    };
  }

  toPrimitives(lang: string) {
    return {
      id: this._id.toString(),
      content: this.localizedContent(lang),
      author: this.author,
      source: this.source,
      tags: this.tags,
      mood: this.mood,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      isDeleted: this.isDeleted,
      deletedAt: this.deletedAt,
    };
  }
}
