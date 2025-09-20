import { Event } from '../../domain/entities/event';
import { EventId } from '../../domain/value-objects/event-id';
import { EventType } from '../../domain/value-objects/event-type';
import { Location } from '../../domain/value-objects/location';

export interface EventFilters {
  readonly type?: EventType;
  readonly isUpcoming?: boolean;
  readonly isOngoing?: boolean;
  readonly isPast?: boolean;
  readonly isOnline?: boolean;
  readonly city?: string;
  readonly country?: string;
  readonly tags?: readonly string[];
  readonly hasAvailableSpots?: boolean;
  readonly searchQuery?: string;
  readonly startAfter?: Date;
  readonly startBefore?: Date;
}

export interface EventSortOptions {
  readonly field: 'title' | 'createdAt' | 'startDate' | 'participants';
  readonly direction: 'asc' | 'desc';
}

export interface EventQueryResult {
  readonly events: readonly Event[];
  readonly total: number;
  readonly page: number;
  readonly totalPages: number;
}

export interface EventRepository {
  findById(id: EventId): Promise<Event | null>;
  findAll(
    filters?: EventFilters,
    sort?: EventSortOptions,
    pagination?: PaginationOptions
  ): Promise<EventQueryResult>;
  findUpcoming(limit?: number): Promise<readonly Event[]>;
  findOngoing(): Promise<readonly Event[]>;
  findByType(type: EventType): Promise<readonly Event[]>;
  findByLocation(location: Location): Promise<readonly Event[]>;
  findInCity(city: string): Promise<readonly Event[]>;
  findOnline(): Promise<readonly Event[]>;
  findWithAvailableSpots(): Promise<readonly Event[]>;
  save(event: Event): Promise<void>;
  delete(id: EventId): Promise<void>;
  exists(id: EventId): Promise<boolean>;
  countByType(type: EventType): Promise<number>;
  countUpcoming(): Promise<number>;
  getPopularTags(limit?: number): Promise<readonly string[]>;
  getPopularCities(limit?: number): Promise<readonly string[]>;
}

export interface PaginationOptions {
  readonly page: number;
  readonly limit: number;
}