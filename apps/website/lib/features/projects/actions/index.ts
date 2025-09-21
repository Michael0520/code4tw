/**
 * Projects Server Actions
 * Use cases and data fetching logic
 */

'use server';

import { Project, ProjectService, ProjectData, ProjectCategory, ProjectStatus } from '@/lib/features/projects/domain';
import { PROJECTS_CONFIG, STATIC_PROJECTS_DATA } from '@/lib/features/projects/config';

// ============= Types =============

export interface ProjectFilters {
  category?: string;
  status?: string;
  tags?: string[];
  searchQuery?: string;
  sortBy?: 'title' | 'stars' | 'forks' | 'date';
  sortOrder?: 'asc' | 'desc';
}

export interface ProjectDto {
  id: string;
  title: string;
  description: string;
  category: string;
  categoryDisplay: string;
  status: string;
  statusDisplay: string;
  tags: string[];
  githubUrl?: string;
  websiteUrl?: string;
  stars: number;
  forks: number;
}

export interface ProjectsResponse {
  projects: ProjectDto[];
  total: number;
  stats: {
    total: number;
    active: number;
    totalStars: number;
    totalForks: number;
    categoryDistribution: Record<string, number>;
  };
}

// ============= Helpers =============

/**
 * Transform raw config data to ProjectData format
 */
function transformToProjectData(rawData: typeof STATIC_PROJECTS_DATA[0]): ProjectData {
  return {
    id: rawData.id.toString(),
    title: rawData.title,
    description: rawData.description_zh, // Use Chinese description as primary
    category: rawData.category as typeof ProjectCategory.VALID_CATEGORIES[number],
    status: rawData.status as typeof ProjectStatus.VALID_STATUSES[number],
    tags: rawData.tags,
    githubUrl: rawData.github,
    websiteUrl: rawData.website,
    stars: rawData.stars,
    forks: rawData.forks,
    createdAt: new Date('2024-01-01'), // Default date for static data
    updatedAt: new Date('2024-01-15')  // Default date for static data
  };
}

// ============= Server Actions =============

/**
 * Get all projects with optional filters
 */
export async function getProjects(filters?: ProjectFilters): Promise<ProjectsResponse> {
  try {
    // TODO: Replace with actual database/API call
    const projectsData = STATIC_PROJECTS_DATA;

    // Transform and create domain entities
    const projects = projectsData.map(data => new Project(transformToProjectData(data)));

    // Apply filters using domain service
    let filteredProjects = projects;

    // Filter by category, status, and tags
    if (filters) {
      filteredProjects = ProjectService.filterProjects(filteredProjects, {
        category: filters.category,
        status: filters.status,
        tags: filters.tags
      });

      // Search
      if (filters.searchQuery) {
        filteredProjects = ProjectService.searchProjects(
          filteredProjects,
          filters.searchQuery
        );
      }

      // Sort
      const sortBy = filters.sortBy || 'stars';
      const sortOrder = filters.sortOrder || 'desc';
      filteredProjects = ProjectService.sortProjects(
        filteredProjects,
        sortBy,
        sortOrder
      );
    }

    // Get statistics
    const stats = ProjectService.getProjectStats(projects);

    // Convert to DTOs
    const projectDtos = filteredProjects.map(projectToDto);

    return {
      projects: projectDtos,
      total: filteredProjects.length,
      stats
    };
  } catch (error) {
    console.error('Failed to get projects:', error);
    throw new Error('Failed to load projects');
  }
}

/**
 * Get featured projects (most popular)
 */
export async function getFeaturedProjects(limit?: number): Promise<ProjectDto[]> {
  try {
    const projectsData = STATIC_PROJECTS_DATA;
    const projects = projectsData.map(data => new Project(transformToProjectData(data)));

    const featured = ProjectService.getFeaturedProjects(
      projects,
      limit || PROJECTS_CONFIG.display.featuredCount
    );

    return featured.map(projectToDto);
  } catch (error) {
    console.error('Failed to get featured projects:', error);
    throw new Error('Failed to load featured projects');
  }
}

/**
 * Get a single project by ID
 */
export async function getProjectById(id: string): Promise<ProjectDto | null> {
  try {
    const projectData = STATIC_PROJECTS_DATA.find(p => p.id.toString() === id);

    if (!projectData) {
      return null;
    }

    const project = new Project(transformToProjectData(projectData));
    return projectToDto(project);
  } catch (error) {
    console.error('Failed to get project:', error);
    throw new Error('Failed to load project');
  }
}

/**
 * Search projects by query
 */
export async function searchProjects(query: string): Promise<ProjectDto[]> {
  try {
    if (query.length < PROJECTS_CONFIG.search.minQueryLength) {
      return [];
    }

    const projectsData = STATIC_PROJECTS_DATA;
    const projects = projectsData.map(data => new Project(transformToProjectData(data)));

    const searchResults = ProjectService.searchProjects(projects, query);

    return searchResults.map(projectToDto);
  } catch (error) {
    console.error('Failed to search projects:', error);
    throw new Error('Failed to search projects');
  }
}

/**
 * Get projects by category
 */
export async function getProjectsByCategory(category: string): Promise<ProjectDto[]> {
  try {
    const projectsData = STATIC_PROJECTS_DATA;
    const projects = projectsData.map(data => new Project(transformToProjectData(data)));

    const filtered = ProjectService.filterProjects(projects, { category });

    return filtered.map(projectToDto);
  } catch (error) {
    console.error('Failed to get projects by category:', error);
    throw new Error('Failed to load projects');
  }
}

/**
 * Get project statistics
 */
export async function getProjectStats() {
  try {
    const projectsData = STATIC_PROJECTS_DATA;
    const projects = projectsData.map(data => new Project(transformToProjectData(data)));

    return ProjectService.getProjectStats(projects);
  } catch (error) {
    console.error('Failed to get project stats:', error);
    throw new Error('Failed to load statistics');
  }
}

/**
 * Update GitHub metrics for a project
 * (This would be called by a background job or webhook)
 */
export async function updateProjectGitHubMetrics(
  projectId: string,
  stars: number,
  forks: number
): Promise<void> {
  try {
    // TODO: Update in database
    console.log(`Updating GitHub metrics for project ${projectId}:`, {
      stars,
      forks
    });

    // For now, just validate the data
    const projectData = STATIC_PROJECTS_DATA.find(p => p.id.toString() === projectId.toString());
    if (projectData) {
      projectData.stars = stars;
      projectData.forks = forks;
      // Note: STATIC_PROJECTS_DATA doesn't have updatedAt property (it's in the transformed data)
    }
  } catch (error) {
    console.error('Failed to update GitHub metrics:', error);
    throw new Error('Failed to update project metrics');
  }
}

// ============= Helper Functions =============

/**
 * Convert Project entity to DTO
 */
function projectToDto(project: Project): ProjectDto {
  const data = project.toData();

  return {
    id: data.id,
    title: data.title,
    description: data.description,
    category: project.getCategory().getValue(),
    categoryDisplay: project.getCategory().getDisplayName(),
    status: project.getStatus().getValue(),
    statusDisplay: project.getStatus().getDisplayName(),
    tags: data.tags,
    githubUrl: data.githubUrl,
    websiteUrl: data.websiteUrl,
    stars: project.getMetrics().getStars(),
    forks: project.getMetrics().getForks()
  };
}

// Validation functions moved to utils.ts to avoid server action conflicts