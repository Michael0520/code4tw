import { describe, it, expect } from 'vitest';
import { Email } from '../email';

describe('Email', () => {
  describe('create', () => {
    it('should create email when valid email is provided', () => {
      // Arrange
      const validEmail = 'test@example.com';

      // Act
      const email = Email.create(validEmail);

      // Assert
      expect(email.getValue()).toBe(validEmail);
      expect(email.toString()).toBe(validEmail);
    });

    it('should throw error when invalid email format is provided', () => {
      // Arrange
      const invalidEmails = [
        'invalid-email',
        '@example.com',
        'test@',
        'test@.com',
        'test..test@example.com',
        '',
        ' ',
      ];

      // Act & Assert
      invalidEmails.forEach(invalidEmail => {
        expect(() => Email.create(invalidEmail)).toThrow(`Invalid email format: ${invalidEmail}`);
      });
    });

    it('should throw error when email is too long', () => {
      // Arrange
      const longEmail = 'a'.repeat(250) + '@example.com'; // > 254 characters

      // Act & Assert
      expect(() => Email.create(longEmail)).toThrow(`Invalid email format: ${longEmail}`);
    });
  });

  describe('isValid', () => {
    it('should return true when email format is valid', () => {
      // Arrange
      const validEmails = [
        'test@example.com',
        'user.name@domain.co.uk',
        'user+tag@example.org',
        'user123@test123.com',
      ];

      // Act & Assert
      validEmails.forEach(validEmail => {
        expect(Email.isValid(validEmail)).toBe(true);
      });
    });

    it('should return false when email format is invalid', () => {
      // Arrange
      const invalidEmails = [
        'invalid-email',
        '@example.com',
        'test@',
        'test@.com',
        '',
        ' ',
        'test..test@example.com',
      ];

      // Act & Assert
      invalidEmails.forEach(invalidEmail => {
        expect(Email.isValid(invalidEmail)).toBe(false);
      });
    });
  });

  describe('getDomain', () => {
    it('should return domain part of email', () => {
      // Arrange
      const email = Email.create('test@example.com');

      // Act
      const domain = email.getDomain();

      // Assert
      expect(domain).toBe('example.com');
    });
  });

  describe('getLocalPart', () => {
    it('should return local part of email', () => {
      // Arrange
      const email = Email.create('test@example.com');

      // Act
      const localPart = email.getLocalPart();

      // Assert
      expect(localPart).toBe('test');
    });
  });

  describe('equals', () => {
    it('should return true when emails are the same', () => {
      // Arrange
      const email1 = Email.create('test@example.com');
      const email2 = Email.create('test@example.com');

      // Act
      const result = email1.equals(email2);

      // Assert
      expect(result).toBe(true);
    });

    it('should return false when emails are different', () => {
      // Arrange
      const email1 = Email.create('test1@example.com');
      const email2 = Email.create('test2@example.com');

      // Act
      const result = email1.equals(email2);

      // Assert
      expect(result).toBe(false);
    });
  });
});