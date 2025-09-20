export type EventTypeValue = 'workshop' | 'hackathon' | 'meetup' | 'conference';

export class EventType {
  private constructor(private readonly value: EventTypeValue) {}

  public static create(value: EventTypeValue): EventType {
    return new EventType(value);
  }

  public static workshop(): EventType {
    return new EventType('workshop');
  }

  public static hackathon(): EventType {
    return new EventType('hackathon');
  }

  public static meetup(): EventType {
    return new EventType('meetup');
  }

  public static conference(): EventType {
    return new EventType('conference');
  }

  public getValue(): EventTypeValue {
    return this.value;
  }

  public isWorkshop(): boolean {
    return this.value === 'workshop';
  }

  public isHackathon(): boolean {
    return this.value === 'hackathon';
  }

  public isMeetup(): boolean {
    return this.value === 'meetup';
  }

  public isConference(): boolean {
    return this.value === 'conference';
  }

  public getDisplayName(): string {
    const displayNames: Record<EventTypeValue, string> = {
      workshop: 'Workshop',
      hackathon: 'Hackathon',
      meetup: 'Meetup',
      conference: 'Conference'
    };

    return displayNames[this.value];
  }

  public getTypicalDurationHours(): number {
    const durations: Record<EventTypeValue, number> = {
      workshop: 4,
      hackathon: 48,
      meetup: 2,
      conference: 8
    };

    return durations[this.value];
  }

  public equals(other: EventType): boolean {
    return this.value === other.value;
  }

  public toString(): string {
    return this.value;
  }
}