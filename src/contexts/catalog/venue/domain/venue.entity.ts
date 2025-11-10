import { VenueStatus } from '@shared/enums';
import { VenueId } from '../domain/value-objects/venue-id.vo';

export interface Coordinates {
  lat: number;
  lng: number;
}

interface VenueProps {
  name: string;
  slug?: string;
  location: string;
  sportType: string;
  status?: VenueStatus;
  description?: string;
  coordinates?: Coordinates;
  coverImage?: string;
  images?: string[];
  numOfCourts?: number;
  phoneNumber?: string;
  email?: string;
  website?: string;
  openHour?: string;
  closeHour?: string;
  pricePerHour?: number;
  ownerId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Venue {
  private constructor(
    public readonly id: VenueId,
    private props: VenueProps,
    private isDeleted = false,
    private deletedAt?: Date,
  ) {}
  static createFromPersistence(
    data: VenueProps & {
      id: string;
      isDeleted?: boolean;
      deletedAt?: Date;
    },
  ): Venue {
    return new Venue(
      VenueId.create(data.id),
      {
        ...data,
      },
      data.isDeleted ?? false,
      data.deletedAt,
    );
  }

  static async create(
    props: VenueProps,
    generateId: () => string,
    generateSlug: (name: string) => Promise<string>,
  ): Promise<Venue> {
    const id = VenueId.create(generateId());
    const slug = await generateSlug(props.name);

    return new Venue(id, {
      ...props,
      slug,
      status: props.status ?? VenueStatus.ACTIVE,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  updateInfo(props: Partial<VenueProps>) {
    if (props.pricePerHour !== undefined && props.pricePerHour < 0) {
      throw new Error('Price per hour must be positive.');
    }

    if (
      props.openHour &&
      props.closeHour &&
      props.openHour >= props.closeHour
    ) {
      throw new Error('Open hour must be before close hour.');
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

  get name() {
    return this.props.name;
  }
  get slug() {
    return this.props.slug;
  }
  get location() {
    return this.props.location;
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
  get coordinates() {
    return this.props.coordinates;
  }
  get pricePerHour() {
    return this.props.pricePerHour;
  }
  get isVenueDeleted() {
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
      location: this.location,
      sportType: this.sportType,
      status: this.status,
      description: this.description,
      coordinates: this.coordinates,
      coverImage: this.props.coverImage,
      images: this.props.images,
      numOfCourts: this.props.numOfCourts,
      phoneNumber: this.props.phoneNumber,
      email: this.props.email,
      website: this.props.website,
      openHour: this.props.openHour,
      closeHour: this.props.closeHour,
      pricePerHour: this.pricePerHour,
      ownerId: this.props.ownerId,
      createdAt: this.props.createdAt,
      updatedAt: this.props.updatedAt,
      isDeleted: this.isDeleted,
      deletedAt: this.deletedAt,
    };
  }
}
