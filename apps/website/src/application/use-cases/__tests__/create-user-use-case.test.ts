import { describe, it, expect, beforeEach, vi } from 'vitest';
import { CreateUserUseCase } from '../create-user-use-case';
import { InMemoryUserRepository } from '../../../infrastructure/repositories/in-memory-user-repository';
import { User } from '../../../domain/entities/user';
import { Email } from '../../../domain/value-objects/email';

describe('CreateUserUseCase', () => {
  let useCase: CreateUserUseCase;
  let userRepository: InMemoryUserRepository;

  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    useCase = new CreateUserUseCase(userRepository);
  });

  describe('execute', () => {
    it('should create user when valid command is provided', async () => {
      // Arrange
      const command = {
        email: 'test@example.com',
        name: 'John Doe',
      };

      // Act
      const result = await useCase.execute(command);

      // Assert
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.user).toBeInstanceOf(User);
        expect(result.user.email.getValue()).toBe(command.email);
        expect(result.user.name).toBe(command.name);
      }
    });

    it('should persist user to repository when creation is successful', async () => {
      // Arrange
      const command = {
        email: 'test@example.com',
        name: 'John Doe',
      };

      // Act
      const result = await useCase.execute(command);

      // Assert
      expect(result.success).toBe(true);
      expect(userRepository.size()).toBe(1);

      if (result.success) {
        const foundUser = await userRepository.findByEmail(Email.create(command.email));
        expect(foundUser.success).toBe(true);
        if (foundUser.success) {
          expect(foundUser.user.id.equals(result.user.id)).toBe(true);
        }
      }
    });

    it('should return error when email already exists', async () => {
      // Arrange
      const existingUser = User.create({
        email: Email.create('test@example.com'),
        name: 'Existing User',
      });
      await userRepository.create(existingUser);

      const command = {
        email: 'test@example.com',
        name: 'John Doe',
      };

      // Act
      const result = await useCase.execute(command);

      // Assert
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBe('EMAIL_ALREADY_EXISTS');
      }
      expect(userRepository.size()).toBe(1); // Should not create duplicate
    });

    it('should return error when email is invalid', async () => {
      // Arrange
      const invalidEmails = [
        'invalid-email',
        '',
        '@example.com',
        'test@',
      ];

      // Act & Assert
      for (const invalidEmail of invalidEmails) {
        const command = {
          email: invalidEmail,
          name: 'John Doe',
        };

        const result = await useCase.execute(command);

        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error).toBe('INVALID_EMAIL');
        }
      }
    });

    it('should return error when name is invalid', async () => {
      // Arrange
      const invalidNames = [
        '',
        '   ',
        'a'.repeat(101), // too long
      ];

      // Act & Assert
      for (const invalidName of invalidNames) {
        const command = {
          email: 'test@example.com',
          name: invalidName,
        };

        const result = await useCase.execute(command);

        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error).toBe('INVALID_NAME');
        }
      }
    });

    it('should return error when command has missing email', async () => {
      // Arrange
      const command = {
        email: undefined as unknown as string,
        name: 'John Doe',
      };

      // Act
      const result = await useCase.execute(command);

      // Assert
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBe('INVALID_EMAIL');
      }
    });

    it('should return error when command has missing name', async () => {
      // Arrange
      const command = {
        email: 'test@example.com',
        name: undefined as unknown as string,
      };

      // Act
      const result = await useCase.execute(command);

      // Assert
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBe('INVALID_NAME');
      }
    });

    it('should trim whitespace from name before creating user', async () => {
      // Arrange
      const command = {
        email: 'test@example.com',
        name: '  John Doe  ',
      };

      // Act
      const result = await useCase.execute(command);

      // Assert
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.user.name).toBe('John Doe');
      }
    });

    it('should handle repository creation errors', async () => {
      // Arrange
      const mockRepository = {
        exists: vi.fn().mockResolvedValue(false),
        create: vi.fn().mockResolvedValue({ success: false, error: 'INVALID_DATA' }),
      } as any;

      const useCaseWithMockRepo = new CreateUserUseCase(mockRepository);
      const command = {
        email: 'test@example.com',
        name: 'John Doe',
      };

      // Act
      const result = await useCaseWithMockRepo.execute(command);

      // Assert
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBe('INVALID_DATA');
      }
    });
  });
});