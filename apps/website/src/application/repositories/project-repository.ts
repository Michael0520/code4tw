import { Project } from '../../domain/entities/project';
import { ProjectId } from '../../domain/value-objects/project-id';
import { ProjectCategory } from '../../domain/value-objects/project-category';
import { ProjectStatus } from '../../domain/value-objects/project-status';

export interface ProjectFilters {
  readonly category?: ProjectCategory;
  readonly status?: ProjectStatus;
  readonly tags?: readonly string[];
  readonly searchQuery?: string;
}

export interface ProjectSortOptions {
  readonly field: 'title' | 'createdAt' | 'updatedAt' | 'starCount';
  readonly direction: 'asc' | 'desc';
}

export interface PaginationOptions {
  readonly page: number;
  readonly limit: number;
}

export interface ProjectQueryResult {
  readonly projects: readonly Project[];
  readonly total: number;
  readonly page: number;
  readonly totalPages: number;
}

export interface ProjectRepository {
  findById(id: ProjectId): Promise<Project | null>;
  findBySlug(slug: string): Promise<Project | null>;
  findAll(
    filters?: ProjectFilters,
    sort?: ProjectSortOptions,
    pagination?: PaginationOptions
  ): Promise<ProjectQueryResult>;
  findFeatured(limit?: number): Promise<readonly Project[]>;
  findByCategory(category: ProjectCategory): Promise<readonly Project[]>;
  findActive(): Promise<readonly Project[]>;
  save(project: Project): Promise<void>;
  delete(id: ProjectId): Promise<void>;
  exists(id: ProjectId): Promise<boolean>;
  countByStatus(status: ProjectStatus): Promise<number>;
  getPopularTags(limit?: number): Promise<readonly string[]>;
}