import { v4 as uuidv4 } from 'uuid';

export class EventId {
  private constructor(private readonly value: string) {
    this.validate(value);
  }

  public static create(value: string): EventId {
    return new EventId(value);
  }

  public static generate(): EventId {
    return new EventId(uuidv4());
  }

  public getValue(): string {
    return this.value;
  }

  public equals(other: EventId): boolean {
    return this.value === other.value;
  }

  public toString(): string {
    return this.value;
  }

  private validate(value: string): void {
    if (!value || value.trim().length === 0) {
      throw new Error('EventId cannot be empty');
    }

    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(value)) {
      throw new Error('EventId must be a valid UUID');
    }
  }
}