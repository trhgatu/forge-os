import { RoleId } from './value-objects/role-id.vo';

export interface RoleProps {
  id: RoleId;
  name: string;
  description?: string;
  permissions: string[];
  isSystem: boolean;
  isDeleted: boolean;
  deletedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Role {
  private constructor(private readonly props: RoleProps) {}

  static create(props: Omit<RoleProps, 'isDeleted' | 'deletedAt'>): Role {
    return new Role({ ...props, isDeleted: false });
  }

  static reconstitute(props: RoleProps): Role {
    return new Role(props);
  }

  get id(): RoleId {
    return this.props.id;
  }

  get name(): string {
    return this.props.name;
  }

  get description(): string | undefined {
    return this.props.description;
  }

  get permissions(): string[] {
    return [...this.props.permissions];
  }

  get isSystem(): boolean {
    return this.props.isSystem;
  }

  get isDeleted(): boolean {
    return this.props.isDeleted;
  }

  get deletedAt(): Date | undefined {
    return this.props.deletedAt;
  }

  get createdAt(): Date | undefined {
    return this.props.createdAt;
  }

  get updatedAt(): Date | undefined {
    return this.props.updatedAt;
  }

  update(
    props: Partial<Omit<RoleProps, 'id' | 'isDeleted' | 'deletedAt'>>,
  ): void {
    if (props.name !== undefined) this.props.name = props.name;
    if (props.description !== undefined)
      this.props.description = props.description;
    if (props.permissions !== undefined)
      this.props.permissions = [...props.permissions];
    // isSystem typically shouldn't change
    this.props.updatedAt = new Date();
  }

  delete(): void {
    if (this.props.isDeleted) return;
    this.props.isDeleted = true;
    this.props.deletedAt = new Date();
    this.props.updatedAt = new Date();
  }

  restore(): void {
    if (!this.props.isDeleted) return;
    this.props.isDeleted = false;
    this.props.deletedAt = undefined;

    this.props.updatedAt = new Date();
  }

  // ================
  //   SERIALIZATION
  // ================
  toPrimitives() {
    return {
      id: this.id.toString(),
      name: this.props.name,
      description: this.props.description,
      permissions: this.props.permissions,
      isSystem: this.props.isSystem,
      isDeleted: this.props.isDeleted,
      deletedAt: this.props.deletedAt,
      createdAt: this.props.createdAt,
      updatedAt: this.props.updatedAt,
    };
  }

  toJSON() {
    return this.toPrimitives();
  }
}
