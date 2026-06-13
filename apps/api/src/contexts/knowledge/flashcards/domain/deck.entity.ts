import { DeckId } from './value-objects/deck-id.vo';
import { AggregateRoot } from '../../../../shared/domain/aggregate-root.base';

interface DeckProps {
  userId: string;
  title: string;
  description?: string | null;
  colorTheme: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Deck extends AggregateRoot<DeckId> {
  private constructor(
    id: DeckId,
    private props: DeckProps,
  ) {
    super(id);
  }

  static create(
    props: Omit<DeckProps, 'createdAt' | 'updatedAt' | 'colorTheme'> & {
      colorTheme?: string;
    },
    id: DeckId,
  ): Deck {
    const now = new Date();
    return new Deck(id, {
      ...props,
      colorTheme: props.colorTheme || 'from-indigo-500 to-cyan-500',
      createdAt: now,
      updatedAt: now,
    });
  }

  static createFromPersistence(props: DeckProps, id: string): Deck {
    return new Deck(DeckId.fromString(id), props);
  }

  // --- Getters ---
  get userId() {
    return this.props.userId;
  }
  get title() {
    return this.props.title;
  }
  get description() {
    return this.props.description;
  }
  get colorTheme() {
    return this.props.colorTheme;
  }
  get createdAt() {
    return this.props.createdAt;
  }
  get updatedAt() {
    return this.props.updatedAt;
  }

  public toPersistence() {
    return {
      id: this.id.value,
      ...this.props,
    };
  }
}
