import { v4 as uuidv4 } from 'uuid';

export class NewsId {
  private constructor(private readonly value: string) {
    this.validate(value);
  }

  public static create(value: string): NewsId {
    return new NewsId(value);
  }

  public static generate(): NewsId {
    return new NewsId(uuidv4());
  }

  public getValue(): string {
    return this.value;
  }

  public equals(other: NewsId): boolean {
    return this.value === other.value;
  }

  public toString(): string {
    return this.value;
  }

  private validate(value: string): void {
    if (!value || value.trim().length === 0) {
      throw new Error('NewsId cannot be empty');
    }

    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(value)) {
      throw new Error('NewsId must be a valid UUID');
    }
  }
}