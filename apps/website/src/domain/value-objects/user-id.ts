import { randomUUID } from 'crypto';

export class UserId {
  private constructor(private readonly value: string) {
    this.validate(value);
  }

  public static create(value: string): UserId {
    return new UserId(value);
  }

  public static generate(): UserId {
    return new UserId(randomUUID());
  }

  private validate(value: string): void {
    if (!value || typeof value !== 'string' || value.trim().length === 0) {
      throw new Error('UserId cannot be empty');
    }

    // Validate UUID format
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(value)) {
      throw new Error(`Invalid UserId format: ${value}`);
    }
  }

  public getValue(): string {
    return this.value;
  }

  public equals(other: UserId): boolean {
    return this.value === other.value;
  }

  public toString(): string {
    return this.value;
  }
}