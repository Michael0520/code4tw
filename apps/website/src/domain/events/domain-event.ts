export interface DomainEvent {
  readonly eventId: string;
  readonly eventType: string;
  readonly aggregateId: string;
  readonly aggregateType: string;
  readonly eventVersion: number;
  readonly occurredOn: Date;
  readonly eventData: Record<string, unknown>;
}

export abstract class BaseDomainEvent implements DomainEvent {
  public readonly eventId: string;
  public readonly eventVersion: number = 1;
  public readonly occurredOn: Date;

  constructor(
    public readonly eventType: string,
    public readonly aggregateId: string,
    public readonly aggregateType: string,
    public readonly eventData: Record<string, unknown>
  ) {
    this.eventId = this.generateEventId();
    this.occurredOn = new Date();
  }

  private generateEventId(): string {
    return `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
  }
}