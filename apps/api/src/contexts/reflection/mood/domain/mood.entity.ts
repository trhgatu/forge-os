import { MoodId } from './value-objects/mood-id.vo';

export type MoodProps = {
  mood: string;
  note?: string;
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
    private readonly id: MoodId,
  ) {}

  static create(props: Partial<MoodProps>, id: MoodId): Mood {
    const now = new Date();
    return new Mood(
      {
        mood: props.mood ?? '',
        note: props.note,
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

  toPrimitives() {
    return {
      id: this.id.toString(),
      ...this.props,
    };
  }
}
