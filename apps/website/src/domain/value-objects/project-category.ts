export type ProjectCategoryType = 'government' | 'education' | 'environment' | 'healthcare' | 'transportation' | 'civic-tech';

export class ProjectCategory {
  private constructor(private readonly value: ProjectCategoryType) {}

  public static create(value: ProjectCategoryType): ProjectCategory {
    return new ProjectCategory(value);
  }

  public static government(): ProjectCategory {
    return new ProjectCategory('government');
  }

  public static education(): ProjectCategory {
    return new ProjectCategory('education');
  }

  public static environment(): ProjectCategory {
    return new ProjectCategory('environment');
  }

  public static healthcare(): ProjectCategory {
    return new ProjectCategory('healthcare');
  }

  public static transportation(): ProjectCategory {
    return new ProjectCategory('transportation');
  }

  public static civicTech(): ProjectCategory {
    return new ProjectCategory('civic-tech');
  }

  public getValue(): ProjectCategoryType {
    return this.value;
  }

  public isGovernment(): boolean {
    return this.value === 'government';
  }

  public isEducation(): boolean {
    return this.value === 'education';
  }

  public isEnvironment(): boolean {
    return this.value === 'environment';
  }

  public isHealthcare(): boolean {
    return this.value === 'healthcare';
  }

  public isTransportation(): boolean {
    return this.value === 'transportation';
  }

  public isCivicTech(): boolean {
    return this.value === 'civic-tech';
  }

  public getDisplayName(): string {
    const displayNames: Record<ProjectCategoryType, string> = {
      government: 'Government',
      education: 'Education',
      environment: 'Environment',
      healthcare: 'Healthcare',
      transportation: 'Transportation',
      'civic-tech': 'Civic Technology'
    };

    return displayNames[this.value];
  }

  public equals(other: ProjectCategory): boolean {
    return this.value === other.value;
  }

  public toString(): string {
    return this.value;
  }
}