/**
 * News Domain Tests
 * Comprehensive test coverage for news business logic
 */

import { describe, it, expect } from 'vitest';
import {
  NewsId,
  Slug,
  NewsCategory,
  AuthorId,
  PublishedDate,
  ReadingTime,
  NewsArticle,
  NewsService,
  type NewsArticleData
} from '@/lib/features/news/domain';

describe('NewsId Value Object', () => {
  it('should create valid NewsId', () => {
    // Arrange
    const validId = 'news-123';

    // Act
    const newsId = new NewsId(validId);

    // Assert
    expect(newsId.getValue()).toBe(validId);
  });

  it('should throw error for empty NewsId', () => {
    // Arrange
    const emptyId = '';

    // Act & Assert
    expect(() => new NewsId(emptyId)).toThrow('NewsId cannot be empty');
  });

  it('should throw error for whitespace-only NewsId', () => {
    // Arrange
    const whitespaceId = '   ';

    // Act & Assert
    expect(() => new NewsId(whitespaceId)).toThrow('NewsId cannot be empty');
  });

  it('should compare NewsIds correctly', () => {
    // Arrange
    const id1 = new NewsId('test-1');
    const id2 = new NewsId('test-1');
    const id3 = new NewsId('test-2');

    // Act & Assert
    expect(id1.equals(id2)).toBe(true);
    expect(id1.equals(id3)).toBe(false);
  });
});

describe('Slug Value Object', () => {
  it('should create valid slug', () => {
    // Arrange
    const validSlug = 'news-article-slug';

    // Act
    const slug = new Slug(validSlug);

    // Assert
    expect(slug.getValue()).toBe(validSlug);
  });

  it('should create slug from title', () => {
    // Arrange
    const title = 'This is a News Article Title!';

    // Act
    const slug = Slug.fromTitle(title);

    // Assert
    expect(slug.getValue()).toBe('this-is-a-news-article-title');
  });

  it('should handle complex title characters', () => {
    // Arrange
    const title = 'Test @#$% Title & More   Spaces';

    // Act
    const slug = Slug.fromTitle(title);

    // Assert
    expect(slug.getValue()).toBe('test-title-more-spaces');
  });

  it('should throw error for empty slug', () => {
    // Arrange
    const emptySlug = '';

    // Act & Assert
    expect(() => new Slug(emptySlug)).toThrow('Slug cannot be empty');
  });

  it('should throw error for slug exceeding 100 characters', () => {
    // Arrange
    const longSlug = 'a'.repeat(101);

    // Act & Assert
    expect(() => new Slug(longSlug)).toThrow('Slug cannot exceed 100 characters');
  });

  it('should throw error for invalid slug format', () => {
    // Arrange
    const invalidSlug = 'Invalid Slug!';

    // Act & Assert
    expect(() => new Slug(invalidSlug)).toThrow('Slug must contain only lowercase letters, numbers, and hyphens');
  });

  it('should compare slugs correctly', () => {
    // Arrange
    const slug1 = new Slug('test-slug');
    const slug2 = new Slug('test-slug');
    const slug3 = new Slug('different-slug');

    // Act & Assert
    expect(slug1.equals(slug2)).toBe(true);
    expect(slug1.equals(slug3)).toBe(false);
  });
});

describe('NewsCategory Value Object', () => {
  it('should create valid news category', () => {
    // Arrange
    const category = 'announcement';

    // Act
    const newsCategory = new NewsCategory(category);

    // Assert
    expect(newsCategory.getValue()).toBe(category);
  });

  it('should throw error for invalid category', () => {
    // Arrange
    const invalidCategory = 'invalid-category' as any;

    // Act & Assert
    expect(() => new NewsCategory(invalidCategory)).toThrow('Invalid news category: invalid-category');
  });

  it('should return correct display name', () => {
    // Arrange
    const category = new NewsCategory('announcement');

    // Act
    const displayName = category.getDisplayName();

    // Assert
    expect(displayName).toBe('Announcement');
  });

  it('should return correct color classes', () => {
    // Arrange
    const category = new NewsCategory('event');

    // Act
    const color = category.getColor();

    // Assert
    expect(color).toBe('bg-purple-500/10 text-purple-700 border-purple-500/20');
  });

  it('should compare categories correctly', () => {
    // Arrange
    const cat1 = new NewsCategory('release');
    const cat2 = new NewsCategory('release');
    const cat3 = new NewsCategory('event');

    // Act & Assert
    expect(cat1.equals(cat2)).toBe(true);
    expect(cat1.equals(cat3)).toBe(false);
  });
});

describe('AuthorId Value Object', () => {
  it('should create valid AuthorId', () => {
    // Arrange
    const validId = 'author-123';

    // Act
    const authorId = new AuthorId(validId);

    // Assert
    expect(authorId.getValue()).toBe(validId);
  });

  it('should throw error for empty AuthorId', () => {
    // Arrange
    const emptyId = '';

    // Act & Assert
    expect(() => new AuthorId(emptyId)).toThrow('AuthorId cannot be empty');
  });

  it('should compare AuthorIds correctly', () => {
    // Arrange
    const id1 = new AuthorId('author-1');
    const id2 = new AuthorId('author-1');
    const id3 = new AuthorId('author-2');

    // Act & Assert
    expect(id1.equals(id2)).toBe(true);
    expect(id1.equals(id3)).toBe(false);
  });
});

describe('PublishedDate Value Object', () => {
  it('should create valid PublishedDate', () => {
    // Arrange
    const validDate = new Date('2024-01-15');

    // Act
    const publishedDate = new PublishedDate(validDate);

    // Assert
    expect(publishedDate.getValue()).toEqual(validDate);
  });

  it('should throw error for invalid date', () => {
    // Arrange
    const invalidDate = new Date('invalid');

    // Act & Assert
    expect(() => new PublishedDate(invalidDate)).toThrow('PublishedDate must be a valid Date');
  });

  it('should detect future dates', () => {
    // Arrange
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 1);
    const publishedDate = new PublishedDate(futureDate);

    // Act
    const isFuture = publishedDate.isInFuture();

    // Assert
    expect(isFuture).toBe(true);
  });

  it('should detect today date', () => {
    // Arrange
    const today = new Date();
    const publishedDate = new PublishedDate(today);

    // Act
    const isToday = publishedDate.isToday();

    // Assert
    expect(isToday).toBe(true);
  });

  it('should return correct time ago for recent date', () => {
    // Arrange
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const publishedDate = new PublishedDate(yesterday);

    // Act
    const timeAgo = publishedDate.getTimeAgo();

    // Assert
    expect(timeAgo).toBe('Yesterday');
  });

  it('should format date correctly', () => {
    // Arrange
    const date = new Date('2024-01-15');
    const publishedDate = new PublishedDate(date);

    // Act
    const formatted = publishedDate.formatDate('en-US');

    // Assert
    expect(formatted).toBe('January 15, 2024');
  });

  it('should compare dates correctly', () => {
    // Arrange
    const date1 = new PublishedDate(new Date('2024-01-15'));
    const date2 = new PublishedDate(new Date('2024-01-15'));
    const date3 = new PublishedDate(new Date('2024-01-16'));

    // Act & Assert
    expect(date1.equals(date2)).toBe(true);
    expect(date1.equals(date3)).toBe(false);
  });
});

describe('ReadingTime Value Object', () => {
  it('should create valid ReadingTime', () => {
    // Arrange
    const minutes = 5;

    // Act
    const readingTime = new ReadingTime(minutes);

    // Assert
    expect(readingTime.getMinutes()).toBe(minutes);
  });

  it('should throw error for negative reading time', () => {
    // Arrange
    const negativeMinutes = -1;

    // Act & Assert
    expect(() => new ReadingTime(negativeMinutes)).toThrow('Reading time cannot be negative');
  });

  it('should calculate reading time from content', () => {
    // Arrange
    const content = 'This is a test content. '.repeat(100); // ~500 words

    // Act
    const readingTime = ReadingTime.calculateFromContent(content);

    // Assert
    expect(readingTime.getMinutes()).toBe(3); // 500 words / 200 wpm = 2.5 -> ceil to 3 minutes
  });

  it('should return minimum 1 minute for short content', () => {
    // Arrange
    const shortContent = 'Short content';

    // Act
    const readingTime = ReadingTime.calculateFromContent(shortContent);

    // Assert
    expect(readingTime.getMinutes()).toBe(1);
  });

  it('should return correct display text for single minute', () => {
    // Arrange
    const readingTime = new ReadingTime(1);

    // Act
    const displayText = readingTime.getDisplayText();

    // Assert
    expect(displayText).toBe('1 min read');
  });

  it('should return correct display text for multiple minutes', () => {
    // Arrange
    const readingTime = new ReadingTime(5);

    // Act
    const displayText = readingTime.getDisplayText();

    // Assert
    expect(displayText).toBe('5 min read');
  });

  it('should compare reading times correctly', () => {
    // Arrange
    const time1 = new ReadingTime(5);
    const time2 = new ReadingTime(5);
    const time3 = new ReadingTime(3);

    // Act & Assert
    expect(time1.equals(time2)).toBe(true);
    expect(time1.equals(time3)).toBe(false);
  });
});

describe('NewsArticle Entity', () => {
  const createValidNewsData = (): NewsArticleData => ({
    id: 'news-1',
    title: 'Test News Article',
    slug: 'test-news-article',
    excerpt: 'This is a test excerpt for the news article.',
    content: 'This is the full content of the test news article. '.repeat(50),
    category: 'announcement',
    authorId: 'author-1',
    authorName: 'Test Author',
    tags: ['test', 'news'],
    isPublished: true,
    isFeatured: false,
    publishedAt: new Date('2024-01-15'),
    createdAt: new Date('2024-01-14'),
    updatedAt: new Date('2024-01-15')
  });

  it('should create valid NewsArticle', () => {
    // Arrange
    const newsData = createValidNewsData();

    // Act
    const article = new NewsArticle(newsData);

    // Assert
    expect(article.getTitle()).toBe(newsData.title);
    expect(article.getExcerpt()).toBe(newsData.excerpt);
    expect(article.isPublished()).toBe(true);
  });

  it('should throw error for empty title', () => {
    // Arrange
    const newsData = createValidNewsData();
    newsData.title = '';

    // Act & Assert
    expect(() => new NewsArticle(newsData)).toThrow('News title cannot be empty');
  });

  it('should throw error for title exceeding 200 characters', () => {
    // Arrange
    const newsData = createValidNewsData();
    newsData.title = 'a'.repeat(201);

    // Act & Assert
    expect(() => new NewsArticle(newsData)).toThrow('News title cannot exceed 200 characters');
  });

  it('should throw error for empty excerpt', () => {
    // Arrange
    const newsData = createValidNewsData();
    newsData.excerpt = '';

    // Act & Assert
    expect(() => new NewsArticle(newsData)).toThrow('News excerpt cannot be empty');
  });

  it('should throw error for excerpt exceeding 500 characters', () => {
    // Arrange
    const newsData = createValidNewsData();
    newsData.excerpt = 'a'.repeat(501);

    // Act & Assert
    expect(() => new NewsArticle(newsData)).toThrow('News excerpt cannot exceed 500 characters');
  });

  it('should throw error for empty content', () => {
    // Arrange
    const newsData = createValidNewsData();
    newsData.content = '';

    // Act & Assert
    expect(() => new NewsArticle(newsData)).toThrow('News content cannot be empty');
  });

  it('should throw error for content exceeding 50000 characters', () => {
    // Arrange
    const newsData = createValidNewsData();
    newsData.content = 'a'.repeat(50001);

    // Act & Assert
    expect(() => new NewsArticle(newsData)).toThrow('News content cannot exceed 50000 characters');
  });

  it('should detect draft articles', () => {
    // Arrange
    const newsData = createValidNewsData();
    newsData.isPublished = false;
    const article = new NewsArticle(newsData);

    // Act
    const isDraft = article.isDraft();

    // Assert
    expect(isDraft).toBe(true);
  });

  it('should detect if article has specific tag', () => {
    // Arrange
    const newsData = createValidNewsData();
    newsData.tags = ['test', 'announcement'];
    const article = new NewsArticle(newsData);

    // Act & Assert
    expect(article.hasTag('test')).toBe(true);
    expect(article.hasTag('nonexistent')).toBe(false);
  });

  it('should match search queries in title', () => {
    // Arrange
    const newsData = createValidNewsData();
    newsData.title = 'Important Government Update';
    const article = new NewsArticle(newsData);

    // Act
    const matches = article.matchesSearch('government');

    // Assert
    expect(matches).toBe(true);
  });

  it('should match search queries in tags', () => {
    // Arrange
    const newsData = createValidNewsData();
    newsData.tags = ['government', 'policy'];
    const article = new NewsArticle(newsData);

    // Act
    const matches = article.matchesSearch('policy');

    // Assert
    expect(matches).toBe(true);
  });

  it('should detect recent articles', () => {
    // Arrange
    const newsData = createValidNewsData();
    const today = new Date();
    today.setDate(today.getDate() - 3); // 3 days ago
    newsData.publishedAt = today;
    const article = new NewsArticle(newsData);

    // Act
    const isRecent = article.isRecent(7);

    // Assert
    expect(isRecent).toBe(true);
  });

  it('should return correct data when calling toData', () => {
    // Arrange
    const newsData = createValidNewsData();
    const article = new NewsArticle(newsData);

    // Act
    const data = article.toData();

    // Assert
    expect(data).toEqual(newsData);
  });
});

describe('NewsService', () => {
  const createTestArticles = (): NewsArticle[] => {
    const articles: NewsArticleData[] = [
      {
        id: 'news-1',
        title: 'Announcement Article',
        slug: 'announcement-article',
        excerpt: 'This is an announcement.',
        content: 'Content of announcement. '.repeat(50),
        category: 'announcement',
        authorId: 'author-1',
        authorName: 'Author One',
        tags: ['announcement', 'important'],
        isPublished: true,
        isFeatured: true,
        publishedAt: new Date('2024-01-15'),
        createdAt: new Date('2024-01-14'),
        updatedAt: new Date('2024-01-15')
      },
      {
        id: 'news-2',
        title: 'Release Update',
        slug: 'release-update',
        excerpt: 'New release is available.',
        content: 'Content of release. '.repeat(30),
        category: 'release',
        authorId: 'author-2',
        authorName: 'Author Two',
        tags: ['release', 'update'],
        isPublished: true,
        isFeatured: false,
        publishedAt: new Date('2024-01-10'),
        createdAt: new Date('2024-01-09'),
        updatedAt: new Date('2024-01-10')
      },
      {
        id: 'news-3',
        title: 'Draft Article',
        slug: 'draft-article',
        excerpt: 'This is a draft.',
        content: 'Content of draft. '.repeat(20),
        category: 'community',
        authorId: 'author-1',
        authorName: 'Author One',
        tags: ['draft'],
        isPublished: false,
        isFeatured: false,
        createdAt: new Date('2024-01-12'),
        updatedAt: new Date('2024-01-12')
      }
    ];

    return articles.map(data => new NewsArticle(data));
  };

  describe('filterNews', () => {
    it('should filter by published status', () => {
      // Arrange
      const articles = createTestArticles();

      // Act
      const published = NewsService.filterNews(articles, { isPublished: true });

      // Assert
      expect(published).toHaveLength(2);
      expect(published.every(a => a.isPublished())).toBe(true);
    });

    it('should filter by featured status', () => {
      // Arrange
      const articles = createTestArticles();

      // Act
      const featured = NewsService.filterNews(articles, { isFeatured: true });

      // Assert
      expect(featured).toHaveLength(1);
      expect(featured[0].isFeatured()).toBe(true);
    });

    it('should filter by category', () => {
      // Arrange
      const articles = createTestArticles();

      // Act
      const announcements = NewsService.filterNews(articles, { category: 'announcement' });

      // Assert
      expect(announcements).toHaveLength(1);
      expect(announcements[0].getCategory().getValue()).toBe('announcement');
    });

    it('should filter by author', () => {
      // Arrange
      const articles = createTestArticles();

      // Act
      const byAuthor = NewsService.filterNews(articles, { authorId: 'author-1' });

      // Assert
      expect(byAuthor).toHaveLength(2);
      expect(byAuthor.every(a => a.getAuthorId().getValue() === 'author-1')).toBe(true);
    });

    it('should filter by tags', () => {
      // Arrange
      const articles = createTestArticles();

      // Act
      const withTag = NewsService.filterNews(articles, { tags: ['important'] });

      // Assert
      expect(withTag).toHaveLength(1);
      expect(withTag[0].hasTag('important')).toBe(true);
    });
  });

  describe('searchNews', () => {
    it('should search articles by query', () => {
      // Arrange
      const articles = createTestArticles();

      // Act
      const results = NewsService.searchNews(articles, 'announcement');

      // Assert
      expect(results).toHaveLength(1);
      expect(results[0].getTitle()).toContain('Announcement');
    });

    it('should return all articles for empty query', () => {
      // Arrange
      const articles = createTestArticles();

      // Act
      const results = NewsService.searchNews(articles, '');

      // Assert
      expect(results).toHaveLength(3);
    });
  });

  describe('sortNews', () => {
    it('should sort by title ascending', () => {
      // Arrange
      const articles = createTestArticles();

      // Act
      const sorted = NewsService.sortNews(articles, 'title', 'asc');

      // Assert
      expect(sorted[0].getTitle()).toBe('Announcement Article');
      expect(sorted[1].getTitle()).toBe('Draft Article');
      expect(sorted[2].getTitle()).toBe('Release Update');
    });

    it('should sort by published date descending', () => {
      // Arrange
      const articles = createTestArticles();

      // Act
      const sorted = NewsService.sortNews(articles, 'publishedAt', 'desc');

      // Assert
      expect(sorted[0].getPublishedDate()?.getValue().getTime()).toBeGreaterThan(
        sorted[1].getPublishedDate()?.getValue().getTime() || 0
      );
    });

    it('should sort by reading time ascending', () => {
      // Arrange
      const articles = createTestArticles();

      // Act
      const sorted = NewsService.sortNews(articles, 'readingTime', 'asc');

      // Assert
      expect(sorted[0].getReadingTime().getMinutes()).toBeLessThanOrEqual(
        sorted[1].getReadingTime().getMinutes()
      );
    });
  });

  describe('getFeaturedNews', () => {
    it('should return featured published articles', () => {
      // Arrange
      const articles = createTestArticles();

      // Act
      const featured = NewsService.getFeaturedNews(articles, 5);

      // Assert
      expect(featured).toHaveLength(1);
      expect(featured[0].isFeatured()).toBe(true);
      expect(featured[0].isPublished()).toBe(true);
    });
  });

  describe('getRecentNews', () => {
    it('should return recent published articles', () => {
      // Arrange
      const articles = createTestArticles();

      // Act
      const recent = NewsService.getRecentNews(articles, 5);

      // Assert
      expect(recent).toHaveLength(2);
      expect(recent.every(a => a.isPublished())).toBe(true);
    });
  });

  describe('getNewsByCategory', () => {
    it('should return articles by category', () => {
      // Arrange
      const articles = createTestArticles();

      // Act
      const byCategory = NewsService.getNewsByCategory(articles, 'announcement');

      // Assert
      expect(byCategory).toHaveLength(1);
      expect(byCategory[0].getCategory().getValue()).toBe('announcement');
    });
  });

  describe('getPopularTags', () => {
    it('should return popular tags with counts', () => {
      // Arrange
      const articles = createTestArticles();

      // Act
      const tags = NewsService.getPopularTags(articles, 5);

      // Assert
      expect(tags).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ tag: 'announcement', count: 1 }),
          expect.objectContaining({ tag: 'important', count: 1 }),
          expect.objectContaining({ tag: 'release', count: 1 }),
          expect.objectContaining({ tag: 'update', count: 1 })
        ])
      );
    });
  });

  describe('getNewsStats', () => {
    it('should return correct statistics', () => {
      // Arrange
      const articles = createTestArticles();

      // Act
      const stats = NewsService.getNewsStats(articles);

      // Assert
      expect(stats.total).toBe(3);
      expect(stats.published).toBe(2);
      expect(stats.drafts).toBe(1);
      expect(stats.featured).toBe(1);
      expect(stats.categoryDistribution).toEqual({
        announcement: 1,
        release: 1
      });
    });
  });
});