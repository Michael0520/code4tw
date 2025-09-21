/**
 * Events Domain Layer
 * Pure business logic for events management
 */

// ============= Value Objects =============

export class EventId {
  constructor(private readonly value: string) {
    if (!value || value.trim().length === 0) {
      throw new Error('EventId cannot be empty');
    }
  }

  getValue(): string {
    return this.value;
  }

  equals(other: EventId): boolean {
    return this.value === other.value;
  }
}

export class EventSlug {
  constructor(private readonly value: string) {
    this.validate(value);
  }

  static fromTitle(title: string): EventSlug {
    const slug = title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
    return new EventSlug(slug);
  }

  getValue(): string {
    return this.value;
  }

  equals(other: EventSlug): boolean {
    return this.value === other.value;
  }

  private validate(value: string): void {
    if (!value || value.trim().length === 0) {
      throw new Error('EventSlug cannot be empty');
    }
    if (value.length > 100) {
      throw new Error('EventSlug cannot exceed 100 characters');
    }
    const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
    if (!slugRegex.test(value)) {
      throw new Error('EventSlug must contain only lowercase letters, numbers, and hyphens');
    }
  }
}

export class EventType {
  static readonly VALID_TYPES = [
    'hackathon',
    'workshop',
    'meetup',
    'training',
    'conference'
  ] as const;

  constructor(private readonly value: typeof EventType.VALID_TYPES[number]) {
    if (!EventType.VALID_TYPES.includes(value)) {
      throw new Error(`Invalid event type: ${value}`);
    }
  }

  getValue(): string {
    return this.value;
  }

  getDisplayName(): string {
    const displayNames: Record<string, string> = {
      hackathon: 'Hackathon',
      workshop: 'Workshop',
      meetup: 'Meetup',
      training: 'Training',
      conference: 'Conference'
    };
    return displayNames[this.value];
  }

  getIcon(): string {
    const icons: Record<string, string> = {
      hackathon: '⚡',
      workshop: '🛠️',
      meetup: '👥',
      training: '📚',
      conference: '🎤'
    };
    return icons[this.value];
  }

  getColor(): string {
    const colors: Record<string, string> = {
      hackathon: 'bg-purple-500/10 text-purple-700 border-purple-500/20',
      workshop: 'bg-blue-500/10 text-blue-700 border-blue-500/20',
      meetup: 'bg-green-500/10 text-green-700 border-green-500/20',
      training: 'bg-orange-500/10 text-orange-700 border-orange-500/20',
      conference: 'bg-red-500/10 text-red-700 border-red-500/20'
    };
    return colors[this.value];
  }

  equals(other: EventType): boolean {
    return this.value === other.value;
  }
}

export class EventStatus {
  static readonly VALID_STATUSES = [
    'upcoming',
    'ongoing',
    'past',
    'cancelled'
  ] as const;

  constructor(private readonly value: typeof EventStatus.VALID_STATUSES[number]) {
    if (!EventStatus.VALID_STATUSES.includes(value)) {
      throw new Error(`Invalid event status: ${value}`);
    }
  }

  getValue(): string {
    return this.value;
  }

  getDisplayName(): string {
    const displayNames: Record<string, string> = {
      upcoming: 'Upcoming',
      ongoing: 'Ongoing',
      past: 'Past',
      cancelled: 'Cancelled'
    };
    return displayNames[this.value];
  }

  getColor(): string {
    const colors: Record<string, string> = {
      upcoming: 'bg-blue-500/10 text-blue-700 border-blue-500/20',
      ongoing: 'bg-green-500/10 text-green-700 border-green-500/20',
      past: 'bg-gray-500/10 text-gray-700 border-gray-500/20',
      cancelled: 'bg-red-500/10 text-red-700 border-red-500/20'
    };
    return colors[this.value];
  }

  equals(other: EventStatus): boolean {
    return this.value === other.value;
  }
}

export class EventDate {
  constructor(private readonly value: Date) {
    if (!(value instanceof Date) || isNaN(value.getTime())) {
      throw new Error('EventDate must be a valid Date');
    }
  }

  getValue(): Date {
    return new Date(this.value);
  }

  isInPast(): boolean {
    return this.value < new Date();
  }

  isInFuture(): boolean {
    return this.value > new Date();
  }

  isToday(): boolean {
    const today = new Date();
    return this.value.toDateString() === today.toDateString();
  }

  getDaysUntil(): number {
    const now = new Date();
    const diffMs = this.value.getTime() - now.getTime();
    return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  }

  formatDate(locale: string = 'en-US'): string {
    return this.value.toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  formatDateTime(locale: string = 'en-US'): string {
    return this.value.toLocaleString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  equals(other: EventDate): boolean {
    return this.value.getTime() === other.value.getTime();
  }
}

export class EventCapacity {
  constructor(
    private readonly maxCapacity: number,
    private readonly currentRegistered: number = 0
  ) {
    if (maxCapacity < 0) {
      throw new Error('Max capacity cannot be negative');
    }
    if (currentRegistered < 0) {
      throw new Error('Current registered cannot be negative');
    }
    if (currentRegistered > maxCapacity) {
      throw new Error('Current registered cannot exceed max capacity');
    }
  }

  getMaxCapacity(): number {
    return this.maxCapacity;
  }

  getCurrentRegistered(): number {
    return this.currentRegistered;
  }

  getAvailableSpots(): number {
    return this.maxCapacity - this.currentRegistered;
  }

  getOccupancyRate(): number {
    return this.currentRegistered / this.maxCapacity;
  }

  isFull(): boolean {
    return this.currentRegistered >= this.maxCapacity;
  }

  isNearlyFull(threshold: number = 0.9): boolean {
    return this.getOccupancyRate() >= threshold;
  }

  withRegistration(additionalRegistrations: number = 1): EventCapacity {
    return new EventCapacity(this.maxCapacity, this.currentRegistered + additionalRegistrations);
  }

  equals(other: EventCapacity): boolean {
    return this.maxCapacity === other.maxCapacity &&
           this.currentRegistered === other.currentRegistered;
  }
}

export class EventLocation {
  constructor(
    private readonly name: string,
    private readonly address?: string,
    private readonly isOnline: boolean = false
  ) {
    if (!name || name.trim().length === 0) {
      throw new Error('Event location name cannot be empty');
    }
  }

  getName(): string {
    return this.name;
  }

  getAddress(): string | undefined {
    return this.address;
  }

  isOnlineEvent(): boolean {
    return this.isOnline;
  }

  getDisplayText(): string {
    if (this.isOnline) {
      return 'Online Event';
    }
    return this.address ? `${this.name}, ${this.address}` : this.name;
  }

  equals(other: EventLocation): boolean {
    return this.name === other.name &&
           this.address === other.address &&
           this.isOnline === other.isOnline;
  }
}

// ============= Entity =============

export interface EventData {
  id: string;
  title: string;
  slug: string;
  description: string;
  type: typeof EventType.VALID_TYPES[number];
  status: typeof EventStatus.VALID_STATUSES[number];
  eventDate: Date;
  endDate?: Date;
  timeInfo: string;
  locationName: string;
  locationAddress?: string;
  isOnline: boolean;
  maxCapacity: number;
  currentRegistered: number;
  registrationUrl?: string;
  imageUrl?: string;
  isFeatured: boolean;
  organizerId: string;
  organizerName: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export class Event {
  private readonly id: EventId;
  private readonly slug: EventSlug;
  private readonly type: EventType;
  private readonly status: EventStatus;
  private readonly eventDate: EventDate;
  private readonly endDate?: EventDate;
  private readonly capacity: EventCapacity;
  private readonly location: EventLocation;

  constructor(private readonly data: EventData) {
    this.id = new EventId(data.id);
    this.slug = new EventSlug(data.slug);
    this.type = new EventType(data.type);
    this.status = new EventStatus(data.status);
    this.eventDate = new EventDate(data.eventDate);

    if (data.endDate) {
      this.endDate = new EventDate(data.endDate);
      this.validateDateRange();
    }

    this.capacity = new EventCapacity(data.maxCapacity, data.currentRegistered);
    this.location = new EventLocation(data.locationName, data.locationAddress, data.isOnline);

    this.validateTitle(data.title);
    this.validateDescription(data.description);
  }

  private validateTitle(title: string): void {
    if (!title || title.trim().length === 0) {
      throw new Error('Event title cannot be empty');
    }
    if (title.length > 200) {
      throw new Error('Event title cannot exceed 200 characters');
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

  private validateDateRange(): void {
    if (this.endDate && this.endDate.getValue() <= this.eventDate.getValue()) {
      throw new Error('End date must be after event date');
    }
  }

  getId(): EventId {
    return this.id;
  }

  getTitle(): string {
    return this.data.title;
  }

  getSlug(): EventSlug {
    return this.slug;
  }

  getDescription(): string {
    return this.data.description;
  }

  getType(): EventType {
    return this.type;
  }

  getStatus(): EventStatus {
    return this.status;
  }

  getEventDate(): EventDate {
    return this.eventDate;
  }

  getEndDate(): EventDate | undefined {
    return this.endDate;
  }

  getTimeInfo(): string {
    return this.data.timeInfo;
  }

  getLocation(): EventLocation {
    return this.location;
  }

  getCapacity(): EventCapacity {
    return this.capacity;
  }

  getRegistrationUrl(): string | undefined {
    return this.data.registrationUrl;
  }

  getImageUrl(): string | undefined {
    return this.data.imageUrl;
  }

  isFeatured(): boolean {
    return this.data.isFeatured;
  }

  getOrganizerId(): string {
    return this.data.organizerId;
  }

  getOrganizerName(): string {
    return this.data.organizerName;
  }

  getTags(): string[] {
    return [...this.data.tags];
  }

  hasTag(tag: string): boolean {
    return this.data.tags.includes(tag.toLowerCase());
  }

  matchesSearch(query: string): boolean {
    const lowerQuery = query.toLowerCase();
    return (
      this.data.title.toLowerCase().includes(lowerQuery) ||
      this.data.description.toLowerCase().includes(lowerQuery) ||
      this.data.tags.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
      this.location.getName().toLowerCase().includes(lowerQuery)
    );
  }

  canRegister(): boolean {
    return !this.capacity.isFull() &&
           this.status.getValue() === 'upcoming' &&
           this.eventDate.isInFuture() &&
           !!this.data.registrationUrl;
  }

  getDaysUntilEvent(): number {
    return this.eventDate.getDaysUntil();
  }

  getDuration(): number | undefined {
    if (!this.endDate) return undefined;
    const diffMs = this.endDate.getValue().getTime() - this.eventDate.getValue().getTime();
    return Math.ceil(diffMs / (1000 * 60 * 60)); // Duration in hours
  }

  toData(): EventData {
    return { ...this.data };
  }
}

// ============= Domain Services =============

export const EventService = {
  /**
   * Filter events based on criteria
   */
  filterEvents(
    events: Event[],
    criteria: {
      type?: string;
      status?: string;
      isFeatured?: boolean;
      hasAvailableSpots?: boolean;
      dateRange?: { start: Date; end: Date };
    }
  ): Event[] {
    return events.filter(event => {
      // Type filter
      if (criteria.type && criteria.type !== 'all') {
        if (event.getType().getValue() !== criteria.type) {
          return false;
        }
      }

      // Status filter
      if (criteria.status && criteria.status !== 'all') {
        if (event.getStatus().getValue() !== criteria.status) {
          return false;
        }
      }

      // Featured filter
      if (criteria.isFeatured !== undefined && event.isFeatured() !== criteria.isFeatured) {
        return false;
      }

      // Available spots filter
      if (criteria.hasAvailableSpots && event.getCapacity().isFull()) {
        return false;
      }

      // Date range filter
      if (criteria.dateRange) {
        const eventDate = event.getEventDate().getValue();
        if (eventDate < criteria.dateRange.start || eventDate > criteria.dateRange.end) {
          return false;
        }
      }

      return true;
    });
  },

  /**
   * Search events by query
   */
  searchEvents(events: Event[], query: string): Event[] {
    if (!query || query.trim().length === 0) {
      return events;
    }

    return events.filter(event => event.matchesSearch(query));
  },

  /**
   * Sort events by different criteria
   */
  sortEvents(
    events: Event[],
    sortBy: 'title' | 'eventDate' | 'registrations' | 'capacity' = 'eventDate',
    order: 'asc' | 'desc' = 'asc'
  ): Event[] {
    const sorted = [...events].sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case 'title':
          comparison = a.getTitle().localeCompare(b.getTitle());
          break;
        case 'eventDate':
          comparison = a.getEventDate().getValue().getTime() - b.getEventDate().getValue().getTime();
          break;
        case 'registrations':
          comparison = a.getCapacity().getCurrentRegistered() - b.getCapacity().getCurrentRegistered();
          break;
        case 'capacity':
          comparison = a.getCapacity().getMaxCapacity() - b.getCapacity().getMaxCapacity();
          break;
      }

      return order === 'desc' ? -comparison : comparison;
    });

    return sorted;
  },

  /**
   * Get featured events
   */
  getFeaturedEvents(events: Event[], limit: number = 3): Event[] {
    return this.filterEvents(events, { isFeatured: true })
      .slice(0, limit);
  },

  /**
   * Get upcoming events
   */
  getUpcomingEvents(events: Event[], limit?: number): Event[] {
    const upcoming = this.sortEvents(
      this.filterEvents(events, { status: 'upcoming' }),
      'eventDate',
      'asc'
    );
    return limit ? upcoming.slice(0, limit) : upcoming;
  },

  /**
   * Get past events
   */
  getPastEvents(events: Event[], limit?: number): Event[] {
    const past = this.sortEvents(
      this.filterEvents(events, { status: 'past' }),
      'eventDate',
      'desc'
    );
    return limit ? past.slice(0, limit) : past;
  },

  /**
   * Get events by type
   */
  getEventsByType(events: Event[], type: string): Event[] {
    return this.filterEvents(events, { type });
  },

  /**
   * Get popular event types
   */
  getPopularEventTypes(events: Event[]): { type: string; count: number }[] {
    const typeCounts = new Map<string, number>();

    events.forEach(event => {
      const type = event.getType().getValue();
      typeCounts.set(type, (typeCounts.get(type) || 0) + 1);
    });

    return Array.from(typeCounts.entries())
      .map(([type, count]) => ({ type, count }))
      .sort((a, b) => b.count - a.count);
  },

  /**
   * Get event statistics
   */
  getEventStats(events: Event[]) {
    const upcoming = events.filter(e => e.getStatus().getValue() === 'upcoming');
    const past = events.filter(e => e.getStatus().getValue() === 'past');
    const featured = events.filter(e => e.isFeatured());
    const withAvailableSpots = events.filter(e => !e.getCapacity().isFull());

    const typeDistribution = this.getPopularEventTypes(events)
      .reduce((acc, { type, count }) => {
        acc[type] = count;
        return acc;
      }, {} as Record<string, number>);

    const totalCapacity = events.reduce((sum, event) => sum + event.getCapacity().getMaxCapacity(), 0);
    const totalRegistered = events.reduce((sum, event) => sum + event.getCapacity().getCurrentRegistered(), 0);

    return {
      total: events.length,
      upcoming: upcoming.length,
      past: past.length,
      featured: featured.length,
      withAvailableSpots: withAvailableSpots.length,
      totalCapacity,
      totalRegistered,
      averageOccupancy: totalCapacity > 0 ? totalRegistered / totalCapacity : 0,
      typeDistribution
    };
  }
};