import { CardId } from './value-objects/card-id.vo';
import { AggregateRoot } from '../../../../shared/domain/aggregate-root.base';

interface CardProps {
  userId: string;
  deckId: string;
  vocabularyId: string;
  conceptId?: string | null;
  highlightText?: string | null;
  personalNote?: string | null;
  customFront?: string | null;
  customBack?: string | null;
  interval: number;
  easiness: number;
  repetitions: number;
  state: string;
  nextReviewDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

export class Card extends AggregateRoot<CardId> {
  private constructor(
    id: CardId,
    private props: CardProps,
  ) {
    super(id);
  }

  static create(
    props: Omit<
      CardProps,
      | 'interval'
      | 'easiness'
      | 'repetitions'
      | 'state'
      | 'nextReviewDate'
      | 'createdAt'
      | 'updatedAt'
    > & {
      interval?: number;
      easiness?: number;
      repetitions?: number;
      state?: string;
      nextReviewDate?: Date;
    },
    id: CardId,
  ): Card {
    const now = new Date();
    return new Card(id, {
      ...props,
      interval: props.interval ?? 1,
      easiness: props.easiness ?? 2.5,
      repetitions: props.repetitions ?? 0,
      state: props.state ?? 'review',
      nextReviewDate: props.nextReviewDate ?? now,
      createdAt: now,
      updatedAt: now,
    });
  }

  static createFromPersistence(props: CardProps, id: string): Card {
    return new Card(CardId.fromString(id), props);
  }

  // --- Spaced Repetition SM-2 Logic ---
  public review(rating: number): {
    prevInterval: number;
    prevEasiness: number;
    prevRepetitions: number;
    newInterval: number;
    newEasiness: number;
  } {
    const prevInterval = this.props.interval;
    const prevEasiness = this.props.easiness;
    const prevRepetitions = this.props.repetitions;

    let interval = 1;
    let easiness = prevEasiness;
    let repetitions = prevRepetitions;
    let state = 'review';

    if (rating < 3) {
      repetitions = 0;
      interval = 1;
      state = 'relearn';
      easiness = Math.max(1.3, prevEasiness - 0.2);
    } else {
      if (repetitions === 0) {
        interval = 1;
      } else if (repetitions === 1) {
        interval = 4;
      } else {
        interval = Math.round(prevInterval * prevEasiness);
      }

      repetitions = repetitions + 1;
      state = 'review';

      const normalizedQuality = rating + 1; // 1-4 scale to 2-5 scale
      easiness =
        prevEasiness + (0.1 - (5 - normalizedQuality) * (0.08 + (5 - normalizedQuality) * 0.02));
      easiness = Math.max(1.3, easiness);
    }

    const nextReviewDate = new Date();
    nextReviewDate.setDate(nextReviewDate.getDate() + interval);

    this.props.interval = interval;
    this.props.easiness = easiness;
    this.props.repetitions = repetitions;
    this.props.state = state;
    this.props.nextReviewDate = nextReviewDate;
    this.props.updatedAt = new Date();

    return {
      prevInterval,
      prevEasiness,
      prevRepetitions,
      newInterval: interval,
      newEasiness: easiness,
    };
  }

  // --- Getters ---
  get userId() {
    return this.props.userId;
  }
  get deckId() {
    return this.props.deckId;
  }
  get vocabularyId() {
    return this.props.vocabularyId;
  }
  get conceptId() {
    return this.props.conceptId;
  }
  get highlightText() {
    return this.props.highlightText;
  }
  get personalNote() {
    return this.props.personalNote;
  }
  get customFront() {
    return this.props.customFront;
  }
  get customBack() {
    return this.props.customBack;
  }
  get interval() {
    return this.props.interval;
  }
  get easiness() {
    return this.props.easiness;
  }
  get repetitions() {
    return this.props.repetitions;
  }
  get state() {
    return this.props.state;
  }
  get nextReviewDate() {
    return this.props.nextReviewDate;
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
