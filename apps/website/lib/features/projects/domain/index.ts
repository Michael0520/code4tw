/**
 * Projects Domain Layer
 * Pure business logic for project management
 */

// ============= Value Objects =============

export class ProjectId {
  constructor(private readonly value: string) {
    if (!value || value.trim().length === 0) {
      throw new Error('ProjectId cannot be empty');
    }
  }

  getValue(): string {
    return this.value;
  }

  equals(other: ProjectId): boolean {
    return this.value === other.value;
  }
}

export class ProjectCategory {
  static readonly VALID_CATEGORIES = [
    'government',
    'education',
    'environment',
    'healthcare',
    'transportation',
    'civic-tech'
  ] as const;

  constructor(private readonly value: typeof ProjectCategory.VALID_CATEGORIES[number]) {
    if (!ProjectCategory.VALID_CATEGORIES.includes(value)) {
      throw new Error(`Invalid project category: ${value}`);
    }
  }

  getValue(): string {
    return this.value;
  }

  getDisplayName(): string {
    const displayNames: Record<string, string> = {
      'government': 'Government',
      'education': 'Education',
      'environment': 'Environment',
      'healthcare': 'Healthcare',
      'transportation': 'Transportation',
      'civic-tech': 'Civic Technology'
    };
    return displayNames[this.value]!;
  }

  equals(other: ProjectCategory): boolean {
    return this.value === other.value;
  }
}

export class ProjectStatus {
  static readonly VALID_STATUSES = [
    'active',
    'completed',
    'planning',
    'archived'
  ] as const;

  constructor(private readonly value: typeof ProjectStatus.VALID_STATUSES[number]) {
    if (!ProjectStatus.VALID_STATUSES.includes(value)) {
      throw new Error(`Invalid project status: ${value}`);
    }
  }

  getValue(): string {
    return this.value;
  }

  isActive(): boolean {
    return this.value === 'active';
  }

  isCompleted(): boolean {
    return this.value === 'completed';
  }

  getDisplayName(): string {
    const displayNames: Record<string, string> = {
      'active': 'Active',
      'completed': 'Completed',
      'planning': 'Planning',
      'archived': 'Archived'
    };
    return displayNames[this.value]!;
  }

  equals(other: ProjectStatus): boolean {
    return this.value === other.value;
  }
}

export class GitHubMetrics {
  constructor(
    private readonly stars: number,
    private readonly forks: number
  ) {
    if (stars < 0) {
      throw new Error('Stars count cannot be negative');
    }
    if (forks < 0) {
      throw new Error('Forks count cannot be negative');
    }
  }

  getStars(): number {
    return this.stars;
  }

  getForks(): number {
    return this.forks;
  }

  getPopularityScore(): number {
    // Simple popularity calculation
    return this.stars * 2 + this.forks;
  }
}

// ============= Entity =============

export interface ProjectData {
  id: string;
  title: string;
  description: string;
  category: typeof ProjectCategory.VALID_CATEGORIES[number];
  status: typeof ProjectStatus.VALID_STATUSES[number];
  tags: string[];
  githubUrl?: string;
  websiteUrl?: string;
  stars: number;
  forks: number;
  createdAt: Date;
  updatedAt: Date;
}

export class Project {
  private readonly id: ProjectId;
  private readonly category: ProjectCategory;
  private readonly status: ProjectStatus;
  private readonly metrics: GitHubMetrics;

  constructor(
    private readonly data: ProjectData
  ) {
    this.id = new ProjectId(data.id);
    this.category = new ProjectCategory(data.category);
    this.status = new ProjectStatus(data.status);
    this.metrics = new GitHubMetrics(data.stars, data.forks);

    this.validateTitle(data.title);
    this.validateDescription(data.description);
  }

  private validateTitle(title: string): void {
    if (!title || title.trim().length === 0) {
      throw new Error('Project title cannot be empty');
    }
    if (title.length > 100) {
      throw new Error('Project title cannot exceed 100 characters');
    }
  }

  private validateDescription(description: string): void {
    if (!description || description.trim().length === 0) {
      throw new Error('Project description cannot be empty');
    }
    if (description.length > 500) {
      throw new Error('Project description cannot exceed 500 characters');
    }
  }

  getId(): ProjectId {
    return this.id;
  }

  getTitle(): string {
    return this.data.title;
  }

  getDescription(): string {
    return this.data.description;
  }

  getCategory(): ProjectCategory {
    return this.category;
  }

  getStatus(): ProjectStatus {
    return this.status;
  }

  getTags(): string[] {
    return [...this.data.tags];
  }

  getMetrics(): GitHubMetrics {
    return this.metrics;
  }

  getGithubUrl(): string | undefined {
    return this.data.githubUrl;
  }

  getWebsiteUrl(): string | undefined {
    return this.data.websiteUrl;
  }

  isActive(): boolean {
    return this.status.isActive();
  }

  hasTag(tag: string): boolean {
    return this.data.tags.includes(tag.toLowerCase());
  }

  matchesSearch(query: string): boolean {
    const lowerQuery = query.toLowerCase();
    return (
      this.data.title.toLowerCase().includes(lowerQuery) ||
      this.data.description.toLowerCase().includes(lowerQuery) ||
      this.data.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
  }

  toData(): ProjectData {
    return { ...this.data };
  }
}

// ============= Domain Services =============

export const ProjectService = {
  /**
   * Filter projects based on criteria
   */
  filterProjects(
    projects: Project[],
    criteria: {
      category?: string;
      status?: string;
      tags?: string[];
    }
  ): Project[] {
    return projects.filter(project => {
      // Category filter
      if (criteria.category && criteria.category !== 'all') {
        if (project.getCategory().getValue() !== criteria.category) {
          return false;
        }
      }

      // Status filter
      if (criteria.status && criteria.status !== 'all') {
        if (project.getStatus().getValue() !== criteria.status) {
          return false;
        }
      }

      // Tags filter (project must have at least one of the tags)
      if (criteria.tags && criteria.tags.length > 0) {
        const hasMatchingTag = criteria.tags.some(tag =>
          project.hasTag(tag)
        );
        if (!hasMatchingTag) {
          return false;
        }
      }

      return true;
    });
  },

  /**
   * Search projects by query
   */
  searchProjects(projects: Project[], query: string): Project[] {
    if (!query || query.trim().length === 0) {
      return projects;
    }

    return projects.filter(project => project.matchesSearch(query));
  },

  /**
   * Sort projects by different criteria
   */
  sortProjects(
    projects: Project[],
    sortBy: 'title' | 'stars' | 'forks' | 'date' = 'stars',
    order: 'asc' | 'desc' = 'desc'
  ): Project[] {
    const sorted = [...projects].sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case 'title':
          comparison = a.getTitle().localeCompare(b.getTitle());
          break;
        case 'stars':
          comparison = a.getMetrics().getStars() - b.getMetrics().getStars();
          break;
        case 'forks':
          comparison = a.getMetrics().getForks() - b.getMetrics().getForks();
          break;
        case 'date':
          comparison = a.toData().createdAt.getTime() - b.toData().createdAt.getTime();
          break;
      }

      return order === 'desc' ? -comparison : comparison;
    });

    return sorted;
  },

  /**
   * Get featured projects (most popular)
   */
  getFeaturedProjects(projects: Project[], limit: number = 6): Project[] {
    return [...projects]
      .filter(p => p.isActive())
      .sort((a, b) =>
        b.getMetrics().getPopularityScore() - a.getMetrics().getPopularityScore()
      )
      .slice(0, limit);
  },

  /**
   * Get project statistics
   */
  getProjectStats(projects: Project[]) {
    const total = projects.length;
    const active = projects.filter(p => p.isActive()).length;
    const totalStars = projects.reduce((sum, p) => sum + p.getMetrics().getStars(), 0);
    const totalForks = projects.reduce((sum, p) => sum + p.getMetrics().getForks(), 0);

    const categoryDistribution = projects.reduce((acc, project) => {
      const category = project.getCategory().getValue();
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      total,
      active,
      totalStars,
      totalForks,
      categoryDistribution
    };
  }
};