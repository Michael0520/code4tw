import { EventId } from '../value-objects/event-id';
import { EventType } from '../value-objects/event-type';
import { Location } from '../value-objects/location';
import { DateRange } from '../value-objects/date-range';

export interface EventProps {
  readonly id: EventId;
  readonly title: string;
  readonly description: string;
  readonly type: EventType;
  readonly dateRange: DateRange;
  readonly location: Location;
  readonly maxParticipants?: number;
  readonly currentParticipants: number;
  readonly registrationUrl?: string;
  readonly isRegistrationOpen: boolean;
  readonly tags: readonly string[];
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export class Event {
  private constructor(private readonly props: EventProps) {
    this.validateTitle(props.title);
    this.validateDescription(props.description);
    this.validateParticipants(props.currentParticipants, props.maxParticipants);
  }

  public static create(params: {
    title: string;
    description: string;
    type: EventType;
    dateRange: DateRange;
    location: Location;
    maxParticipants?: number;
    registrationUrl?: string;
    tags?: readonly string[];
  }): Event {
    const now = new Date();

    return new Event({
      id: EventId.generate(),
      title: params.title,
      description: params.description,
      type: params.type,
      dateRange: params.dateRange,
      location: params.location,
      maxParticipants: params.maxParticipants,
      currentParticipants: 0,
      registrationUrl: params.registrationUrl,
      isRegistrationOpen: true,
      tags: params.tags || [],
      createdAt: now,
      updatedAt: now,
    });
  }

  public static fromPersistence(props: EventProps): Event {
    return new Event(props);
  }

  public getId(): EventId {
    return this.props.id;
  }

  public getTitle(): string {
    return this.props.title;
  }

  public getDescription(): string {
    return this.props.description;
  }

  public getType(): EventType {
    return this.props.type;
  }

  public getDateRange(): DateRange {
    return this.props.dateRange;
  }

  public getLocation(): Location {
    return this.props.location;
  }

  public getMaxParticipants(): number | undefined {
    return this.props.maxParticipants;
  }

  public getCurrentParticipants(): number {
    return this.props.currentParticipants;
  }

  public getRegistrationUrl(): string | undefined {
    return this.props.registrationUrl;
  }

  public isRegistrationOpen(): boolean {
    return this.props.isRegistrationOpen;
  }

  public getTags(): readonly string[] {
    return this.props.tags;
  }

  public getCreatedAt(): Date {
    return this.props.createdAt;
  }

  public getUpdatedAt(): Date {
    return this.props.updatedAt;
  }

  public addParticipant(): Event {
    if (!this.canAddParticipant()) {
      throw new Error('Cannot add participant: event is full or registration is closed');
    }

    return new Event({
      ...this.props,
      currentParticipants: this.props.currentParticipants + 1,
      updatedAt: new Date(),
    });
  }

  public removeParticipant(): Event {
    if (this.props.currentParticipants === 0) {
      throw new Error('Cannot remove participant: no participants registered');
    }

    return new Event({
      ...this.props,
      currentParticipants: this.props.currentParticipants - 1,
      updatedAt: new Date(),
    });
  }

  public openRegistration(): Event {
    return new Event({
      ...this.props,
      isRegistrationOpen: true,
      updatedAt: new Date(),
    });
  }

  public closeRegistration(): Event {
    return new Event({
      ...this.props,
      isRegistrationOpen: false,
      updatedAt: new Date(),
    });
  }

  public updateDetails(params: {
    title?: string;
    description?: string;
    type?: EventType;
    dateRange?: DateRange;
    location?: Location;
    maxParticipants?: number;
    registrationUrl?: string;
    tags?: readonly string[];
  }): Event {
    const updatedProps = { ...this.props };

    if (params.title) {
      this.validateTitle(params.title);
      updatedProps.title = params.title;
    }

    if (params.description) {
      this.validateDescription(params.description);
      updatedProps.description = params.description;
    }

    if (params.type) {
      updatedProps.type = params.type;
    }

    if (params.dateRange) {
      updatedProps.dateRange = params.dateRange;
    }

    if (params.location) {
      updatedProps.location = params.location;
    }

    if (params.maxParticipants !== undefined) {
      this.validateParticipants(this.props.currentParticipants, params.maxParticipants);
      updatedProps.maxParticipants = params.maxParticipants;
    }

    if (params.registrationUrl) {
      updatedProps.registrationUrl = params.registrationUrl;
    }

    if (params.tags) {
      updatedProps.tags = params.tags;
    }

    updatedProps.updatedAt = new Date();

    return new Event(updatedProps);
  }

  public canAddParticipant(): boolean {
    return (
      this.props.isRegistrationOpen &&
      (this.props.maxParticipants === undefined ||
       this.props.currentParticipants < this.props.maxParticipants)
    );
  }

  public isFull(): boolean {
    return this.props.maxParticipants !== undefined &&
           this.props.currentParticipants >= this.props.maxParticipants;
  }

  public isUpcoming(): boolean {
    return this.props.dateRange.isInFuture();
  }

  public isOngoing(): boolean {
    return this.props.dateRange.isOngoing();
  }

  public isPast(): boolean {
    return this.props.dateRange.isInPast();
  }

  public getAvailableSpots(): number | undefined {
    if (this.props.maxParticipants === undefined) {
      return undefined;
    }
    return this.props.maxParticipants - this.props.currentParticipants;
  }

  public toPersistence(): EventProps {
    return { ...this.props };
  }

  private validateTitle(title: string): void {
    if (!title || title.trim().length === 0) {
      throw new Error('Event title cannot be empty');
    }
    if (title.length > 150) {
      throw new Error('Event title cannot exceed 150 characters');
    }
  }

  private validateDescription(description: string): void {
    if (!description || description.trim().length === 0) {
      throw new Error('Event description cannot be empty');
    }
    if (description.length > 2000) {
      throw new Error('Event description cannot exceed 2000 characters');
    }
  }

  private validateParticipants(current: number, max?: number): void {
    if (current < 0) {
      throw new Error('Current participants cannot be negative');
    }
    if (max !== undefined && max < 0) {
      throw new Error('Max participants cannot be negative');
    }
    if (max !== undefined && current > max) {
      throw new Error('Current participants cannot exceed maximum participants');
    }
  }
}