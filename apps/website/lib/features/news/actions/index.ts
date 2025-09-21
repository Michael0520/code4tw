/**
 * News Server Actions
 * Use cases and data fetching logic
 */

'use server';

import { NewsArticle, NewsService } from '@/lib/features/news/domain';
import { NEWS_CONFIG, STATIC_NEWS_DATA } from '@/lib/features/news/config';

// ============= Types =============

export interface NewsFilters {
  category?: string;
  authorId?: string;
  tags?: string[];
  searchQuery?: string;
  sortBy?: 'title' | 'publishedAt' | 'createdAt' | 'readingTime';
  sortOrder?: 'asc' | 'desc';
  isPublished?: boolean;
  isFeatured?: boolean;
}

export interface NewsDto {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  categoryDisplay: string;
  categoryColor: string;
  authorId: string;
  authorName: string;
  tags: string[];
  readingTime: string;
  isPublished: boolean;
  isFeatured: boolean;
  publishedAt?: string;
  publishedTimeAgo?: string;
  createdAt: string;
  updatedAt: string;
}

export interface NewsResponse {
  articles: NewsDto[];
  total: number;
  stats: {
    total: number;
    published: number;
    drafts: number;
    featured: number;
    recent: number;
    categoryDistribution: Record<string, number>;
  };
}

// ============= Server Actions =============

/**
 * Get all news articles with optional filters
 */
export async function getNews(filters?: NewsFilters): Promise<NewsResponse> {
  try {
    // TODO: Replace with actual database/API call
    const newsData = STATIC_NEWS_DATA;

    // Create domain entities
    const articles = newsData.map(data => new NewsArticle(data));

    // Apply filters using domain service
    let filteredArticles = articles;

    // Default to published articles only for public view
    const effectiveFilters = {
      ...filters,
      isPublished: filters?.isPublished ?? true
    };

    if (effectiveFilters) {
      filteredArticles = NewsService.filterNews(filteredArticles, {
        category: effectiveFilters.category,
        authorId: effectiveFilters.authorId,
        tags: effectiveFilters.tags,
        isPublished: effectiveFilters.isPublished,
        isFeatured: effectiveFilters.isFeatured
      });

      // Search
      if (effectiveFilters.searchQuery) {
        filteredArticles = NewsService.searchNews(
          filteredArticles,
          effectiveFilters.searchQuery
        );
      }

      // Sort
      const sortBy = effectiveFilters.sortBy || 'publishedAt';
      const sortOrder = effectiveFilters.sortOrder || 'desc';
      filteredArticles = NewsService.sortNews(
        filteredArticles,
        sortBy,
        sortOrder
      );
    }

    // Get statistics
    const stats = NewsService.getNewsStats(articles);

    // Convert to DTOs
    const articleDtos = filteredArticles.map(articleToDto);

    return {
      articles: articleDtos,
      total: filteredArticles.length,
      stats
    };
  } catch (error) {
    console.error('Failed to get news:', error);
    throw new Error('Failed to load news articles');
  }
}

/**
 * Get featured news articles
 */
export async function getFeaturedNews(limit?: number): Promise<NewsDto[]> {
  try {
    const newsData = STATIC_NEWS_DATA;
    const articles = newsData.map(data => new NewsArticle(data));

    const featured = NewsService.getFeaturedNews(
      articles,
      limit || NEWS_CONFIG.display.featuredCount
    );

    return featured.map(articleToDto);
  } catch (error) {
    console.error('Failed to get featured news:', error);
    throw new Error('Failed to load featured articles');
  }
}

/**
 * Get recent news articles
 */
export async function getRecentNews(limit?: number): Promise<NewsDto[]> {
  try {
    const newsData = STATIC_NEWS_DATA;
    const articles = newsData.map(data => new NewsArticle(data));

    const recent = NewsService.getRecentNews(
      articles,
      limit || NEWS_CONFIG.display.recentCount
    );

    return recent.map(articleToDto);
  } catch (error) {
    console.error('Failed to get recent news:', error);
    throw new Error('Failed to load recent articles');
  }
}

/**
 * Get a single news article by ID
 */
export async function getNewsById(id: string): Promise<NewsDto | null> {
  try {
    const newsData = STATIC_NEWS_DATA.find(article => article.id === id);

    if (!newsData) {
      return null;
    }

    const article = new NewsArticle(newsData);
    return articleToDto(article);
  } catch (error) {
    console.error('Failed to get news article:', error);
    throw new Error('Failed to load article');
  }
}

/**
 * Get a single news article by slug
 */
export async function getNewsBySlug(slug: string): Promise<NewsDto | null> {
  try {
    const newsData = STATIC_NEWS_DATA.find(article => article.slug === slug);

    if (!newsData) {
      return null;
    }

    const article = new NewsArticle(newsData);
    return articleToDto(article);
  } catch (error) {
    console.error('Failed to get news article by slug:', error);
    throw new Error('Failed to load article');
  }
}

/**
 * Search news articles by query
 */
export async function searchNews(query: string): Promise<NewsDto[]> {
  try {
    if (query.length < NEWS_CONFIG.search.minQueryLength) {
      return [];
    }

    const newsData = STATIC_NEWS_DATA;
    const articles = newsData.map(data => new NewsArticle(data));

    // Only search published articles
    const publishedArticles = NewsService.filterNews(articles, { isPublished: true });
    const searchResults = NewsService.searchNews(publishedArticles, query);

    return searchResults.map(articleToDto);
  } catch (error) {
    console.error('Failed to search news:', error);
    throw new Error('Failed to search articles');
  }
}

/**
 * Get news articles by category
 */
export async function getNewsByCategory(category: string): Promise<NewsDto[]> {
  try {
    const newsData = STATIC_NEWS_DATA;
    const articles = newsData.map(data => new NewsArticle(data));

    const filtered = NewsService.getNewsByCategory(articles, category);

    return filtered.map(articleToDto);
  } catch (error) {
    console.error('Failed to get news by category:', error);
    throw new Error('Failed to load articles');
  }
}

/**
 * Get popular tags
 */
export async function getPopularTags(limit?: number): Promise<{ tag: string; count: number }[]> {
  try {
    const newsData = STATIC_NEWS_DATA;
    const articles = newsData.map(data => new NewsArticle(data));

    return NewsService.getPopularTags(articles, limit);
  } catch (error) {
    console.error('Failed to get popular tags:', error);
    throw new Error('Failed to load tags');
  }
}

/**
 * Get news statistics
 */
export async function getNewsStats() {
  try {
    const newsData = STATIC_NEWS_DATA;
    const articles = newsData.map(data => new NewsArticle(data));

    return NewsService.getNewsStats(articles);
  } catch (error) {
    console.error('Failed to get news stats:', error);
    throw new Error('Failed to load statistics');
  }
}

// ============= Helper Functions =============

/**
 * Convert NewsArticle entity to DTO
 */
function articleToDto(article: NewsArticle): NewsDto {
  const data = article.toData();
  const publishedDate = article.getPublishedDate();

  return {
    id: data.id,
    title: data.title,
    slug: data.slug,
    excerpt: data.excerpt,
    content: data.content,
    category: article.getCategory().getValue(),
    categoryDisplay: article.getCategory().getDisplayName(),
    categoryColor: article.getCategory().getColor(),
    authorId: data.authorId,
    authorName: data.authorName,
    tags: data.tags,
    readingTime: article.getReadingTime().getDisplayText(),
    isPublished: data.isPublished,
    isFeatured: data.isFeatured,
    publishedAt: publishedDate?.getValue().toISOString(),
    publishedTimeAgo: publishedDate?.getTimeAgo(),
    createdAt: data.createdAt.toISOString(),
    updatedAt: data.updatedAt.toISOString()
  };
}

// Validation functions moved to utils.ts to avoid server action conflicts