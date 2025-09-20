export class DateRange {
  private constructor(
    private readonly startDate: Date,
    private readonly endDate: Date
  ) {
    this.validate(startDate, endDate);
  }

  public static create(startDate: Date, endDate: Date): DateRange {
    return new DateRange(startDate, endDate);
  }

  public static singleDay(date: Date): DateRange {
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);

    const end = new Date(date);
    end.setHours(23, 59, 59, 999);

    return new DateRange(start, end);
  }

  public static fromDuration(startDate: Date, durationHours: number): DateRange {
    const endDate = new Date(startDate.getTime() + durationHours * 60 * 60 * 1000);
    return new DateRange(startDate, endDate);
  }

  public getStartDate(): Date {
    return new Date(this.startDate);
  }

  public getEndDate(): Date {
    return new Date(this.endDate);
  }

  public getDurationInHours(): number {
    return (this.endDate.getTime() - this.startDate.getTime()) / (1000 * 60 * 60);
  }

  public getDurationInDays(): number {
    return this.getDurationInHours() / 24;
  }

  public isInFuture(): boolean {
    const now = new Date();
    return this.startDate > now;
  }

  public isInPast(): boolean {
    const now = new Date();
    return this.endDate < now;
  }

  public isOngoing(): boolean {
    const now = new Date();
    return this.startDate <= now && now <= this.endDate;
  }

  public isSingleDay(): boolean {
    return this.startDate.toDateString() === this.endDate.toDateString();
  }

  public contains(date: Date): boolean {
    return this.startDate <= date && date <= this.endDate;
  }

  public overlaps(other: DateRange): boolean {
    return this.startDate <= other.endDate && other.startDate <= this.endDate;
  }

  public getTimeUntilStart(): number {
    const now = new Date();
    return Math.max(0, this.startDate.getTime() - now.getTime());
  }

  public getTimeSinceEnd(): number {
    const now = new Date();
    return Math.max(0, now.getTime() - this.endDate.getTime());
  }

  public extend(hours: number): DateRange {
    const newEndDate = new Date(this.endDate.getTime() + hours * 60 * 60 * 1000);
    return new DateRange(this.startDate, newEndDate);
  }

  public shift(hours: number): DateRange {
    const shiftMs = hours * 60 * 60 * 1000;
    return new DateRange(
      new Date(this.startDate.getTime() + shiftMs),
      new Date(this.endDate.getTime() + shiftMs)
    );
  }

  public formatRange(locale: string = 'en-US'): string {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };

    const start = this.startDate.toLocaleDateString(locale, options);
    const end = this.endDate.toLocaleDateString(locale, options);

    if (this.isSingleDay()) {
      const dateOptions: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      };
      const timeOptions: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit'
      };

      const date = this.startDate.toLocaleDateString(locale, dateOptions);
      const startTime = this.startDate.toLocaleTimeString(locale, timeOptions);
      const endTime = this.endDate.toLocaleTimeString(locale, timeOptions);

      return `${date}, ${startTime} - ${endTime}`;
    }

    return `${start} - ${end}`;
  }

  public equals(other: DateRange): boolean {
    return (
      this.startDate.getTime() === other.startDate.getTime() &&
      this.endDate.getTime() === other.endDate.getTime()
    );
  }

  public toPersistence(): { startDate: Date; endDate: Date } {
    return {
      startDate: new Date(this.startDate),
      endDate: new Date(this.endDate)
    };
  }

  private validate(startDate: Date, endDate: Date): void {
    if (!(startDate instanceof Date) || isNaN(startDate.getTime())) {
      throw new Error('Start date must be a valid Date');
    }

    if (!(endDate instanceof Date) || isNaN(endDate.getTime())) {
      throw new Error('End date must be a valid Date');
    }

    if (startDate >= endDate) {
      throw new Error('Start date must be before end date');
    }

    const maxDurationHours = 24 * 365; // 1 year
    if (this.getDurationInHours() > maxDurationHours) {
      throw new Error('Date range cannot exceed 1 year');
    }
  }
}