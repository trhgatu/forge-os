import { UserId } from './value-objects/user-id.vo';

export interface UserProps {
  id: UserId;
  name: string;
  email: string;
  password?: string;
  role?: {
    id: string;
    name: string;
    permissions: string[];
  };
  roleId: string;
  refreshToken?: string;
  isDeleted: boolean;
  deletedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  connections?: UserConnection[];
}

export interface UserConnection {
  provider: string; // e.g., 'github', 'google'
  identifier: string; // e.g., 'thuyencode', '10238129'
  metadata?: Record<string, any>;
  connectedAt: Date;
}

export class User {
  private constructor(private readonly props: UserProps) {}

  static create(props: Omit<UserProps, 'isDeleted' | 'deletedAt'>): User {
    return new User({
      ...props,
      isDeleted: false,
    });
  }

  static reconstitute(props: UserProps): User {
    return new User(props);
  }

  get id(): UserId {
    return this.props.id;
  }

  get name(): string {
    return this.props.name;
  }

  get email(): string {
    return this.props.email;
  }

  get password(): string | undefined {
    return this.props.password;
  }

  get roleId(): string {
    return this.props.roleId;
  }

  get role(): { id: string; name: string; permissions: string[] } | undefined {
    return this.props.role;
  }

  get refreshToken(): string | undefined {
    return this.props.refreshToken;
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

  update(props: Partial<Omit<UserProps, 'id' | 'isDeleted' | 'deletedAt'>>): void {
    if (props.name !== undefined) this.props.name = props.name;
    if (props.email !== undefined) this.props.email = props.email;
    if (props.password !== undefined) this.props.password = props.password;
    if (props.roleId !== undefined) this.props.roleId = props.roleId;
    if (props.refreshToken !== undefined) this.props.refreshToken = props.refreshToken;
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

  toPrimitives() {
    return {
      id: this.id.toString(),
      name: this.props.name,
      email: this.props.email,
      roleId: this.props.roleId,
      role: this.props.role,
      connections: this.props.connections || [],
      // refreshToken: this.props.refreshToken, // Excluded for security
      isDeleted: this.props.isDeleted,
      deletedAt: this.props.deletedAt,
      createdAt: this.props.createdAt,
      updatedAt: this.props.updatedAt,
    };
  }

  get connections(): UserConnection[] {
    return [...(this.props.connections || [])];
  }

  addConnection(connection: UserConnection): void {
    if (!this.props.connections) {
      this.props.connections = [];
    }
    // Prevent duplicates
    const exists = this.props.connections.some(
      (c) => c.provider === connection.provider && c.identifier === connection.identifier,
    );
    if (!exists) {
      this.props.connections.push(connection);
      this.props.updatedAt = new Date();
    }
  }

  toJSON() {
    return this.toPrimitives();
  }
}
