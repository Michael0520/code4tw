import { News } from '../../domain/entities/news';
import { NewsId } from '../../domain/value-objects/news-id';
import { NewsCategory } from '../../domain/value-objects/news-category';
import { AuthorId } from '../../domain/value-objects/author-id';
import { Slug } from '../../domain/value-objects/slug';

export interface NewsFilters {
  readonly category?: NewsCategory;
  readonly authorId?: AuthorId;
  readonly tags?: readonly string[];
  readonly isPublished?: boolean;
  readonly searchQuery?: string;
  readonly publishedAfter?: Date;
  readonly publishedBefore?: Date;
}

export interface NewsSortOptions {
  readonly field: 'title' | 'createdAt' | 'updatedAt' | 'publishedAt';
  readonly direction: 'asc' | 'desc';
}

export interface NewsQueryResult {
  readonly news: readonly News[];
  readonly total: number;
  readonly page: number;
  readonly totalPages: number;
}

export interface NewsRepository {
  findById(id: NewsId): Promise<News | null>;
  findBySlug(slug: Slug): Promise<News | null>;
  findAll(
    filters?: NewsFilters,
    sort?: NewsSortOptions,
    pagination?: PaginationOptions
  ): Promise<NewsQueryResult>;
  findPublished(
    filters?: Omit<NewsFilters, 'isPublished'>,
    sort?: NewsSortOptions,
    pagination?: PaginationOptions
  ): Promise<NewsQueryResult>;
  findDrafts(authorId?: AuthorId): Promise<readonly News[]>;
  findRecent(limit?: number): Promise<readonly News[]>;
  findByCategory(category: NewsCategory): Promise<readonly News[]>;
  findByAuthor(authorId: AuthorId): Promise<readonly News[]>;
  save(news: News): Promise<void>;
  delete(id: NewsId): Promise<void>;
  exists(id: NewsId): Promise<boolean>;
  slugExists(slug: Slug): Promise<boolean>;
  countByCategory(category: NewsCategory): Promise<number>;
  getPopularTags(limit?: number): Promise<readonly string[]>;
}

export interface PaginationOptions {
  readonly page: number;
  readonly limit: number;
}