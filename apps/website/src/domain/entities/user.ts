import { Email } from '../value-objects/email';
import { UserId } from '../value-objects/user-id';

export interface UserProps {
  readonly id: UserId;
  readonly email: Email;
  readonly name: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export class User {
  private constructor(private readonly props: UserProps) {}

  public static create(params: {
    email: Email;
    name: string;
  }): User {
    const now = new Date();

    return new User({
      id: UserId.generate(),
      email: params.email,
      name: params.name,
      createdAt: now,
      updatedAt: now,
    });
  }

  public static fromPersistence(props: UserProps): User {
    return new User(props);
  }

  public get id(): UserId {
    return this.props.id;
  }

  public get email(): Email {
    return this.props.email;
  }

  public get name(): string {
    return this.props.name;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public get updatedAt(): Date {
    return this.props.updatedAt;
  }

  public updateName(newName: string): User {
    if (!newName || newName.trim().length === 0) {
      throw new Error('User name cannot be empty');
    }

    // Ensure enough time has passed for a different timestamp
    const now = new Date();
    const updatedAt = now.getTime() <= this.props.updatedAt.getTime()
      ? new Date(this.props.updatedAt.getTime() + 1)
      : now;

    return new User({
      ...this.props,
      name: newName.trim(),
      updatedAt,
    });
  }

  public equals(other: User): boolean {
    return this.props.id.equals(other.props.id);
  }

  public toJSON(): UserProps {
    return {
      ...this.props,
    };
  }
}