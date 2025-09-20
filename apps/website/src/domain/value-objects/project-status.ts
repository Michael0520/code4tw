export type ProjectStatusType = 'active' | 'completed' | 'planning' | 'archived';

export class ProjectStatus {
  private constructor(private readonly value: ProjectStatusType) {}

  public static create(value: ProjectStatusType): ProjectStatus {
    return new ProjectStatus(value);
  }

  public static active(): ProjectStatus {
    return new ProjectStatus('active');
  }

  public static completed(): ProjectStatus {
    return new ProjectStatus('completed');
  }

  public static planning(): ProjectStatus {
    return new ProjectStatus('planning');
  }

  public static archived(): ProjectStatus {
    return new ProjectStatus('archived');
  }

  public getValue(): ProjectStatusType {
    return this.value;
  }

  public isActive(): boolean {
    return this.value === 'active';
  }

  public isCompleted(): boolean {
    return this.value === 'completed';
  }

  public isPlanning(): boolean {
    return this.value === 'planning';
  }

  public isArchived(): boolean {
    return this.value === 'archived';
  }

  public canTransitionTo(newStatus: ProjectStatus): boolean {
    const transitions: Record<ProjectStatusType, ProjectStatusType[]> = {
      planning: ['active', 'archived'],
      active: ['completed', 'archived'],
      completed: ['active', 'archived'],
      archived: ['planning', 'active']
    };

    return transitions[this.value].includes(newStatus.value);
  }

  public equals(other: ProjectStatus): boolean {
    return this.value === other.value;
  }

  public toString(): string {
    return this.value;
  }
}