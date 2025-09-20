import { News } from '../../domain/entities/news';
import { NewsRepository } from '../repositories/news-repository';

export interface GetRecentNewsRequest {
  readonly limit?: number;
}

export interface GetRecentNewsResponse {
  readonly news: readonly NewsDto[];
}

export interface NewsDto {
  readonly id: string;
  readonly title: string;
  readonly slug: string;
  readonly excerpt: string;
  readonly category: string;
  readonly authorId: string;
  readonly tags: readonly string[];
  readonly publishedAt?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export class GetRecentNews {
  constructor(private readonly newsRepository: NewsRepository) {}

  public async execute(request: GetRecentNewsRequest): Promise<GetRecentNewsResponse> {
    const news = await this.newsRepository.findRecent(request.limit);

    return {
      news: news.map(item => this.mapToDto(item)),
    };
  }

  private mapToDto(news: News): NewsDto {
    return {
      id: news.getId().getValue(),
      title: news.getTitle(),
      slug: news.getSlug().getValue(),
      excerpt: news.getExcerpt(),
      category: news.getCategory().getValue(),
      authorId: news.getAuthorId().getValue(),
      tags: news.getTags(),
      publishedAt: news.getPublishedAt()?.toISOString(),
      createdAt: news.getCreatedAt().toISOString(),
      updatedAt: news.getUpdatedAt().toISOString(),
    };
  }
}