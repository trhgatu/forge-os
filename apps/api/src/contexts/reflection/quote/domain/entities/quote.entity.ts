import { AggregateRoot, IEvent } from '@nestjs/cqrs';
import { QuoteStatus } from '@shared/enums';
import { QuoteId } from '../value-objects/quote-id.vo';
import { QuoteModifiedEvent } from '../../application/events/quote-modified.event';
import { CreateQuotePayload } from '../../application/commands/create-quote/create-quote.command';

interface QuotePersistenceProps {
  id: string;
  content: Record<string, string> | Map<string, string>;
  author?: string;
  source?: string;
  tags: string[];
  mood?: string;
  status: QuoteStatus;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
  deletedAt?: Date;
}

export class Quote extends AggregateRoot<IEvent> {
  constructor(
    public readonly id: QuoteId,
    private _content: Map<string, string>,
    private _author: string | undefined,
    private _source: string | undefined,
    private _tags: string[],
    private _mood: string | undefined,
    private _status: QuoteStatus,
    public readonly createdAt: Date,
    private _updatedAt: Date,
    private _isDeleted: boolean = false,
    private _deletedAt?: Date,
  ) {
    super();
  }

  get content() {
    return this._content;
  }
  get author() {
    return this._author;
  }
  get status() {
    return this._status;
  }
  get isDeleted() {
    return this._isDeleted;
  }
  get source() {
    return this._source;
  }
  get tags() {
    return this._tags;
  }
  get mood() {
    return this._mood;
  }
  get updatedAt() {
    return this._updatedAt;
  }
  get deletedAt() {
    return this._deletedAt;
  }

  static create(id: QuoteId, payload: CreateQuotePayload): Quote {
    const now = new Date();
    const quote = new Quote(
      id,
      new Map(Object.entries(payload.content)),
      payload.author ?? 'Unknown',
      payload.source,
      payload.tags ?? [],
      payload.mood,
      payload.status ?? QuoteStatus.INTERNAL,
      now,
      now,
    );
    quote.apply(new QuoteModifiedEvent(quote.id.value, 'create'));
    return quote;
  }

  static createFromPersistence(id: string, data: QuotePersistenceProps): Quote {
    return new Quote(
      QuoteId.create(id),
      data.content instanceof Map ? data.content : new Map(Object.entries(data.content)),
      data.author,
      data.source,
      data.tags,
      data.mood,
      data.status,
      data.createdAt,
      data.updatedAt,
      data.isDeleted,
      data.deletedAt,
    );
  }

  public toPersistence() {
    return {
      id: this.id.value,
      content: this._content,
      author: this._author,
      source: this._source,
      tags: this._tags,
      mood: this._mood,
      status: this._status,
      isDeleted: this._isDeleted,
      deletedAt: this._deletedAt,
      createdAt: this.createdAt,
      updatedAt: this._updatedAt,
    };
  }

  public updateInfo(props: Partial<QuotePersistenceProps>): void {
    if (props.content) {
      for (const [lang, val] of Object.entries(props.content)) {
        this._content.set(lang, val as string);
      }
    }
    if (props.author !== undefined) this._author = props.author;
    if (props.source !== undefined) this._source = props.source;
    if (props.tags) this._tags = props.tags;
    if (props.status) this._status = props.status;

    this._updatedAt = new Date();
    this.apply(new QuoteModifiedEvent(this.id.value, 'update'));
  }

  public softDelete(): void {
    if (this._isDeleted) return;
    this._isDeleted = true;
    this._deletedAt = new Date();
    this.apply(new QuoteModifiedEvent(this.id.value, 'soft-delete'));
  }

  public restore(): void {
    if (!this._isDeleted) return;

    this._isDeleted = false;
    this._deletedAt = undefined;
    this._updatedAt = new Date();
    this.apply(new QuoteModifiedEvent(this.id.value, 'restore'));
  }

  public localizedContent(lang: string): string {
    return this._content.get(lang) ?? this._content.get('en') ?? '';
  }
}
