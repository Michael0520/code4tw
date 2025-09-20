export class Slug {
  private constructor(private readonly value: string) {
    this.validate(value);
  }

  public static create(value: string): Slug {
    return new Slug(value);
  }

  public static fromTitle(title: string): Slug {
    const slug = title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
      .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens

    return new Slug(slug);
  }

  public getValue(): string {
    return this.value;
  }

  public equals(other: Slug): boolean {
    return this.value === other.value;
  }

  public toString(): string {
    return this.value;
  }

  private validate(value: string): void {
    if (!value || value.trim().length === 0) {
      throw new Error('Slug cannot be empty');
    }

    if (value.length > 100) {
      throw new Error('Slug cannot exceed 100 characters');
    }

    const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
    if (!slugRegex.test(value)) {
      throw new Error('Slug must contain only lowercase letters, numbers, and hyphens');
    }
  }
}