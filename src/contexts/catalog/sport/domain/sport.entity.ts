import { SportStatus } from '@shared/enums';
import { SportId } from './value-objects/sport-id.vo';

interface SportProps {
  name: string;
  slug: string;
  icon?: string;
  description?: string;
  status?: SportStatus;
  sortOrder?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Sport {
  private constructor(
    public readonly id: SportId,
    private props: SportProps,
    private isDeleted = false,
    private deletedAt?: Date,
  ) {}

  static createFromPersistence(
    data: SportProps & {
      id: string;
      isDeleted?: boolean;
      deletedAt?: Date;
    },
  ): Sport {
    return new Sport(
      SportId.create(data.id),
      {
        ...data,
        status: data.status ?? SportStatus.ACTIVE,
      },
      data.isDeleted ?? false,
      data.deletedAt,
    );
  }

  static async create(
    props: Omit<SportProps, 'slug'>,
    generateId: () => string,
    generateSlug: (name: string) => Promise<string>,
  ): Promise<Sport> {
    const id = SportId.create(generateId());
    const slug = await generateSlug(props.name);

    return new Sport(id, {
      ...props,
      slug,
      status: props.status ?? SportStatus.ACTIVE,
      sortOrder: props.sortOrder ?? 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  updateInfo(props: Partial<Omit<SportProps, 'createdAt'>>) {
    this.props = {
      ...this.props,
      ...props,
      updatedAt: new Date(),
    };
  }

  delete() {
    if (this.isDeleted) return;
    this.isDeleted = true;
    this.deletedAt = new Date();
  }

  restore() {
    if (!this.isDeleted) return;
    this.isDeleted = false;
    this.deletedAt = undefined;
  }

  isActive(): boolean {
    return !this.isDeleted && this.props.status === SportStatus.ACTIVE;
  }

  // Getters
  get name() {
    return this.props.name;
  }

  get slug() {
    return this.props.slug;
  }

  get icon() {
    return this.props.icon;
  }

  get description() {
    return this.props.description;
  }

  get status() {
    return this.props.status ?? SportStatus.ACTIVE;
  }

  get sortOrder() {
    return this.props.sortOrder ?? 0;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  get isSportDeleted() {
    return this.isDeleted;
  }

  toPersistence() {
    return {
      id: this.id.toString(),
      ...this.props,
      isDeleted: this.isDeleted,
      deletedAt: this.deletedAt,
    };
  }

  toPrimitives() {
    return {
      id: this.id.toString(),
      name: this.name,
      slug: this.slug,
      icon: this.icon,
      description: this.description,
      status: this.status,
      sortOrder: this.sortOrder,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      isDeleted: this.isDeleted,
      deletedAt: this.deletedAt,
    };
  }
}
