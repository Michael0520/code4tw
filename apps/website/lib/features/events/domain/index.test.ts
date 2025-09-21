/**
 * Events Domain Tests
 * Comprehensive test coverage for events business logic
 */

import { describe, it, expect } from 'vitest';
import {
  EventId,
  EventSlug,
  EventType,
  EventStatus,
  EventDate,
  EventCapacity,
  EventLocation,
  Event,
  EventService,
  type EventData
} from '@/lib/features/events/domain';

describe('EventId Value Object', () => {
  it('should create valid EventId', () => {
    // Arrange
    const validId = 'event-123';

    // Act
    const eventId = new EventId(validId);

    // Assert
    expect(eventId.getValue()).toBe(validId);
  });

  it('should throw error for empty EventId', () => {
    // Arrange
    const emptyId = '';

    // Act & Assert
    expect(() => new EventId(emptyId)).toThrow('EventId cannot be empty');
  });

  it('should throw error for whitespace-only EventId', () => {
    // Arrange
    const whitespaceId = '   ';

    // Act & Assert
    expect(() => new EventId(whitespaceId)).toThrow('EventId cannot be empty');
  });

  it('should compare EventIds correctly', () => {
    // Arrange
    const id1 = new EventId('test-1');
    const id2 = new EventId('test-1');
    const id3 = new EventId('test-2');

    // Act & Assert
    expect(id1.equals(id2)).toBe(true);
    expect(id1.equals(id3)).toBe(false);
  });
});

describe('EventSlug Value Object', () => {
  it('should create valid slug', () => {
    // Arrange
    const validSlug = 'event-slug';

    // Act
    const slug = new EventSlug(validSlug);

    // Assert
    expect(slug.getValue()).toBe(validSlug);
  });

  it('should create slug from title', () => {
    // Arrange
    const title = 'This is an Event Title!';

    // Act
    const slug = EventSlug.fromTitle(title);

    // Assert
    expect(slug.getValue()).toBe('this-is-an-event-title');
  });

  it('should handle complex title characters', () => {
    // Arrange
    const title = 'Test @#$% Event & More   Spaces';

    // Act
    const slug = EventSlug.fromTitle(title);

    // Assert
    expect(slug.getValue()).toBe('test-event-more-spaces');
  });

  it('should throw error for empty slug', () => {
    // Arrange
    const emptySlug = '';

    // Act & Assert
    expect(() => new EventSlug(emptySlug)).toThrow('EventSlug cannot be empty');
  });

  it('should throw error for slug exceeding 100 characters', () => {
    // Arrange
    const longSlug = 'a'.repeat(101);

    // Act & Assert
    expect(() => new EventSlug(longSlug)).toThrow('EventSlug cannot exceed 100 characters');
  });

  it('should throw error for invalid slug format', () => {
    // Arrange
    const invalidSlug = 'Invalid Slug!';

    // Act & Assert
    expect(() => new EventSlug(invalidSlug)).toThrow('EventSlug must contain only lowercase letters, numbers, and hyphens');
  });
});

describe('EventType Value Object', () => {
  it('should create valid event type', () => {
    // Arrange
    const type = 'hackathon';

    // Act
    const eventType = new EventType(type);

    // Assert
    expect(eventType.getValue()).toBe(type);
  });

  it('should throw error for invalid type', () => {
    // Arrange
    const invalidType = 'invalid-type' as any;

    // Act & Assert
    expect(() => new EventType(invalidType)).toThrow('Invalid event type: invalid-type');
  });

  it('should return correct display name', () => {
    // Arrange
    const type = new EventType('workshop');

    // Act
    const displayName = type.getDisplayName();

    // Assert
    expect(displayName).toBe('Workshop');
  });

  it('should return correct icon', () => {
    // Arrange
    const type = new EventType('meetup');

    // Act
    const icon = type.getIcon();

    // Assert
    expect(icon).toBe('👥');
  });

  it('should return correct color classes', () => {
    // Arrange
    const type = new EventType('conference');

    // Act
    const color = type.getColor();

    // Assert
    expect(color).toBe('bg-red-500/10 text-red-700 border-red-500/20');
  });
});

describe('EventStatus Value Object', () => {
  it('should create valid event status', () => {
    // Arrange
    const status = 'upcoming';

    // Act
    const eventStatus = new EventStatus(status);

    // Assert
    expect(eventStatus.getValue()).toBe(status);
  });

  it('should throw error for invalid status', () => {
    // Arrange
    const invalidStatus = 'invalid-status' as any;

    // Act & Assert
    expect(() => new EventStatus(invalidStatus)).toThrow('Invalid event status: invalid-status');
  });

  it('should return correct display name', () => {
    // Arrange
    const status = new EventStatus('ongoing');

    // Act
    const displayName = status.getDisplayName();

    // Assert
    expect(displayName).toBe('Ongoing');
  });

  it('should return correct color classes', () => {
    // Arrange
    const status = new EventStatus('cancelled');

    // Act
    const color = status.getColor();

    // Assert
    expect(color).toBe('bg-red-500/10 text-red-700 border-red-500/20');
  });
});

describe('EventDate Value Object', () => {
  it('should create valid EventDate', () => {
    // Arrange
    const validDate = new Date('2024-02-15');

    // Act
    const eventDate = new EventDate(validDate);

    // Assert
    expect(eventDate.getValue()).toEqual(validDate);
  });

  it('should throw error for invalid date', () => {
    // Arrange
    const invalidDate = new Date('invalid');

    // Act & Assert
    expect(() => new EventDate(invalidDate)).toThrow('EventDate must be a valid Date');
  });

  it('should detect past dates', () => {
    // Arrange
    const pastDate = new Date('2020-01-01');
    const eventDate = new EventDate(pastDate);

    // Act
    const isPast = eventDate.isInPast();

    // Assert
    expect(isPast).toBe(true);
  });

  it('should detect future dates', () => {
    // Arrange
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 7);
    const eventDate = new EventDate(futureDate);

    // Act
    const isFuture = eventDate.isInFuture();

    // Assert
    expect(isFuture).toBe(true);
  });

  it('should detect today date', () => {
    // Arrange
    const today = new Date();
    const eventDate = new EventDate(today);

    // Act
    const isToday = eventDate.isToday();

    // Assert
    expect(isToday).toBe(true);
  });

  it('should calculate days until event', () => {
    // Arrange
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 5);
    const eventDate = new EventDate(futureDate);

    // Act
    const daysUntil = eventDate.getDaysUntil();

    // Assert
    expect(daysUntil).toBe(5);
  });

  it('should format date correctly', () => {
    // Arrange
    const date = new Date('2024-02-15');
    const eventDate = new EventDate(date);

    // Act
    const formatted = eventDate.formatDate('en-US');

    // Assert
    expect(formatted).toBe('February 15, 2024');
  });
});

describe('EventCapacity Value Object', () => {
  it('should create valid EventCapacity', () => {
    // Arrange
    const maxCapacity = 100;
    const registered = 75;

    // Act
    const capacity = new EventCapacity(maxCapacity, registered);

    // Assert
    expect(capacity.getMaxCapacity()).toBe(maxCapacity);
    expect(capacity.getCurrentRegistered()).toBe(registered);
  });

  it('should throw error for negative max capacity', () => {
    // Arrange
    const negativeCapacity = -1;

    // Act & Assert
    expect(() => new EventCapacity(negativeCapacity)).toThrow('Max capacity cannot be negative');
  });

  it('should throw error for negative registered count', () => {
    // Arrange
    const negativeRegistered = -1;

    // Act & Assert
    expect(() => new EventCapacity(100, negativeRegistered)).toThrow('Current registered cannot be negative');
  });

  it('should throw error for registered exceeding capacity', () => {
    // Arrange
    const maxCapacity = 50;
    const overRegistered = 60;

    // Act & Assert
    expect(() => new EventCapacity(maxCapacity, overRegistered)).toThrow('Current registered cannot exceed max capacity');
  });

  it('should calculate available spots', () => {
    // Arrange
    const capacity = new EventCapacity(100, 75);

    // Act
    const available = capacity.getAvailableSpots();

    // Assert
    expect(available).toBe(25);
  });

  it('should calculate occupancy rate', () => {
    // Arrange
    const capacity = new EventCapacity(100, 75);

    // Act
    const rate = capacity.getOccupancyRate();

    // Assert
    expect(rate).toBe(0.75);
  });

  it('should detect full capacity', () => {
    // Arrange
    const capacity = new EventCapacity(100, 100);

    // Act
    const isFull = capacity.isFull();

    // Assert
    expect(isFull).toBe(true);
  });

  it('should detect nearly full capacity', () => {
    // Arrange
    const capacity = new EventCapacity(100, 95);

    // Act
    const isNearlyFull = capacity.isNearlyFull(0.9);

    // Assert
    expect(isNearlyFull).toBe(true);
  });

  it('should add registrations', () => {
    // Arrange
    const capacity = new EventCapacity(100, 75);

    // Act
    const updated = capacity.withRegistration(5);

    // Assert
    expect(updated.getCurrentRegistered()).toBe(80);
  });
});

describe('EventLocation Value Object', () => {
  it('should create valid EventLocation', () => {
    // Arrange
    const name = 'Conference Center';
    const address = '123 Main St';

    // Act
    const location = new EventLocation(name, address);

    // Assert
    expect(location.getName()).toBe(name);
    expect(location.getAddress()).toBe(address);
  });

  it('should throw error for empty location name', () => {
    // Arrange
    const emptyName = '';

    // Act & Assert
    expect(() => new EventLocation(emptyName)).toThrow('Event location name cannot be empty');
  });

  it('should handle online events', () => {
    // Arrange
    const location = new EventLocation('Online Event', undefined, true);

    // Act
    const isOnline = location.isOnlineEvent();
    const displayText = location.getDisplayText();

    // Assert
    expect(isOnline).toBe(true);
    expect(displayText).toBe('Online Event');
  });

  it('should create display text with address', () => {
    // Arrange
    const location = new EventLocation('Conference Center', '123 Main St');

    // Act
    const displayText = location.getDisplayText();

    // Assert
    expect(displayText).toBe('Conference Center, 123 Main St');
  });

  it('should create display text without address', () => {
    // Arrange
    const location = new EventLocation('Conference Center');

    // Act
    const displayText = location.getDisplayText();

    // Assert
    expect(displayText).toBe('Conference Center');
  });
});

describe('Event Entity', () => {
  const createValidEventData = (): EventData => ({
    id: 'event-1',
    title: 'Test Event',
    slug: 'test-event',
    description: 'This is a test event description with enough content to pass validation.',
    type: 'workshop',
    status: 'upcoming',
    eventDate: new Date('2024-03-15T10:00:00'),
    endDate: new Date('2024-03-15T18:00:00'),
    timeInfo: '10:00-18:00',
    locationName: 'Test Venue',
    locationAddress: '123 Test St',
    isOnline: false,
    maxCapacity: 50,
    currentRegistered: 25,
    registrationUrl: 'https://example.com/register',
    imageUrl: '/test-event.jpg',
    isFeatured: false,
    organizerId: 'org-1',
    organizerName: 'Test Organizer',
    tags: ['test', 'workshop'],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  });

  it('should create valid Event', () => {
    // Arrange
    const eventData = createValidEventData();

    // Act
    const event = new Event(eventData);

    // Assert
    expect(event.getTitle()).toBe(eventData.title);
    expect(event.getDescription()).toBe(eventData.description);
    expect(event.getType().getValue()).toBe(eventData.type);
  });

  it('should throw error for empty title', () => {
    // Arrange
    const eventData = createValidEventData();
    eventData.title = '';

    // Act & Assert
    expect(() => new Event(eventData)).toThrow('Event title cannot be empty');
  });

  it('should throw error for title exceeding 200 characters', () => {
    // Arrange
    const eventData = createValidEventData();
    eventData.title = 'a'.repeat(201);

    // Act & Assert
    expect(() => new Event(eventData)).toThrow('Event title cannot exceed 200 characters');
  });

  it('should throw error for empty description', () => {
    // Arrange
    const eventData = createValidEventData();
    eventData.description = '';

    // Act & Assert
    expect(() => new Event(eventData)).toThrow('Event description cannot be empty');
  });

  it('should throw error for description exceeding 2000 characters', () => {
    // Arrange
    const eventData = createValidEventData();
    eventData.description = 'a'.repeat(2001);

    // Act & Assert
    expect(() => new Event(eventData)).toThrow('Event description cannot exceed 2000 characters');
  });

  it('should throw error for invalid date range', () => {
    // Arrange
    const eventData = createValidEventData();
    eventData.endDate = new Date('2024-03-14T18:00:00'); // Before start date

    // Act & Assert
    expect(() => new Event(eventData)).toThrow('End date must be after event date');
  });

  it('should detect if event has specific tag', () => {
    // Arrange
    const eventData = createValidEventData();
    eventData.tags = ['test', 'workshop'];
    const event = new Event(eventData);

    // Act & Assert
    expect(event.hasTag('test')).toBe(true);
    expect(event.hasTag('nonexistent')).toBe(false);
  });

  it('should match search queries', () => {
    // Arrange
    const eventData = createValidEventData();
    eventData.title = 'AI Workshop';
    eventData.description = 'Learn about artificial intelligence';
    const event = new Event(eventData);

    // Act & Assert
    expect(event.matchesSearch('AI')).toBe(true);
    expect(event.matchesSearch('artificial')).toBe(true);
    expect(event.matchesSearch('nonexistent')).toBe(false);
  });

  it('should determine if registration is possible', () => {
    // Arrange
    const eventData = createValidEventData();
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 7); // Future date
    const futureEndDate = new Date();
    futureEndDate.setDate(futureEndDate.getDate() + 7);
    futureEndDate.setHours(futureEndDate.getHours() + 8); // End date after start

    eventData.eventDate = futureDate;
    eventData.endDate = futureEndDate;
    eventData.status = 'upcoming';
    eventData.currentRegistered = 25;
    eventData.maxCapacity = 50;
    eventData.registrationUrl = 'https://example.com/register';
    const event = new Event(eventData);

    // Act
    const canRegister = event.canRegister();

    // Assert
    expect(canRegister).toBe(true);
  });

  it('should prevent registration for full events', () => {
    // Arrange
    const eventData = createValidEventData();
    eventData.currentRegistered = 50;
    eventData.maxCapacity = 50;
    const event = new Event(eventData);

    // Act
    const canRegister = event.canRegister();

    // Assert
    expect(canRegister).toBe(false);
  });

  it('should calculate days until event', () => {
    // Arrange
    const eventData = createValidEventData();
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 5);
    const futureEndDate = new Date();
    futureEndDate.setDate(futureEndDate.getDate() + 5);
    futureEndDate.setHours(futureEndDate.getHours() + 8); // End date after start

    eventData.eventDate = futureDate;
    eventData.endDate = futureEndDate;
    const event = new Event(eventData);

    // Act
    const daysUntil = event.getDaysUntilEvent();

    // Assert
    expect(daysUntil).toBe(5);
  });

  it('should calculate event duration', () => {
    // Arrange
    const eventData = createValidEventData();
    eventData.eventDate = new Date('2024-03-15T10:00:00');
    eventData.endDate = new Date('2024-03-15T18:00:00');
    const event = new Event(eventData);

    // Act
    const duration = event.getDuration();

    // Assert
    expect(duration).toBe(8); // 8 hours
  });

  it('should return undefined duration for events without end date', () => {
    // Arrange
    const eventData = createValidEventData();
    eventData.endDate = undefined;
    const event = new Event(eventData);

    // Act
    const duration = event.getDuration();

    // Assert
    expect(duration).toBeUndefined();
  });
});

describe('EventService', () => {
  const createTestEvents = (): Event[] => {
    const events: EventData[] = [
      {
        id: 'event-1',
        title: 'Tech Workshop',
        slug: 'tech-workshop',
        description: 'A comprehensive workshop on technology.',
        type: 'workshop',
        status: 'upcoming',
        eventDate: new Date('2024-03-15T10:00:00'),
        timeInfo: '10:00-18:00',
        locationName: 'Tech Center',
        isOnline: false,
        maxCapacity: 50,
        currentRegistered: 25,
        registrationUrl: 'https://example.com/register1',
        isFeatured: true,
        organizerId: 'org-1',
        organizerName: 'Tech Org',
        tags: ['tech', 'workshop'],
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-15')
      },
      {
        id: 'event-2',
        title: 'Hackathon 2024',
        slug: 'hackathon-2024',
        description: 'Annual hackathon for innovative solutions.',
        type: 'hackathon',
        status: 'upcoming',
        eventDate: new Date('2024-04-20T09:00:00'),
        timeInfo: '09:00-21:00',
        locationName: 'Innovation Hub',
        isOnline: false,
        maxCapacity: 100,
        currentRegistered: 100,
        registrationUrl: 'https://example.com/register2',
        isFeatured: false,
        organizerId: 'org-2',
        organizerName: 'Innovation Org',
        tags: ['hackathon', 'innovation'],
        createdAt: new Date('2024-01-10'),
        updatedAt: new Date('2024-01-10')
      },
      {
        id: 'event-3',
        title: 'Past Conference',
        slug: 'past-conference',
        description: 'A past conference that already happened.',
        type: 'conference',
        status: 'past',
        eventDate: new Date('2023-12-10T09:00:00'),
        timeInfo: '09:00-17:00',
        locationName: 'Conference Center',
        isOnline: false,
        maxCapacity: 200,
        currentRegistered: 180,
        isFeatured: false,
        organizerId: 'org-3',
        organizerName: 'Conference Org',
        tags: ['conference', 'past'],
        createdAt: new Date('2023-11-15'),
        updatedAt: new Date('2023-12-11')
      }
    ];

    return events.map(data => new Event(data));
  };

  describe('filterEvents', () => {
    it('should filter by type', () => {
      // Arrange
      const events = createTestEvents();

      // Act
      const workshops = EventService.filterEvents(events, { type: 'workshop' });

      // Assert
      expect(workshops).toHaveLength(1);
      expect(workshops[0].getType().getValue()).toBe('workshop');
    });

    it('should filter by status', () => {
      // Arrange
      const events = createTestEvents();

      // Act
      const upcoming = EventService.filterEvents(events, { status: 'upcoming' });

      // Assert
      expect(upcoming).toHaveLength(2);
      expect(upcoming.every(e => e.getStatus().getValue() === 'upcoming')).toBe(true);
    });

    it('should filter by featured status', () => {
      // Arrange
      const events = createTestEvents();

      // Act
      const featured = EventService.filterEvents(events, { isFeatured: true });

      // Assert
      expect(featured).toHaveLength(1);
      expect(featured[0].isFeatured()).toBe(true);
    });

    it('should filter by available spots', () => {
      // Arrange
      const events = createTestEvents();

      // Act
      const withSpots = EventService.filterEvents(events, { hasAvailableSpots: true });

      // Assert
      expect(withSpots).toHaveLength(2);
      expect(withSpots.every(e => !e.getCapacity().isFull())).toBe(true);
    });
  });

  describe('searchEvents', () => {
    it('should search events by query', () => {
      // Arrange
      const events = createTestEvents();

      // Act
      const results = EventService.searchEvents(events, 'workshop');

      // Assert
      expect(results).toHaveLength(1);
      expect(results[0].getTitle()).toContain('Workshop');
    });

    it('should return all events for empty query', () => {
      // Arrange
      const events = createTestEvents();

      // Act
      const results = EventService.searchEvents(events, '');

      // Assert
      expect(results).toHaveLength(3);
    });
  });

  describe('sortEvents', () => {
    it('should sort by title ascending', () => {
      // Arrange
      const events = createTestEvents();

      // Act
      const sorted = EventService.sortEvents(events, 'title', 'asc');

      // Assert
      expect(sorted[0].getTitle()).toBe('Hackathon 2024');
      expect(sorted[1].getTitle()).toBe('Past Conference');
      expect(sorted[2].getTitle()).toBe('Tech Workshop');
    });

    it('should sort by event date ascending', () => {
      // Arrange
      const events = createTestEvents();

      // Act
      const sorted = EventService.sortEvents(events, 'eventDate', 'asc');

      // Assert
      const dates = sorted.map(e => e.getEventDate().getValue().getTime());
      expect(dates[0]).toBeLessThan(dates[1]);
      expect(dates[1]).toBeLessThan(dates[2]);
    });

    it('should sort by registrations descending', () => {
      // Arrange
      const events = createTestEvents();

      // Act
      const sorted = EventService.sortEvents(events, 'registrations', 'desc');

      // Assert
      const registrations = sorted.map(e => e.getCapacity().getCurrentRegistered());
      expect(registrations[0]).toBeGreaterThanOrEqual(registrations[1]);
      expect(registrations[1]).toBeGreaterThanOrEqual(registrations[2]);
    });
  });

  describe('getFeaturedEvents', () => {
    it('should return featured events', () => {
      // Arrange
      const events = createTestEvents();

      // Act
      const featured = EventService.getFeaturedEvents(events, 5);

      // Assert
      expect(featured).toHaveLength(1);
      expect(featured[0].isFeatured()).toBe(true);
    });
  });

  describe('getUpcomingEvents', () => {
    it('should return upcoming events sorted by date', () => {
      // Arrange
      const events = createTestEvents();

      // Act
      const upcoming = EventService.getUpcomingEvents(events);

      // Assert
      expect(upcoming).toHaveLength(2);
      expect(upcoming.every(e => e.getStatus().getValue() === 'upcoming')).toBe(true);
    });
  });

  describe('getPastEvents', () => {
    it('should return past events sorted by date descending', () => {
      // Arrange
      const events = createTestEvents();

      // Act
      const past = EventService.getPastEvents(events);

      // Assert
      expect(past).toHaveLength(1);
      expect(past[0].getStatus().getValue()).toBe('past');
    });
  });

  describe('getEventsByType', () => {
    it('should return events by type', () => {
      // Arrange
      const events = createTestEvents();

      // Act
      const hackathons = EventService.getEventsByType(events, 'hackathon');

      // Assert
      expect(hackathons).toHaveLength(1);
      expect(hackathons[0].getType().getValue()).toBe('hackathon');
    });
  });

  describe('getPopularEventTypes', () => {
    it('should return popular event types with counts', () => {
      // Arrange
      const events = createTestEvents();

      // Act
      const types = EventService.getPopularEventTypes(events);

      // Assert
      expect(types).toEqual([
        { type: 'workshop', count: 1 },
        { type: 'hackathon', count: 1 },
        { type: 'conference', count: 1 }
      ]);
    });
  });

  describe('getEventStats', () => {
    it('should return correct statistics', () => {
      // Arrange
      const events = createTestEvents();

      // Act
      const stats = EventService.getEventStats(events);

      // Assert
      expect(stats.total).toBe(3);
      expect(stats.upcoming).toBe(2);
      expect(stats.past).toBe(1);
      expect(stats.featured).toBe(1);
      expect(stats.withAvailableSpots).toBe(2);
      expect(stats.totalCapacity).toBe(350);
      expect(stats.totalRegistered).toBe(305);
      expect(stats.typeDistribution).toEqual({
        workshop: 1,
        hackathon: 1,
        conference: 1
      });
    });
  });
});