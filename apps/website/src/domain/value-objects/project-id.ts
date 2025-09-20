import { v4 as uuidv4 } from 'uuid';

export class ProjectId {
  private constructor(private readonly value: string) {
    this.validate(value);
  }

  public static create(value: string): ProjectId {
    return new ProjectId(value);
  }

  public static generate(): ProjectId {
    return new ProjectId(uuidv4());
  }

  public getValue(): string {
    return this.value;
  }

  public equals(other: ProjectId): boolean {
    return this.value === other.value;
  }

  public toString(): string {
    return this.value;
  }

  private validate(value: string): void {
    if (!value || value.trim().length === 0) {
      throw new Error('ProjectId cannot be empty');
    }

    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(value)) {
      throw new Error('ProjectId must be a valid UUID');
    }
  }
}