import { Project, ProjectProps } from '../entities/project';
import { ProjectId } from '../value-objects/project-id';
import { ProjectStatus } from '../value-objects/project-status';
import { ProjectCategory } from '../value-objects/project-category';
import { Url } from '../value-objects/url';
import { DomainEvent } from '../events/domain-event';
import {
  ProjectCreatedEvent,
  ProjectStatusChangedEvent,
  ProjectStatsUpdatedEvent,
  ProjectTagsChangedEvent
} from '../events/project-events';

export class ProjectAggregate {
  private domainEvents: DomainEvent[] = [];

  private constructor(private project: Project) {}

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
  }): ProjectAggregate {
    const project = Project.create(params);
    const aggregate = new ProjectAggregate(project);

    // Raise domain event
    aggregate.raiseDomainEvent(
      new ProjectCreatedEvent(project.getId(), {
        title: project.getTitle(),
        description: project.getDescription(),
        category: project.getCategory().getValue(),
        status: project.getStatus().getValue(),
      })
    );

    return aggregate;
  }

  public static fromProject(project: Project): ProjectAggregate {
    return new ProjectAggregate(project);
  }

  public getProject(): Project {
    return this.project;
  }

  public changeStatus(newStatus: ProjectStatus): void {
    const previousStatus = this.project.getStatus();

    if (previousStatus.equals(newStatus)) {
      return; // No change needed
    }

    this.project = this.project.updateStatus(newStatus);

    this.raiseDomainEvent(
      new ProjectStatusChangedEvent(this.project.getId(), {
        previousStatus: previousStatus.getValue(),
        newStatus: newStatus.getValue(),
        changedAt: new Date(),
      })
    );
  }

  public updateGitHubStats(starCount: number, forkCount: number): void {
    const previousStarCount = this.project.getStarCount();
    const previousForkCount = this.project.getForkCount();

    if (previousStarCount === starCount && previousForkCount === forkCount) {
      return; // No change needed
    }

    this.project = this.project.updateGitHubStats(starCount, forkCount);

    this.raiseDomainEvent(
      new ProjectStatsUpdatedEvent(this.project.getId(), {
        previousStarCount,
        newStarCount: starCount,
        previousForkCount,
        newForkCount: forkCount,
      })
    );
  }

  public manageTags(tagsToAdd: readonly string[], tagsToRemove: readonly string[]): void {
    const previousTags = this.project.getTags();
    let updatedProject = this.project;

    // Add new tags
    for (const tag of tagsToAdd) {
      updatedProject = updatedProject.addTag(tag);
    }

    // Remove tags
    for (const tag of tagsToRemove) {
      updatedProject = updatedProject.removeTag(tag);
    }

    const newTags = updatedProject.getTags();

    // Check if there were actual changes
    if (this.tagsEqual(previousTags, newTags)) {
      return;
    }

    this.project = updatedProject;

    this.raiseDomainEvent(
      new ProjectTagsChangedEvent(this.project.getId(), {
        previousTags,
        newTags,
        addedTags: tagsToAdd,
        removedTags: tagsToRemove,
      })
    );
  }

  public getDomainEvents(): readonly DomainEvent[] {
    return [...this.domainEvents];
  }

  public clearDomainEvents(): void {
    this.domainEvents = [];
  }

  private raiseDomainEvent(event: DomainEvent): void {
    this.domainEvents.push(event);
  }

  private tagsEqual(tags1: readonly string[], tags2: readonly string[]): boolean {
    if (tags1.length !== tags2.length) {
      return false;
    }

    const sorted1 = [...tags1].sort();
    const sorted2 = [...tags2].sort();

    return sorted1.every((tag, index) => tag === sorted2[index]);
  }
}