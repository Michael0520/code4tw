import { Event } from '../../domain/entities/event';
import { EventRepository } from '../repositories/event-repository';

export interface GetUpcomingEventsRequest {
  readonly limit?: number;
}

export interface GetUpcomingEventsResponse {
  readonly events: readonly EventDto[];
}

export interface EventDto {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly type: string;
  readonly startDate: string;
  readonly endDate: string;
  readonly location: LocationDto;
  readonly maxParticipants?: number;
  readonly currentParticipants: number;
  readonly availableSpots?: number;
  readonly registrationUrl?: string;
  readonly isRegistrationOpen: boolean;
  readonly tags: readonly string[];
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface LocationDto {
  readonly name: string;
  readonly address?: string;
  readonly city: string;
  readonly country: string;
  readonly isOnline: boolean;
  readonly fullAddress: string;
}

export class GetUpcomingEvents {
  constructor(private readonly eventRepository: EventRepository) {}

  public async execute(request: GetUpcomingEventsRequest): Promise<GetUpcomingEventsResponse> {
    const events = await this.eventRepository.findUpcoming(request.limit);

    return {
      events: events.map(event => this.mapToDto(event)),
    };
  }

  private mapToDto(event: Event): EventDto {
    const location = event.getLocation();
    const dateRange = event.getDateRange();

    return {
      id: event.getId().getValue(),
      title: event.getTitle(),
      description: event.getDescription(),
      type: event.getType().getValue(),
      startDate: dateRange.getStartDate().toISOString(),
      endDate: dateRange.getEndDate().toISOString(),
      location: {
        name: location.getName(),
        address: location.getAddress(),
        city: location.getCity(),
        country: location.getCountry(),
        isOnline: location.isOnline(),
        fullAddress: location.getFullAddress(),
      },
      maxParticipants: event.getMaxParticipants(),
      currentParticipants: event.getCurrentParticipants(),
      availableSpots: event.getAvailableSpots(),
      registrationUrl: event.getRegistrationUrl(),
      isRegistrationOpen: event.isRegistrationOpen(),
      tags: event.getTags(),
      createdAt: event.getCreatedAt().toISOString(),
      updatedAt: event.getUpdatedAt().toISOString(),
    };
  }
}