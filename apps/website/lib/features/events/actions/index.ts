/**
 * Events Server Actions
 * Use cases and data fetching logic
 */

'use server';

import { Event, EventService } from '@/lib/features/events/domain';
import { EVENTS_CONFIG, STATIC_EVENTS_DATA } from '@/lib/features/events/config';

// ============= Types =============

export interface EventFilters {
  type?: string;
  status?: string;
  searchQuery?: string;
  sortBy?: 'title' | 'eventDate' | 'registrations' | 'capacity';
  sortOrder?: 'asc' | 'desc';
  isFeatured?: boolean;
  hasAvailableSpots?: boolean;
  dateRange?: {
    start: string;
    end: string;
  };
}

export interface EventDto {
  id: string;
  title: string;
  slug: string;
  description: string;
  type: string;
  typeDisplay: string;
  typeIcon: string;
  typeColor: string;
  status: string;
  statusDisplay: string;
  statusColor: string;
  eventDate: string;
  endDate?: string;
  timeInfo: string;
  locationName: string;
  locationAddress?: string;
  locationDisplay: string;
  isOnline: boolean;
  maxCapacity: number;
  currentRegistered: number;
  availableSpots: number;
  occupancyRate: number;
  isFull: boolean;
  isNearlyFull: boolean;
  registrationUrl?: string;
  imageUrl?: string;
  isFeatured: boolean;
  canRegister: boolean;
  organizerId: string;
  organizerName: string;
  tags: string[];
  daysUntilEvent?: number;
  duration?: number;
  createdAt: string;
  updatedAt: string;
}

export interface EventResponse {
  events: EventDto[];
  total: number;
  stats: {
    total: number;
    upcoming: number;
    past: number;
    featured: number;
    withAvailableSpots: number;
    totalCapacity: number;
    totalRegistered: number;
    averageOccupancy: number;
    typeDistribution: Record<string, number>;
  };
}

// ============= Server Actions =============

/**
 * Get all events with optional filters
 */
export async function getEvents(filters?: EventFilters): Promise<EventResponse> {
  try {
    // TODO: Replace with actual database/API call
    const eventsData = STATIC_EVENTS_DATA;

    // Create domain entities
    const events = eventsData.map(data => new Event(data));

    // Apply filters using domain service
    let filteredEvents = events;

    if (filters) {
      // Basic filters
      filteredEvents = EventService.filterEvents(filteredEvents, {
        type: filters.type,
        status: filters.status,
        isFeatured: filters.isFeatured,
        hasAvailableSpots: filters.hasAvailableSpots,
        dateRange: filters.dateRange ? {
          start: new Date(filters.dateRange.start),
          end: new Date(filters.dateRange.end)
        } : undefined
      });

      // Search
      if (filters.searchQuery) {
        filteredEvents = EventService.searchEvents(
          filteredEvents,
          filters.searchQuery
        );
      }

      // Sort
      const sortBy = filters.sortBy || 'eventDate';
      const sortOrder = filters.sortOrder || 'asc';
      filteredEvents = EventService.sortEvents(
        filteredEvents,
        sortBy,
        sortOrder
      );
    }

    // Get statistics
    const stats = EventService.getEventStats(events);

    // Convert to DTOs
    const eventDtos = filteredEvents.map(eventToDto);

    return {
      events: eventDtos,
      total: filteredEvents.length,
      stats
    };
  } catch (error) {
    console.error('Failed to get events:', error);
    throw new Error('Failed to load events');
  }
}

/**
 * Get featured events
 */
export async function getFeaturedEvents(limit?: number): Promise<EventDto[]> {
  try {
    const eventsData = STATIC_EVENTS_DATA;
    const events = eventsData.map(data => new Event(data));

    const featured = EventService.getFeaturedEvents(
      events,
      limit || EVENTS_CONFIG.display.featuredCount
    );

    return featured.map(eventToDto);
  } catch (error) {
    console.error('Failed to get featured events:', error);
    throw new Error('Failed to load featured events');
  }
}

/**
 * Get upcoming events
 */
export async function getUpcomingEvents(limit?: number): Promise<EventDto[]> {
  try {
    const eventsData = STATIC_EVENTS_DATA;
    const events = eventsData.map(data => new Event(data));

    const upcoming = EventService.getUpcomingEvents(
      events,
      limit || EVENTS_CONFIG.display.upcomingCount
    );

    return upcoming.map(eventToDto);
  } catch (error) {
    console.error('Failed to get upcoming events:', error);
    throw new Error('Failed to load upcoming events');
  }
}

/**
 * Get past events
 */
export async function getPastEvents(limit?: number): Promise<EventDto[]> {
  try {
    const eventsData = STATIC_EVENTS_DATA;
    const events = eventsData.map(data => new Event(data));

    const past = EventService.getPastEvents(
      events,
      limit || EVENTS_CONFIG.display.pastCount
    );

    return past.map(eventToDto);
  } catch (error) {
    console.error('Failed to get past events:', error);
    throw new Error('Failed to load past events');
  }
}

/**
 * Get a single event by ID
 */
export async function getEventById(id: string): Promise<EventDto | null> {
  try {
    const eventData = STATIC_EVENTS_DATA.find(event => event.id === id);

    if (!eventData) {
      return null;
    }

    const event = new Event(eventData);
    return eventToDto(event);
  } catch (error) {
    console.error('Failed to get event:', error);
    throw new Error('Failed to load event');
  }
}

/**
 * Get a single event by slug
 */
export async function getEventBySlug(slug: string): Promise<EventDto | null> {
  try {
    const eventData = STATIC_EVENTS_DATA.find(event => event.slug === slug);

    if (!eventData) {
      return null;
    }

    const event = new Event(eventData);
    return eventToDto(event);
  } catch (error) {
    console.error('Failed to get event by slug:', error);
    throw new Error('Failed to load event');
  }
}

/**
 * Search events by query
 */
export async function searchEvents(query: string): Promise<EventDto[]> {
  try {
    if (query.length < EVENTS_CONFIG.search.minQueryLength) {
      return [];
    }

    const eventsData = STATIC_EVENTS_DATA;
    const events = eventsData.map(data => new Event(data));

    const searchResults = EventService.searchEvents(events, query);

    return searchResults.map(eventToDto);
  } catch (error) {
    console.error('Failed to search events:', error);
    throw new Error('Failed to search events');
  }
}

/**
 * Get events by type
 */
export async function getEventsByType(type: string): Promise<EventDto[]> {
  try {
    const eventsData = STATIC_EVENTS_DATA;
    const events = eventsData.map(data => new Event(data));

    const filtered = EventService.getEventsByType(events, type);

    return filtered.map(eventToDto);
  } catch (error) {
    console.error('Failed to get events by type:', error);
    throw new Error('Failed to load events');
  }
}

/**
 * Get popular event types
 */
export async function getPopularEventTypes(): Promise<{ type: string; count: number; displayName: string; icon: string }[]> {
  try {
    const eventsData = STATIC_EVENTS_DATA;
    const events = eventsData.map(data => new Event(data));

    const popularTypes = EventService.getPopularEventTypes(events);

    return popularTypes.map(({ type, count }) => {
      const typeConfig = EVENTS_CONFIG.types.find(t => t.value === type);
      return {
        type,
        count,
        displayName: typeConfig?.labelKey || type,
        icon: typeConfig?.icon || '📅'
      };
    });
  } catch (error) {
    console.error('Failed to get popular event types:', error);
    throw new Error('Failed to load event types');
  }
}

/**
 * Get event statistics
 */
export async function getEventStats() {
  try {
    const eventsData = STATIC_EVENTS_DATA;
    const events = eventsData.map(data => new Event(data));

    return EventService.getEventStats(events);
  } catch (error) {
    console.error('Failed to get event stats:', error);
    throw new Error('Failed to load statistics');
  }
}

// ============= Helper Functions =============

/**
 * Convert Event entity to DTO
 */
function eventToDto(event: Event): EventDto {
  const data = event.toData();
  const eventDate = event.getEventDate();
  const endDate = event.getEndDate();
  const type = event.getType();
  const status = event.getStatus();
  const capacity = event.getCapacity();
  const location = event.getLocation();

  return {
    id: data.id,
    title: data.title,
    slug: data.slug,
    description: data.description,
    type: type.getValue(),
    typeDisplay: type.getDisplayName(),
    typeIcon: type.getIcon(),
    typeColor: type.getColor(),
    status: status.getValue(),
    statusDisplay: status.getDisplayName(),
    statusColor: status.getColor(),
    eventDate: eventDate.getValue().toISOString(),
    endDate: endDate?.getValue().toISOString(),
    timeInfo: data.timeInfo,
    locationName: location.getName(),
    locationAddress: location.getAddress(),
    locationDisplay: location.getDisplayText(),
    isOnline: location.isOnlineEvent(),
    maxCapacity: capacity.getMaxCapacity(),
    currentRegistered: capacity.getCurrentRegistered(),
    availableSpots: capacity.getAvailableSpots(),
    occupancyRate: capacity.getOccupancyRate(),
    isFull: capacity.isFull(),
    isNearlyFull: capacity.isNearlyFull(),
    registrationUrl: data.registrationUrl,
    imageUrl: data.imageUrl,
    isFeatured: data.isFeatured,
    canRegister: event.canRegister(),
    organizerId: data.organizerId,
    organizerName: data.organizerName,
    tags: data.tags,
    daysUntilEvent: event.getDaysUntilEvent(),
    duration: event.getDuration(),
    createdAt: data.createdAt.toISOString(),
    updatedAt: data.updatedAt.toISOString()
  };
}

// Validation functions moved to utils.ts to avoid server action conflicts