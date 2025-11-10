import { CourtId } from '../domain/value-objects/court-id.vo';
import { VenueId } from '../../venue/domain/value-objects/venue-id.vo';
import { CourtStatus, SportType } from '@shared/enums';

interface CourtProps {
  name: string;
  slug?: string;
  sportType: SportType;
  status?: CourtStatus;
  description?: string;
  images?: string[];
  coverImage?: string;
  pricePerHour?: number;
  isIndoor?: boolean;
  maxPlayers?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Court {
  private constructor(
    public readonly id: CourtId,
    public readonly venueId: VenueId,
    private props: CourtProps,
    private isDeleted = false,
    private deletedAt?: Date,
  ) {}

  static createFromPersistence(
    data: CourtProps & {
      id: string;
      venueId: string;
      isDeleted?: boolean;
      deletedAt?: Date;
    },
  ): Court {
    return new Court(
      CourtId.create(data.id),
      VenueId.create(data.venueId),
      {
        ...data,
      },
      data.isDeleted ?? false,
      data.deletedAt,
    );
  }

  static async create(
    props: CourtProps,
    venueId: string,
    generateId: () => string,
    generateSlug: (name: string) => Promise<string>,
  ): Promise<Court> {
    const id = CourtId.create(generateId());
    const slug = await generateSlug(props.name);

    return new Court(id, VenueId.create(venueId), {
      ...props,
      slug,
      status: props.status ?? CourtStatus.ACTIVE,
      pricePerHour: props.pricePerHour ?? 0,
      images: props.images ?? [],
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  updateInfo(props: Partial<Omit<CourtProps, 'createdAt'>>) {
    if (props.pricePerHour !== undefined && props.pricePerHour < 0) {
      throw new Error('Price per hour must be positive.');
    }

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
    return !this.isDeleted && this.props.status === CourtStatus.ACTIVE;
  }

  hasSameSportType(venueSportType: SportType): boolean {
    return this.props.sportType === venueSportType;
  }

  get name() {
    return this.props.name;
  }
  get slug() {
    return this.props.slug!;
  }
  get sportType() {
    return this.props.sportType;
  }
  get status() {
    return this.props.status!;
  }
  get description() {
    return this.props.description;
  }
  get images() {
    return this.props.images ?? [];
  }
  get coverImage() {
    return this.props.coverImage;
  }
  get pricePerHour() {
    return this.props.pricePerHour ?? 0;
  }
  get isIndoor() {
    return this.props.isIndoor;
  }
  get maxPlayers() {
    return this.props.maxPlayers;
  }
  get createdAt() {
    return this.props.createdAt;
  }
  get updatedAt() {
    return this.props.updatedAt;
  }
  get isCourtDeleted() {
    return this.isDeleted;
  }

  toPersistence() {
    return {
      id: this.id.toString(),
      venueId: this.venueId.toString(),
      ...this.props,
      isDeleted: this.isDeleted,
      deletedAt: this.deletedAt,
    };
  }

  toPrimitives() {
    return {
      id: this.id.toString(),
      venueId: this.venueId.toString(),
      name: this.name,
      slug: this.slug,
      sportType: this.sportType,
      status: this.status,
      description: this.description,
      images: this.images,
      coverImage: this.coverImage,
      pricePerHour: this.pricePerHour,
      isIndoor: this.isIndoor,
      maxPlayers: this.maxPlayers,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      isDeleted: this.isDeleted,
      deletedAt: this.deletedAt,
    };
  }
}
