import { ProjectId } from '../value-objects/project-id';
import { ProjectStatus } from '../value-objects/project-status';
import { ProjectCategory } from '../value-objects/project-category';
import { Url } from '../value-objects/url';

export interface ProjectProps {
  readonly id: ProjectId;
  readonly title: string;
  readonly description: string;
  readonly category: ProjectCategory;
  readonly status: ProjectStatus;
  readonly githubUrl?: Url;
  readonly websiteUrl?: Url;
  readonly tags: readonly string[];
  readonly starCount: number;
  readonly forkCount: number;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export class Project {
  private constructor(private readonly props: ProjectProps) {
    this.validateTitle(props.title);
    this.validateDescription(props.description);
    this.validateStarCount(props.starCount);
    this.validateForkCount(props.forkCount);
  }

  public static create(params: {
    title: string;
    description: string;
    category: ProjectCategory;
    status: ProjectStatus;
    githubUrl?: Url;
    websiteUrl?: Url;
    tags?: readonly string[];
    starCount?: number;
    forkCount?: number;
  }): Project {
    const now = new Date();

    return new Project({
      id: ProjectId.generate(),
      title: params.title,
      description: params.description,
      category: params.category,
      status: params.status,
      githubUrl: params.githubUrl,
      websiteUrl: params.websiteUrl,
      tags: params.tags || [],
      starCount: params.starCount || 0,
      forkCount: params.forkCount || 0,
      createdAt: now,
      updatedAt: now,
    });
  }

  public static fromPersistence(props: ProjectProps): Project {
    return new Project(props);
  }

  public getId(): ProjectId {
    return this.props.id;
  }

  public getTitle(): string {
    return this.props.title;
  }

  public getDescription(): string {
    return this.props.description;
  }

  public getCategory(): ProjectCategory {
    return this.props.category;
  }

  public getStatus(): ProjectStatus {
    return this.props.status;
  }

  public getGithubUrl(): Url | undefined {
    return this.props.githubUrl;
  }

  public getWebsiteUrl(): Url | undefined {
    return this.props.websiteUrl;
  }

  public getTags(): readonly string[] {
    return this.props.tags;
  }

  public getStarCount(): number {
    return this.props.starCount;
  }

  public getForkCount(): number {
    return this.props.forkCount;
  }

  public getCreatedAt(): Date {
    return this.props.createdAt;
  }

  public getUpdatedAt(): Date {
    return this.props.updatedAt;
  }

  public updateStatus(newStatus: ProjectStatus): Project {
    return new Project({
      ...this.props,
      status: newStatus,
      updatedAt: new Date(),
    });
  }

  public updateGitHubStats(starCount: number, forkCount: number): Project {
    this.validateStarCount(starCount);
    this.validateForkCount(forkCount);

    return new Project({
      ...this.props,
      starCount,
      forkCount,
      updatedAt: new Date(),
    });
  }

  public addTag(tag: string): Project {
    if (this.props.tags.includes(tag)) {
      return this;
    }

    return new Project({
      ...this.props,
      tags: [...this.props.tags, tag],
      updatedAt: new Date(),
    });
  }

  public removeTag(tag: string): Project {
    return new Project({
      ...this.props,
      tags: this.props.tags.filter(t => t !== tag),
      updatedAt: new Date(),
    });
  }

  public isActive(): boolean {
    return this.props.status.isActive();
  }

  public isCompleted(): boolean {
    return this.props.status.isCompleted();
  }

  public toPersistence(): ProjectProps {
    return { ...this.props };
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
    if (description.length > 1000) {
      throw new Error('Project description cannot exceed 1000 characters');
    }
  }

  private validateStarCount(starCount: number): void {
    if (starCount < 0) {
      throw new Error('Star count cannot be negative');
    }
  }

  private validateForkCount(forkCount: number): void {
    if (forkCount < 0) {
      throw new Error('Fork count cannot be negative');
    }
  }
}