/**
 * News Domain Layer
 * Pure business logic for news/article management
 */

// ============= Value Objects =============

export class NewsId {
  constructor(private readonly value: string) {
    if (!value || value.trim().length === 0) {
      throw new Error('NewsId cannot be empty');
    }
  }

  getValue(): string {
    return this.value;
  }

  equals(other: NewsId): boolean {
    return this.value === other.value;
  }
}

export class Slug {
  constructor(private readonly value: string) {
    this.validate(value);
  }

  static fromTitle(title: string): Slug {
    const slug = title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
    return new Slug(slug);
  }

  getValue(): string {
    return this.value;
  }

  equals(other: Slug): boolean {
    return this.value === other.value;
  }

  private validate(value: string): void {
    if (!value || value.trim().length === 0) {
      throw new Error('Slug cannot be empty');
    }
    if (value.length > 100) {
      throw new Error('Slug cannot exceed 100 characters');
    }
    const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
    if (!slugRegex.test(value)) {
      throw new Error('Slug must contain only lowercase letters, numbers, and hyphens');
    }
  }
}

export class NewsCategory {
  static readonly VALID_CATEGORIES = [
    'announcement',
    'release',
    'event',
    'community',
    'tutorial',
    'update'
  ] as const;

  constructor(private readonly value: typeof NewsCategory.VALID_CATEGORIES[number]) {
    if (!NewsCategory.VALID_CATEGORIES.includes(value)) {
      throw new Error(`Invalid news category: ${value}`);
    }
  }

  getValue(): string {
    return this.value;
  }

  getDisplayName(): string {
    const displayNames: Record<string, string> = {
      announcement: 'Announcement',
      release: 'Release',
      event: 'Event',
      community: 'Community',
      tutorial: 'Tutorial',
      update: 'Update'
    };
    return displayNames[this.value]!;
  }

  getColor(): string {
    const colors: Record<string, string> = {
      announcement: 'bg-blue-500/10 text-blue-700 border-blue-500/20',
      release: 'bg-green-500/10 text-green-700 border-green-500/20',
      event: 'bg-purple-500/10 text-purple-700 border-purple-500/20',
      community: 'bg-orange-500/10 text-orange-700 border-orange-500/20',
      tutorial: 'bg-yellow-500/10 text-yellow-700 border-yellow-500/20',
      update: 'bg-gray-500/10 text-gray-700 border-gray-500/20'
    };
    return colors[this.value]!;
  }

  equals(other: NewsCategory): boolean {
    return this.value === other.value;
  }
}

export class AuthorId {
  constructor(private readonly value: string) {
    if (!value || value.trim().length === 0) {
      throw new Error('AuthorId cannot be empty');
    }
  }

  getValue(): string {
    return this.value;
  }

  equals(other: AuthorId): boolean {
    return this.value === other.value;
  }
}

export class PublishedDate {
  constructor(private readonly value: Date) {
    if (!(value instanceof Date) || isNaN(value.getTime())) {
      throw new Error('PublishedDate must be a valid Date');
    }
  }

  getValue(): Date {
    return new Date(this.value);
  }

  isInFuture(): boolean {
    return this.value > new Date();
  }

  isToday(): boolean {
    const today = new Date();
    return this.value.toDateString() === today.toDateString();
  }

  getTimeAgo(): string {
    const now = new Date();
    const diffMs = now.getTime() - this.value.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  }

  formatDate(locale: string = 'en-US'): string {
    return this.value.toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  equals(other: PublishedDate): boolean {
    return this.value.getTime() === other.value.getTime();
  }
}

export class ReadingTime {
  constructor(private readonly minutes: number) {
    if (minutes < 0) {
      throw new Error('Reading time cannot be negative');
    }
  }

  static calculateFromContent(content: string): ReadingTime {
    const wordsPerMinute = 200; // Average reading speed
    const words = content.trim().split(/\s+/).length;
    const minutes = Math.max(1, Math.ceil(words / wordsPerMinute));
    return new ReadingTime(minutes);
  }

  getMinutes(): number {
    return this.minutes;
  }

  getDisplayText(): string {
    if (this.minutes === 1) return '1 min read';
    return `${this.minutes} min read`;
  }

  equals(other: ReadingTime): boolean {
    return this.minutes === other.minutes;
  }
}

// ============= Entity =============

export interface NewsArticleData {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: typeof NewsCategory.VALID_CATEGORIES[number];
  authorId: string;
  authorName: string;
  tags: string[];
  isPublished: boolean;
  isFeatured: boolean;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export class NewsArticle {
  private readonly id: NewsId;
  private readonly slug: Slug;
  private readonly category: NewsCategory;
  private readonly authorId: AuthorId;
  private readonly publishedDate?: PublishedDate;
  private readonly readingTime: ReadingTime;

  constructor(private readonly data: NewsArticleData) {
    this.id = new NewsId(data.id);
    this.slug = new Slug(data.slug);
    this.category = new NewsCategory(data.category);
    this.authorId = new AuthorId(data.authorId);

    if (data.publishedAt) {
      this.publishedDate = new PublishedDate(data.publishedAt);
    }

    this.readingTime = ReadingTime.calculateFromContent(data.content);

    this.validateTitle(data.title);
    this.validateExcerpt(data.excerpt);
    this.validateContent(data.content);
  }

  private validateTitle(title: string): void {
    if (!title || title.trim().length === 0) {
      throw new Error('News title cannot be empty');
    }
    if (title.length > 200) {
      throw new Error('News title cannot exceed 200 characters');
    }
  }

  private validateExcerpt(excerpt: string): void {
    if (!excerpt || excerpt.trim().length === 0) {
      throw new Error('News excerpt cannot be empty');
    }
    if (excerpt.length > 500) {
      throw new Error('News excerpt cannot exceed 500 characters');
    }
  }

  private validateContent(content: string): void {
    if (!content || content.trim().length === 0) {
      throw new Error('News content cannot be empty');
    }
    if (content.length > 50000) {
      throw new Error('News content cannot exceed 50000 characters');
    }
  }

  getId(): NewsId {
    return this.id;
  }

  getTitle(): string {
    return this.data.title;
  }

  getSlug(): Slug {
    return this.slug;
  }

  getExcerpt(): string {
    return this.data.excerpt;
  }

  getContent(): string {
    return this.data.content;
  }

  getCategory(): NewsCategory {
    return this.category;
  }

  getAuthorId(): AuthorId {
    return this.authorId;
  }

  getAuthorName(): string {
    return this.data.authorName;
  }

  getTags(): string[] {
    return [...this.data.tags];
  }

  getReadingTime(): ReadingTime {
    return this.readingTime;
  }

  isPublished(): boolean {
    return this.data.isPublished;
  }

  isFeatured(): boolean {
    return this.data.isFeatured;
  }

  isDraft(): boolean {
    return !this.data.isPublished;
  }

  getPublishedDate(): PublishedDate | undefined {
    return this.publishedDate;
  }

  hasTag(tag: string): boolean {
    return this.data.tags.includes(tag.toLowerCase());
  }

  matchesSearch(query: string): boolean {
    const lowerQuery = query.toLowerCase();
    return (
      this.data.title.toLowerCase().includes(lowerQuery) ||
      this.data.excerpt.toLowerCase().includes(lowerQuery) ||
      this.data.content.toLowerCase().includes(lowerQuery) ||
      this.data.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
  }

  isRecent(daysThreshold: number = 7): boolean {
    if (!this.publishedDate) return false;
    const now = new Date();
    const diffMs = now.getTime() - this.publishedDate.getValue().getTime();
    const diffDays = diffMs / (1000 * 60 * 60 * 24);
    return diffDays <= daysThreshold;
  }

  toData(): NewsArticleData {
    return { ...this.data };
  }
}

// ============= Domain Services =============

export const NewsService = {
  /**
   * Filter news articles based on criteria
   */
  filterNews(
    articles: NewsArticle[],
    criteria: {
      category?: string;
      authorId?: string;
      tags?: string[];
      isPublished?: boolean;
      isFeatured?: boolean;
    }
  ): NewsArticle[] {
    return articles.filter(article => {
      // Published filter
      if (criteria.isPublished !== undefined && article.isPublished() !== criteria.isPublished) {
        return false;
      }

      // Featured filter
      if (criteria.isFeatured !== undefined && article.isFeatured() !== criteria.isFeatured) {
        return false;
      }

      // Category filter
      if (criteria.category && criteria.category !== 'all') {
        if (article.getCategory().getValue() !== criteria.category) {
          return false;
        }
      }

      // Author filter
      if (criteria.authorId) {
        if (article.getAuthorId().getValue() !== criteria.authorId) {
          return false;
        }
      }

      // Tags filter
      if (criteria.tags && criteria.tags.length > 0) {
        const hasMatchingTag = criteria.tags.some(tag => article.hasTag(tag));
        if (!hasMatchingTag) {
          return false;
        }
      }

      return true;
    });
  },

  /**
   * Search news articles by query
   */
  searchNews(articles: NewsArticle[], query: string): NewsArticle[] {
    if (!query || query.trim().length === 0) {
      return articles;
    }

    return articles.filter(article => article.matchesSearch(query));
  },

  /**
   * Sort news articles by different criteria
   */
  sortNews(
    articles: NewsArticle[],
    sortBy: 'title' | 'publishedAt' | 'createdAt' | 'readingTime' = 'publishedAt',
    order: 'asc' | 'desc' = 'desc'
  ): NewsArticle[] {
    const sorted = [...articles].sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case 'title':
          comparison = a.getTitle().localeCompare(b.getTitle());
          break;
        case 'publishedAt': {
          const aPublished = a.getPublishedDate()?.getValue().getTime() || 0;
          const bPublished = b.getPublishedDate()?.getValue().getTime() || 0;
          comparison = aPublished - bPublished;
          break;
        }
        case 'createdAt':
          comparison = a.toData().createdAt.getTime() - b.toData().createdAt.getTime();
          break;
        case 'readingTime':
          comparison = a.getReadingTime().getMinutes() - b.getReadingTime().getMinutes();
          break;
      }

      return order === 'desc' ? -comparison : comparison;
    });

    return sorted;
  },

  /**
   * Get featured news articles
   */
  getFeaturedNews(articles: NewsArticle[], limit: number = 3): NewsArticle[] {
    return this.filterNews(articles, { isPublished: true, isFeatured: true })
      .slice(0, limit);
  },

  /**
   * Get recent news articles
   */
  getRecentNews(articles: NewsArticle[], limit: number = 5): NewsArticle[] {
    return this.sortNews(
      this.filterNews(articles, { isPublished: true }),
      'publishedAt',
      'desc'
    ).slice(0, limit);
  },

  /**
   * Get news by category
   */
  getNewsByCategory(articles: NewsArticle[], category: string): NewsArticle[] {
    return this.filterNews(articles, { category, isPublished: true });
  },

  /**
   * Get popular tags
   */
  getPopularTags(articles: NewsArticle[], limit: number = 10): { tag: string; count: number }[] {
    const tagCounts = new Map<string, number>();

    articles
      .filter(article => article.isPublished())
      .forEach(article => {
        article.getTags().forEach(tag => {
          tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
        });
      });

    return Array.from(tagCounts.entries())
      .map(([tag, count]) => ({ tag, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, limit);
  },

  /**
   * Get news statistics
   */
  getNewsStats(articles: NewsArticle[]) {
    const published = articles.filter(a => a.isPublished());
    const drafts = articles.filter(a => a.isDraft());
    const featured = articles.filter(a => a.isFeatured());
    const recent = articles.filter(a => a.isRecent());

    const categoryDistribution = published.reduce((acc, article) => {
      const category = article.getCategory().getValue();
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      total: articles.length,
      published: published.length,
      drafts: drafts.length,
      featured: featured.length,
      recent: recent.length,
      categoryDistribution
    };
  }
};