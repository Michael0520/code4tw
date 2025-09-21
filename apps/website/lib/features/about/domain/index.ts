/**
 * About Domain Layer
 * Business logic and entities for organization information
 */

// ============= Value Objects =============

export class OrganizationId {
  private constructor(private readonly value: string) {}

  static create(value: string): OrganizationId {
    if (!value || value.trim().length === 0) {
      throw new Error('Organization ID cannot be empty');
    }
    if (value.length > 50) {
      throw new Error('Organization ID must be 50 characters or less');
    }
    return new OrganizationId(value.trim());
  }

  getValue(): string {
    return this.value;
  }

  equals(other: OrganizationId): boolean {
    return this.value === other.value;
  }
}

export class MissionStatement {
  private constructor(
    private readonly title: string,
    private readonly description: string
  ) {}

  static create(title: string, description: string): MissionStatement {
    if (!title || title.trim().length === 0) {
      throw new Error('Mission title cannot be empty');
    }
    if (!description || description.trim().length === 0) {
      throw new Error('Mission description cannot be empty');
    }
    if (title.length > 200) {
      throw new Error('Mission title must be 200 characters or less');
    }
    if (description.length > 2000) {
      throw new Error('Mission description must be 2000 characters or less');
    }
    return new MissionStatement(title.trim(), description.trim());
  }

  getTitle(): string {
    return this.title;
  }

  getDescription(): string {
    return this.description;
  }

  equals(other: MissionStatement): boolean {
    return this.title === other.title && this.description === other.description;
  }
}

export class CoreValue {
  private constructor(
    private readonly id: string,
    private readonly title: string,
    private readonly description: string,
    private readonly icon: string,
    private readonly color: string
  ) {}

  static create(
    id: string,
    title: string,
    description: string,
    icon: string,
    color: string
  ): CoreValue {
    if (!id || id.trim().length === 0) {
      throw new Error('Core value ID cannot be empty');
    }
    if (!title || title.trim().length === 0) {
      throw new Error('Core value title cannot be empty');
    }
    if (!description || description.trim().length === 0) {
      throw new Error('Core value description cannot be empty');
    }
    if (title.length > 100) {
      throw new Error('Core value title must be 100 characters or less');
    }
    if (description.length > 500) {
      throw new Error('Core value description must be 500 characters or less');
    }

    return new CoreValue(
      id.trim(),
      title.trim(),
      description.trim(),
      icon.trim(),
      color.trim()
    );
  }

  getId(): string {
    return this.id;
  }

  getTitle(): string {
    return this.title;
  }

  getDescription(): string {
    return this.description;
  }

  getIcon(): string {
    return this.icon;
  }

  getColor(): string {
    return this.color;
  }

  equals(other: CoreValue): boolean {
    return this.id === other.id;
  }
}

export class OrganizationPrinciple {
  private constructor(
    private readonly id: string,
    private readonly title: string,
    private readonly description: string,
    private readonly icon: string,
    private readonly color: string,
    private readonly priority: number
  ) {}

  static create(
    id: string,
    title: string,
    description: string,
    icon: string,
    color: string,
    priority: number = 0
  ): OrganizationPrinciple {
    if (!id || id.trim().length === 0) {
      throw new Error('Principle ID cannot be empty');
    }
    if (!title || title.trim().length === 0) {
      throw new Error('Principle title cannot be empty');
    }
    if (!description || description.trim().length === 0) {
      throw new Error('Principle description cannot be empty');
    }
    if (title.length > 100) {
      throw new Error('Principle title must be 100 characters or less');
    }
    if (description.length > 500) {
      throw new Error('Principle description must be 500 characters or less');
    }
    if (priority < 0 || priority > 100) {
      throw new Error('Priority must be between 0 and 100');
    }

    return new OrganizationPrinciple(
      id.trim(),
      title.trim(),
      description.trim(),
      icon.trim(),
      color.trim(),
      priority
    );
  }

  getId(): string {
    return this.id;
  }

  getTitle(): string {
    return this.title;
  }

  getDescription(): string {
    return this.description;
  }

  getIcon(): string {
    return this.icon;
  }

  getColor(): string {
    return this.color;
  }

  getPriority(): number {
    return this.priority;
  }

  equals(other: OrganizationPrinciple): boolean {
    return this.id === other.id;
  }
}

export class TeamMember {
  private constructor(
    private readonly id: string,
    private readonly name: string,
    private readonly role: string,
    private readonly bio: string,
    private readonly imageUrl?: string,
    private readonly socialLinks: Record<string, string> = {},
    private readonly isActive: boolean = true
  ) {}

  static create(
    id: string,
    name: string,
    role: string,
    bio: string,
    imageUrl?: string,
    socialLinks: Record<string, string> = {},
    isActive: boolean = true
  ): TeamMember {
    if (!id || id.trim().length === 0) {
      throw new Error('Team member ID cannot be empty');
    }
    if (!name || name.trim().length === 0) {
      throw new Error('Team member name cannot be empty');
    }
    if (!role || role.trim().length === 0) {
      throw new Error('Team member role cannot be empty');
    }
    if (!bio || bio.trim().length === 0) {
      throw new Error('Team member bio cannot be empty');
    }
    if (name.length > 100) {
      throw new Error('Team member name must be 100 characters or less');
    }
    if (role.length > 100) {
      throw new Error('Team member role must be 100 characters or less');
    }
    if (bio.length > 1000) {
      throw new Error('Team member bio must be 1000 characters or less');
    }

    return new TeamMember(
      id.trim(),
      name.trim(),
      role.trim(),
      bio.trim(),
      imageUrl?.trim(),
      socialLinks,
      isActive
    );
  }

  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getRole(): string {
    return this.role;
  }

  getBio(): string {
    return this.bio;
  }

  getImageUrl(): string | undefined {
    return this.imageUrl;
  }

  getSocialLinks(): Record<string, string> {
    return { ...this.socialLinks };
  }

  isActiveMember(): boolean {
    return this.isActive;
  }

  equals(other: TeamMember): boolean {
    return this.id === other.id;
  }
}

// ============= Entities =============

export interface OrganizationData {
  id: string;
  name: string;
  tagline: string;
  foundedYear: number;
  description: string;
  mission: {
    title: string;
    description: string;
  };
  vision: {
    title: string;
    description: string;
  };
  contactInfo: {
    email?: string;
    website?: string;
    github?: string;
    slack?: string;
    facebook?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export class Organization {
  private constructor(
    private readonly id: OrganizationId,
    private readonly name: string,
    private readonly tagline: string,
    private readonly foundedYear: number,
    private readonly description: string,
    private readonly mission: MissionStatement,
    private readonly vision: MissionStatement,
    private readonly contactInfo: Record<string, string>,
    private readonly createdAt: Date,
    private readonly updatedAt: Date
  ) {}

  static create(data: OrganizationData): Organization {
    const id = OrganizationId.create(data.id);
    const mission = MissionStatement.create(data.mission.title, data.mission.description);
    const vision = MissionStatement.create(data.vision.title, data.vision.description);

    if (!data.name || data.name.trim().length === 0) {
      throw new Error('Organization name cannot be empty');
    }
    if (!data.tagline || data.tagline.trim().length === 0) {
      throw new Error('Organization tagline cannot be empty');
    }
    if (!data.description || data.description.trim().length === 0) {
      throw new Error('Organization description cannot be empty');
    }
    if (data.foundedYear < 1900 || data.foundedYear > new Date().getFullYear()) {
      throw new Error('Founded year must be valid');
    }

    return new Organization(
      id,
      data.name.trim(),
      data.tagline.trim(),
      data.foundedYear,
      data.description.trim(),
      mission,
      vision,
      data.contactInfo || {},
      data.createdAt,
      data.updatedAt
    );
  }

  getId(): OrganizationId {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getTagline(): string {
    return this.tagline;
  }

  getFoundedYear(): number {
    return this.foundedYear;
  }

  getDescription(): string {
    return this.description;
  }

  getMission(): MissionStatement {
    return this.mission;
  }

  getVision(): MissionStatement {
    return this.vision;
  }

  getContactInfo(): Record<string, string> {
    return { ...this.contactInfo };
  }

  getAge(): number {
    return new Date().getFullYear() - this.foundedYear;
  }

  getCreatedAt(): Date {
    return new Date(this.createdAt);
  }

  getUpdatedAt(): Date {
    return new Date(this.updatedAt);
  }

  toData(): OrganizationData {
    return {
      id: this.id.getValue(),
      name: this.name,
      tagline: this.tagline,
      foundedYear: this.foundedYear,
      description: this.description,
      mission: {
        title: this.mission.getTitle(),
        description: this.mission.getDescription(),
      },
      vision: {
        title: this.vision.getTitle(),
        description: this.vision.getDescription(),
      },
      contactInfo: this.getContactInfo(),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  equals(other: Organization): boolean {
    return this.id.equals(other.id);
  }
}

// ============= Domain Services =============

export class AboutService {
  /**
   * Get core values sorted by priority
   */
  static getCoreValues(values: CoreValue[]): CoreValue[] {
    return [...values].sort((a, b) => a.getTitle().localeCompare(b.getTitle()));
  }

  /**
   * Get principles sorted by priority
   */
  static getPrinciples(principles: OrganizationPrinciple[]): OrganizationPrinciple[] {
    return [...principles].sort((a, b) => {
      const priorityDiff = b.getPriority() - a.getPriority();
      if (priorityDiff === 0) {
        return a.getTitle().localeCompare(b.getTitle());
      }
      return priorityDiff;
    });
  }

  /**
   * Get active team members
   */
  static getActiveTeamMembers(members: TeamMember[]): TeamMember[] {
    return members
      .filter(member => member.isActiveMember())
      .sort((a, b) => a.getName().localeCompare(b.getName()));
  }

  /**
   * Get organization statistics
   */
  static getOrganizationStats(
    organization: Organization,
    principles: OrganizationPrinciple[],
    values: CoreValue[],
    teamMembers: TeamMember[]
  ) {
    const activeMembers = this.getActiveTeamMembers(teamMembers);

    return {
      foundedYear: organization.getFoundedYear(),
      age: organization.getAge(),
      principlesCount: principles.length,
      valuesCount: values.length,
      activeMembers: activeMembers.length,
      totalMembers: teamMembers.length,
    };
  }

  /**
   * Search team members by name or role
   */
  static searchTeamMembers(members: TeamMember[], query: string): TeamMember[] {
    if (!query || query.trim().length === 0) {
      return this.getActiveTeamMembers(members);
    }

    const searchTerm = query.toLowerCase().trim();
    return members.filter(member =>
      member.isActiveMember() && (
        member.getName().toLowerCase().includes(searchTerm) ||
        member.getRole().toLowerCase().includes(searchTerm) ||
        member.getBio().toLowerCase().includes(searchTerm)
      )
    );
  }

  /**
   * Validate organization data completeness
   */
  static validateOrganizationCompleteness(organization: Organization): {
    isComplete: boolean;
    missingFields: string[];
  } {
    const missingFields: string[] = [];

    if (!organization.getName()) missingFields.push('name');
    if (!organization.getTagline()) missingFields.push('tagline');
    if (!organization.getDescription()) missingFields.push('description');
    if (!organization.getMission().getTitle()) missingFields.push('mission.title');
    if (!organization.getMission().getDescription()) missingFields.push('mission.description');
    if (!organization.getVision().getTitle()) missingFields.push('vision.title');
    if (!organization.getVision().getDescription()) missingFields.push('vision.description');

    return {
      isComplete: missingFields.length === 0,
      missingFields,
    };
  }
}