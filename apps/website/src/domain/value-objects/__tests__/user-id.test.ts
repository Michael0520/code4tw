import { describe, it, expect } from 'vitest';
import { UserId } from '../user-id';

describe('UserId', () => {
  describe('create', () => {
    it('should create user id when valid uuid is provided', () => {
      // Arrange
      const validUuid = '123e4567-e89b-12d3-a456-426614174000';

      // Act
      const userId = UserId.create(validUuid);

      // Assert
      expect(userId.getValue()).toBe(validUuid);
      expect(userId.toString()).toBe(validUuid);
    });

    it('should throw error when invalid uuid format is provided', () => {
      // Arrange
      const invalidUuids = [
        'invalid-uuid',
        '123',
        '123e4567-e89b-12d3-a456', // too short
        '123e4567-e89b-12d3-a456-426614174000-extra', // too long
        'ggge4567-e89b-12d3-a456-426614174000', // invalid characters
      ];

      // Act & Assert
      invalidUuids.forEach(invalidUuid => {
        expect(() => UserId.create(invalidUuid)).toThrow(`Invalid UserId format: ${invalidUuid}`);
      });
    });

    it('should throw error when empty value is provided', () => {
      // Arrange
      const emptyValues = ['', ' ', null, undefined];

      // Act & Assert
      emptyValues.forEach(emptyValue => {
        expect(() => UserId.create(emptyValue as string)).toThrow('UserId cannot be empty');
      });
    });
  });

  describe('generate', () => {
    it('should generate valid user id', () => {
      // Act
      const userId = UserId.generate();

      // Assert
      expect(userId.getValue()).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i);
    });

    it('should generate unique user ids', () => {
      // Act
      const userId1 = UserId.generate();
      const userId2 = UserId.generate();

      // Assert
      expect(userId1.getValue()).not.toBe(userId2.getValue());
      expect(userId1.equals(userId2)).toBe(false);
    });
  });

  describe('equals', () => {
    it('should return true when user ids are the same', () => {
      // Arrange
      const uuid = '123e4567-e89b-12d3-a456-426614174000';
      const userId1 = UserId.create(uuid);
      const userId2 = UserId.create(uuid);

      // Act
      const result = userId1.equals(userId2);

      // Assert
      expect(result).toBe(true);
    });

    it('should return false when user ids are different', () => {
      // Arrange
      const userId1 = UserId.create('123e4567-e89b-12d3-a456-426614174000');
      const userId2 = UserId.create('223e4567-e89b-12d3-a456-426614174000');

      // Act
      const result = userId1.equals(userId2);

      // Assert
      expect(result).toBe(false);
    });
  });
});