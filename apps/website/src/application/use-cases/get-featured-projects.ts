import { Project } from '../../domain/entities/project';
import { ProjectRepository } from '../repositories/project-repository';

export interface GetFeaturedProjectsRequest {
  readonly limit?: number;
}

export interface GetFeaturedProjectsResponse {
  readonly projects: readonly ProjectDto[];
}

export interface ProjectDto {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly category: string;
  readonly status: string;
  readonly githubUrl?: string;
  readonly websiteUrl?: string;
  readonly tags: readonly string[];
  readonly starCount: number;
  readonly forkCount: number;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export class GetFeaturedProjects {
  constructor(private readonly projectRepository: ProjectRepository) {}

  public async execute(request: GetFeaturedProjectsRequest): Promise<GetFeaturedProjectsResponse> {
    const projects = await this.projectRepository.findFeatured(request.limit);

    return {
      projects: projects.map(project => this.mapToDto(project)),
    };
  }

  private mapToDto(project: Project): ProjectDto {
    return {
      id: project.getId().getValue(),
      title: project.getTitle(),
      description: project.getDescription(),
      category: project.getCategory().getValue(),
      status: project.getStatus().getValue(),
      githubUrl: project.getGithubUrl()?.getValue(),
      websiteUrl: project.getWebsiteUrl()?.getValue(),
      tags: project.getTags(),
      starCount: project.getStarCount(),
      forkCount: project.getForkCount(),
      createdAt: project.getCreatedAt().toISOString(),
      updatedAt: project.getUpdatedAt().toISOString(),
    };
  }
}