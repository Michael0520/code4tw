import { User } from '../../domain/entities/user';
import { Email } from '../../domain/value-objects/email';
import { UserRepository, CreateUserResult } from '../../domain/repositories/user-repository';

export interface CreateUserCommand {
  email: string;
  name: string;
}

export type CreateUserUseCaseResult =
  | { success: true; user: User }
  | { success: false; error: 'INVALID_EMAIL' | 'INVALID_NAME' | 'EMAIL_ALREADY_EXISTS' };

export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  public async execute(command: CreateUserCommand): Promise<CreateUserUseCaseResult> {
    // Validate input
    const validationResult = this.validateCommand(command);
    if (!validationResult.success) {
      return validationResult;
    }

    try {
      // Check if user already exists
      const email = Email.create(command.email);
      const userExists = await this.userRepository.exists(email);

      if (userExists) {
        return { success: false, error: 'EMAIL_ALREADY_EXISTS' };
      }

      // Create user entity
      const user = User.create({
        email,
        name: command.name.trim(),
      });

      // Persist user
      const result = await this.userRepository.create(user);

      if (!result.success) {
        return { success: false, error: result.error };
      }

      return { success: true, user: result.user };
    } catch (error) {
      // Handle domain validation errors
      if (error instanceof Error && error.message.includes('Invalid email')) {
        return { success: false, error: 'INVALID_EMAIL' };
      }

      throw error; // Re-throw unexpected errors
    }
  }

  private validateCommand(command: CreateUserCommand): CreateUserUseCaseResult {
    if (!command.email || typeof command.email !== 'string') {
      return { success: false, error: 'INVALID_EMAIL' };
    }

    if (!command.name || typeof command.name !== 'string' || command.name.trim().length === 0) {
      return { success: false, error: 'INVALID_NAME' };
    }

    if (command.name.trim().length > 100) {
      return { success: false, error: 'INVALID_NAME' };
    }

    return { success: true, user: {} as User }; // Type placeholder for validation
  }
}