import { JournalId } from './value-objects/journal-id.vo';

export type JournalProps = {
  title: string;
  content: string;
  mood?: string;
  tags: string[];
  date: Date;
  isDeleted: boolean;
  deletedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
};

export class Journal {
  private constructor(
    private props: JournalProps,
    private readonly id: JournalId,
  ) {}

  static create(props: Partial<JournalProps>, id: JournalId): Journal {
    const now = new Date();
    return new Journal(
      {
        title: props.title ?? '',
        content: props.content ?? '',
        mood: props.mood,
        tags: props.tags ?? [],
        date: props.date ?? now,
        isDeleted: props.isDeleted ?? false,
        deletedAt: props.deletedAt,
        createdAt: props.createdAt ?? now,
        updatedAt: props.updatedAt ?? now,
      },
      id,
    );
  }

  update(data: Partial<JournalProps>) {
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
