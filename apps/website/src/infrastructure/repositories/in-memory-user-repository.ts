import { User } from '../../domain/entities/user';
import { UserId } from '../../domain/value-objects/user-id';
import { Email } from '../../domain/value-objects/email';
import {
  UserRepository,
  FindUserResult,
  CreateUserResult,
  UpdateUserResult,
  DeleteUserResult,
} from '../../domain/repositories/user-repository';

export class InMemoryUserRepository implements UserRepository {
  private users: Map<string, User> = new Map();

  public async findById(id: UserId): Promise<FindUserResult> {
    const user = this.users.get(id.getValue());

    if (!user) {
      return { success: false, error: 'USER_NOT_FOUND' };
    }

    return { success: true, user };
  }

  public async findByEmail(email: Email): Promise<FindUserResult> {
    for (const user of this.users.values()) {
      if (user.email.equals(email)) {
        return { success: true, user };
      }
    }

    return { success: false, error: 'USER_NOT_FOUND' };
  }

  public async create(user: User): Promise<CreateUserResult> {
    // Check if user with this email already exists
    const existingUser = await this.findByEmail(user.email);
    if (existingUser.success) {
      return { success: false, error: 'EMAIL_ALREADY_EXISTS' };
    }

    // Check if user with this ID already exists
    if (this.users.has(user.id.getValue())) {
      return { success: false, error: 'INVALID_DATA' };
    }

    this.users.set(user.id.getValue(), user);
    return { success: true, user };
  }

  public async update(user: User): Promise<UpdateUserResult> {
    if (!this.users.has(user.id.getValue())) {
      return { success: false, error: 'USER_NOT_FOUND' };
    }

    this.users.set(user.id.getValue(), user);
    return { success: true, user };
  }

  public async delete(id: UserId): Promise<DeleteUserResult> {
    if (!this.users.has(id.getValue())) {
      return { success: false, error: 'USER_NOT_FOUND' };
    }

    this.users.delete(id.getValue());
    return { success: true };
  }

  public async exists(email: Email): Promise<boolean> {
    const result = await this.findByEmail(email);
    return result.success;
  }

  // Test helper methods
  public clear(): void {
    this.users.clear();
  }

  public size(): number {
    return this.users.size;
  }
}