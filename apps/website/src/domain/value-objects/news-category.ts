export type NewsCategoryType = 'announcement' | 'release' | 'event' | 'community';

export class NewsCategory {
  private constructor(private readonly value: NewsCategoryType) {}

  public static create(value: NewsCategoryType): NewsCategory {
    return new NewsCategory(value);
  }

  public static announcement(): NewsCategory {
    return new NewsCategory('announcement');
  }

  public static release(): NewsCategory {
    return new NewsCategory('release');
  }

  public static event(): NewsCategory {
    return new NewsCategory('event');
  }

  public static community(): NewsCategory {
    return new NewsCategory('community');
  }

  public getValue(): NewsCategoryType {
    return this.value;
  }

  public isAnnouncement(): boolean {
    return this.value === 'announcement';
  }

  public isRelease(): boolean {
    return this.value === 'release';
  }

  public isEvent(): boolean {
    return this.value === 'event';
  }

  public isCommunity(): boolean {
    return this.value === 'community';
  }

  public getDisplayName(): string {
    const displayNames: Record<NewsCategoryType, string> = {
      announcement: 'Announcement',
      release: 'Release',
      event: 'Event',
      community: 'Community'
    };

    return displayNames[this.value];
  }

  public equals(other: NewsCategory): boolean {
    return this.value === other.value;
  }

  public toString(): string {
    return this.value;
  }
}