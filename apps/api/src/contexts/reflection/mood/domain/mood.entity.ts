import { MoodId } from './value-objects/mood-id.vo';
import { AggregateRoot } from '../../../../shared/domain/aggregate-root.base';
import { MoodLoggedEvent } from '../application/events/mood-logged.event';

export type MoodProps = {
  mood: string;
  note?: string;
  intensity?: number;
  tags: string[];
  loggedAt: Date;
  isDeleted: boolean;
  deletedAt?: Date;
  userId?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export class Mood extends AggregateRoot<MoodId> {
  private constructor(
    id: MoodId,
    private props: MoodProps,
  ) {
    super(id);
  }

  static create(props: Partial<MoodProps>, id: MoodId): Mood {
    const now = new Date();
    const mood = new Mood(id, {
      mood: props.mood ?? '',
      note: props.note,
      intensity: props.intensity,
      tags: props.tags ?? [],
      loggedAt: props.loggedAt ?? now,
      isDeleted: props.isDeleted ?? false,
      deletedAt: props.deletedAt,
      userId: props.userId,
      createdAt: props.createdAt ?? now,
      updatedAt: props.updatedAt ?? now,
    });

    if (props.userId) {
      mood.addDomainEvent(new MoodLoggedEvent(id, props.userId, props.mood ?? ''));
    }
    return mood;
  }

  static createFromPersistence(props: MoodProps, id: string): Mood {
    return new Mood(MoodId.create(id), props);
  }

  // Getters
  public get userId(): string | undefined {
    return this.props.userId;
  }

  update(data: Partial<MoodProps>) {
    this.props = {
      ...this.props,
      ...data,
      updatedAt: new Date(),
    };
  }

  softDelete() {
    this.props.isDeleted = true;
    this.props.deletedAt = new Date();
  }

  restore() {
    this.props.isDeleted = false;
    this.props.deletedAt = undefined;
  }

  toPersistence() {
    return {
      ...this.props,
    };
  }

  toPrimitives() {
    return {
      id: this.id.toString(),
      ...this.props,
    };
  }
}
