import { MoodId } from './value-objects/mood-id.vo';

export type MoodProps = {
  mood: string;
  note?: string;
  intensity?: number;
  tags: string[];
  loggedAt: Date;
  isDeleted: boolean;
  deletedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
};

export class Mood {
  private constructor(
    private props: MoodProps,
    private readonly _id: MoodId,
  ) {}

  public get id(): MoodId {
    return this._id;
  }

  static create(props: Partial<MoodProps>, id: MoodId): Mood {
    const now = new Date();
    return new Mood(
      {
        mood: props.mood ?? '',
        note: props.note,
        intensity: props.intensity,
        tags: props.tags ?? [],
        loggedAt: props.loggedAt ?? now,
        isDeleted: props.isDeleted ?? false,
        deletedAt: props.deletedAt,
        createdAt: props.createdAt ?? now,
        updatedAt: props.updatedAt ?? now,
      },
      id,
    );
  }

  static createFromPersistence(props: MoodProps, id: string): Mood {
    return new Mood(props, MoodId.create(id));
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
      id: this._id.toString(),
      ...this.props,
    };
  }
}
