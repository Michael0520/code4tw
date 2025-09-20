import { describe, it, expect, beforeEach } from 'vitest';
import { User } from '../user';
import { Email } from '../../value-objects/email';
import { UserId } from '../../value-objects/user-id';

describe('User', () => {
  let validEmail: Email;
  let validName: string;

  beforeEach(() => {
    validEmail = Email.create('test@example.com');
    validName = 'John Doe';
  });

  describe('create', () => {
    it('should create user when valid parameters are provided', () => {
      // Act
      const user = User.create({
        email: validEmail,
        name: validName,
      });

      // Assert
      expect(user.email).toBe(validEmail);
      expect(user.name).toBe(validName);
      expect(user.id).toBeInstanceOf(UserId);
      expect(user.createdAt).toBeInstanceOf(Date);
      expect(user.updatedAt).toBeInstanceOf(Date);
      expect(user.createdAt.getTime()).toBe(user.updatedAt.getTime());
    });

    it('should create user with unique id each time', () => {
      // Act
      const user1 = User.create({ email: validEmail, name: validName });
      const user2 = User.create({ email: validEmail, name: validName });

      // Assert
      expect(user1.id.equals(user2.id)).toBe(false);
    });
  });

  describe('fromPersistence', () => {
    it('should create user from persistence data', () => {
      // Arrange
      const userId = UserId.generate();
      const createdAt = new Date('2023-01-01');
      const updatedAt = new Date('2023-01-02');

      // Act
      const user = User.fromPersistence({
        id: userId,
        email: validEmail,
        name: validName,
        createdAt,
        updatedAt,
      });

      // Assert
      expect(user.id).toBe(userId);
      expect(user.email).toBe(validEmail);
      expect(user.name).toBe(validName);
      expect(user.createdAt).toBe(createdAt);
      expect(user.updatedAt).toBe(updatedAt);
    });
  });

  describe('updateName', () => {
    it('should update name when valid name is provided', () => {
      // Arrange
      const user = User.create({ email: validEmail, name: validName });
      const newName = 'Jane Doe';
      const originalUpdatedAt = user.updatedAt;

      // Act
      const updatedUser = user.updateName(newName);

      // Assert
      expect(updatedUser.name).toBe(newName);
      expect(updatedUser.id.equals(user.id)).toBe(true);
      expect(updatedUser.email.equals(user.email)).toBe(true);
      expect(updatedUser.createdAt).toBe(user.createdAt);
      expect(updatedUser.updatedAt.getTime()).toBeGreaterThan(originalUpdatedAt.getTime());
    });

    it('should trim whitespace from new name', () => {
      // Arrange
      const user = User.create({ email: validEmail, name: validName });
      const nameWithWhitespace = '  Jane Doe  ';

      // Act
      const updatedUser = user.updateName(nameWithWhitespace);

      // Assert
      expect(updatedUser.name).toBe('Jane Doe');
    });

    it('should throw error when empty name is provided', () => {
      // Arrange
      const user = User.create({ email: validEmail, name: validName });
      const emptyNames = ['', ' ', '   '];

      // Act & Assert
      emptyNames.forEach(emptyName => {
        expect(() => user.updateName(emptyName)).toThrow('User name cannot be empty');
      });
    });

    it('should not mutate original user', () => {
      // Arrange
      const user = User.create({ email: validEmail, name: validName });
      const originalName = user.name;

      // Act
      user.updateName('New Name');

      // Assert
      expect(user.name).toBe(originalName);
    });
  });

  describe('equals', () => {
    it('should return true when users have same id', () => {
      // Arrange
      const userId = UserId.generate();
      const user1 = User.fromPersistence({
        id: userId,
        email: validEmail,
        name: validName,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      const user2 = User.fromPersistence({
        id: userId,
        email: Email.create('different@example.com'),
        name: 'Different Name',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      // Act
      const result = user1.equals(user2);

      // Assert
      expect(result).toBe(true);
    });

    it('should return false when users have different ids', () => {
      // Arrange
      const user1 = User.create({ email: validEmail, name: validName });
      const user2 = User.create({ email: validEmail, name: validName });

      // Act
      const result = user1.equals(user2);

      // Assert
      expect(result).toBe(false);
    });
  });

  describe('toJSON', () => {
    it('should return user properties as JSON', () => {
      // Arrange
      const user = User.create({ email: validEmail, name: validName });

      // Act
      const json = user.toJSON();

      // Assert
      expect(json).toEqual({
        id: user.id,
        email: user.email,
        name: user.name,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      });
    });
  });
});