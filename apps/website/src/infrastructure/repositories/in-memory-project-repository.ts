import { Project } from '../../domain/entities/project';
import { ProjectId } from '../../domain/value-objects/project-id';
import { ProjectCategory } from '../../domain/value-objects/project-category';
import { ProjectStatus } from '../../domain/value-objects/project-status';
import {
  ProjectRepository,
  ProjectFilters,
  ProjectSortOptions,
  PaginationOptions,
  ProjectQueryResult,
} from '../../application/repositories/project-repository';

export class InMemoryProjectRepository implements ProjectRepository {
  private projects: Map<string, Project> = new Map();

  public async findById(id: ProjectId): Promise<Project | null> {
    return this.projects.get(id.getValue()) || null;
  }

  public async findBySlug(slug: string): Promise<Project | null> {
    // For simplicity, we'll use title-based slug matching
    const projects = Array.from(this.projects.values());
    return projects.find(project =>
      this.createSlugFromTitle(project.getTitle()) === slug
    ) || null;
  }

  public async findAll(
    filters?: ProjectFilters,
    sort?: ProjectSortOptions,
    pagination?: PaginationOptions
  ): Promise<ProjectQueryResult> {
    let projects = Array.from(this.projects.values());

    // Apply filters
    if (filters) {
      projects = this.applyFilters(projects, filters);
    }

    // Apply sorting
    if (sort) {
      projects = this.applySorting(projects, sort);
    }

    const total = projects.length;

    // Apply pagination
    if (pagination) {
      const startIndex = (pagination.page - 1) * pagination.limit;
      projects = projects.slice(startIndex, startIndex + pagination.limit);
    }

    return {
      projects,
      total,
      page: pagination?.page || 1,
      totalPages: pagination ? Math.ceil(total / pagination.limit) : 1,
    };
  }

  public async findFeatured(limit: number = 6): Promise<readonly Project[]> {
    const projects = Array.from(this.projects.values())
      .filter(project => project.isActive())
      .sort((a, b) => b.getStarCount() - a.getStarCount())
      .slice(0, limit);

    return projects;
  }

  public async findByCategory(category: ProjectCategory): Promise<readonly Project[]> {
    return Array.from(this.projects.values())
      .filter(project => project.getCategory().equals(category));
  }

  public async findActive(): Promise<readonly Project[]> {
    return Array.from(this.projects.values())
      .filter(project => project.isActive());
  }

  public async save(project: Project): Promise<void> {
    this.projects.set(project.getId().getValue(), project);
  }

  public async delete(id: ProjectId): Promise<void> {
    this.projects.delete(id.getValue());
  }

  public async exists(id: ProjectId): Promise<boolean> {
    return this.projects.has(id.getValue());
  }

  public async countByStatus(status: ProjectStatus): Promise<number> {
    return Array.from(this.projects.values())
      .filter(project => project.getStatus().equals(status))
      .length;
  }

  public async getPopularTags(limit: number = 10): Promise<readonly string[]> {
    const tagCounts = new Map<string, number>();

    Array.from(this.projects.values()).forEach(project => {
      project.getTags().forEach(tag => {
        tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
      });
    });

    return Array.from(tagCounts.entries())
      .sort(([, a], [, b]) => b - a)
      .slice(0, limit)
      .map(([tag]) => tag);
  }

  private applyFilters(projects: Project[], filters: ProjectFilters): Project[] {
    return projects.filter(project => {
      if (filters.category && !project.getCategory().equals(filters.category)) {
        return false;
      }

      if (filters.status && !project.getStatus().equals(filters.status)) {
        return false;
      }

      if (filters.tags && filters.tags.length > 0) {
        const projectTags = project.getTags();
        const hasMatchingTag = filters.tags.some(tag => projectTags.includes(tag));
        if (!hasMatchingTag) {
          return false;
        }
      }

      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        const titleMatch = project.getTitle().toLowerCase().includes(query);
        const descriptionMatch = project.getDescription().toLowerCase().includes(query);

        if (!titleMatch && !descriptionMatch) {
          return false;
        }
      }

      return true;
    });
  }

  private applySorting(projects: Project[], sort: ProjectSortOptions): Project[] {
    return [...projects].sort((a, b) => {
      let comparison = 0;

      switch (sort.field) {
        case 'title':
          comparison = a.getTitle().localeCompare(b.getTitle());
          break;
        case 'createdAt':
          comparison = a.getCreatedAt().getTime() - b.getCreatedAt().getTime();
          break;
        case 'updatedAt':
          comparison = a.getUpdatedAt().getTime() - b.getUpdatedAt().getTime();
          break;
        case 'starCount':
          comparison = a.getStarCount() - b.getStarCount();
          break;
        default:
          return 0;
      }

      return sort.direction === 'desc' ? -comparison : comparison;
    });
  }

  private createSlugFromTitle(title: string): string {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  // Utility method for testing
  public clear(): void {
    this.projects.clear();
  }

  public getAll(): readonly Project[] {
    return Array.from(this.projects.values());
  }
}