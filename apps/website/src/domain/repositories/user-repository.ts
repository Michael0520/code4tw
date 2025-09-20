import { User } from '../entities/user';
import { UserId } from '../value-objects/user-id';
import { Email } from '../value-objects/email';

export type FindUserResult<T = User> =
  | { success: true; user: T }
  | { success: false; error: 'USER_NOT_FOUND' };

export type CreateUserResult<T = User> =
  | { success: true; user: T }
  | { success: false; error: 'EMAIL_ALREADY_EXISTS' | 'INVALID_DATA' };

export type UpdateUserResult<T = User> =
  | { success: true; user: T }
  | { success: false; error: 'USER_NOT_FOUND' | 'INVALID_DATA' };

export type DeleteUserResult =
  | { success: true }
  | { success: false; error: 'USER_NOT_FOUND' };

export interface UserRepository {
  findById(id: UserId): Promise<FindUserResult>;
  findByEmail(email: Email): Promise<FindUserResult>;
  create(user: User): Promise<CreateUserResult>;
  update(user: User): Promise<UpdateUserResult>;
  delete(id: UserId): Promise<DeleteUserResult>;
  exists(email: Email): Promise<boolean>;
}