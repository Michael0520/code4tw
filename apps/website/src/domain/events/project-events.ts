import { BaseDomainEvent } from './domain-event';
import { ProjectId } from '../value-objects/project-id';
import { ProjectStatus } from '../value-objects/project-status';

export class ProjectCreatedEvent extends BaseDomainEvent {
  constructor(
    projectId: ProjectId,
    eventData: {
      title: string;
      description: string;
      category: string;
      status: string;
    }
  ) {
    super(
      'ProjectCreated',
      projectId.getValue(),
      'Project',
      eventData
    );
  }
}

export class ProjectStatusChangedEvent extends BaseDomainEvent {
  constructor(
    projectId: ProjectId,
    eventData: {
      previousStatus: string;
      newStatus: string;
      changedAt: Date;
    }
  ) {
    super(
      'ProjectStatusChanged',
      projectId.getValue(),
      'Project',
      eventData
    );
  }
}

export class ProjectStatsUpdatedEvent extends BaseDomainEvent {
  constructor(
    projectId: ProjectId,
    eventData: {
      previousStarCount: number;
      newStarCount: number;
      previousForkCount: number;
      newForkCount: number;
    }
  ) {
    super(
      'ProjectStatsUpdated',
      projectId.getValue(),
      'Project',
      eventData
    );
  }
}

export class ProjectTagsChangedEvent extends BaseDomainEvent {
  constructor(
    projectId: ProjectId,
    eventData: {
      previousTags: readonly string[];
      newTags: readonly string[];
      addedTags: readonly string[];
      removedTags: readonly string[];
    }
  ) {
    super(
      'ProjectTagsChanged',
      projectId.getValue(),
      'Project',
      eventData
    );
  }
}