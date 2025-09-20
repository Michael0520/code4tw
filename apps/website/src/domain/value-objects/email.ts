export class Email {
  private static readonly EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  private constructor(private readonly value: string) {
    this.validate(value);
  }

  public static create(value: string): Email {
    return new Email(value);
  }

  public static isValid(value: string): boolean {
    if (typeof value !== 'string') {
      return false;
    }

    if (value.length === 0 || value.length > 254) {
      return false;
    }

    // Check for whitespace only
    if (value.trim().length === 0) {
      return false;
    }

    // Check for consecutive dots
    if (value.includes('..')) {
      return false;
    }

    return this.EMAIL_REGEX.test(value);
  }

  private validate(value: string): void {
    if (!Email.isValid(value)) {
      throw new Error(`Invalid email format: ${value}`);
    }
  }

  public getValue(): string {
    return this.value;
  }

  public getDomain(): string {
    return this.value.split('@')[1];
  }

  public getLocalPart(): string {
    return this.value.split('@')[0];
  }

  public equals(other: Email): boolean {
    return this.value === other.value;
  }

  public toString(): string {
    return this.value;
  }
}