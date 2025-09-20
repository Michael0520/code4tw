import { NewsId } from '../value-objects/news-id';
import { NewsCategory } from '../value-objects/news-category';
import { AuthorId } from '../value-objects/author-id';
import { Slug } from '../value-objects/slug';

export interface NewsProps {
  readonly id: NewsId;
  readonly title: string;
  readonly slug: Slug;
  readonly excerpt: string;
  readonly content: string;
  readonly category: NewsCategory;
  readonly authorId: AuthorId;
  readonly tags: readonly string[];
  readonly isPublished: boolean;
  readonly publishedAt?: Date;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export class News {
  private constructor(private readonly props: NewsProps) {
    this.validateTitle(props.title);
    this.validateExcerpt(props.excerpt);
    this.validateContent(props.content);
  }

  public static create(params: {
    title: string;
    excerpt: string;
    content: string;
    category: NewsCategory;
    authorId: AuthorId;
    tags?: readonly string[];
  }): News {
    const now = new Date();
    const slug = Slug.fromTitle(params.title);

    return new News({
      id: NewsId.generate(),
      title: params.title,
      slug,
      excerpt: params.excerpt,
      content: params.content,
      category: params.category,
      authorId: params.authorId,
      tags: params.tags || [],
      isPublished: false,
      createdAt: now,
      updatedAt: now,
    });
  }

  public static fromPersistence(props: NewsProps): News {
    return new News(props);
  }

  public getId(): NewsId {
    return this.props.id;
  }

  public getTitle(): string {
    return this.props.title;
  }

  public getSlug(): Slug {
    return this.props.slug;
  }

  public getExcerpt(): string {
    return this.props.excerpt;
  }

  public getContent(): string {
    return this.props.content;
  }

  public getCategory(): NewsCategory {
    return this.props.category;
  }

  public getAuthorId(): AuthorId {
    return this.props.authorId;
  }

  public getTags(): readonly string[] {
    return this.props.tags;
  }

  public isPublished(): boolean {
    return this.props.isPublished;
  }

  public getPublishedAt(): Date | undefined {
    return this.props.publishedAt;
  }

  public getCreatedAt(): Date {
    return this.props.createdAt;
  }

  public getUpdatedAt(): Date {
    return this.props.updatedAt;
  }

  public publish(): News {
    if (this.props.isPublished) {
      return this;
    }

    const now = new Date();
    return new News({
      ...this.props,
      isPublished: true,
      publishedAt: now,
      updatedAt: now,
    });
  }

  public unpublish(): News {
    if (!this.props.isPublished) {
      return this;
    }

    return new News({
      ...this.props,
      isPublished: false,
      publishedAt: undefined,
      updatedAt: new Date(),
    });
  }

  public updateContent(params: {
    title?: string;
    excerpt?: string;
    content?: string;
    category?: NewsCategory;
    tags?: readonly string[];
  }): News {
    const updatedProps = { ...this.props };

    if (params.title) {
      this.validateTitle(params.title);
      updatedProps.title = params.title;
      updatedProps.slug = Slug.fromTitle(params.title);
    }

    if (params.excerpt) {
      this.validateExcerpt(params.excerpt);
      updatedProps.excerpt = params.excerpt;
    }

    if (params.content) {
      this.validateContent(params.content);
      updatedProps.content = params.content;
    }

    if (params.category) {
      updatedProps.category = params.category;
    }

    if (params.tags) {
      updatedProps.tags = params.tags;
    }

    updatedProps.updatedAt = new Date();

    return new News(updatedProps);
  }

  public addTag(tag: string): News {
    if (this.props.tags.includes(tag)) {
      return this;
    }

    return new News({
      ...this.props,
      tags: [...this.props.tags, tag],
      updatedAt: new Date(),
    });
  }

  public removeTag(tag: string): News {
    return new News({
      ...this.props,
      tags: this.props.tags.filter(t => t !== tag),
      updatedAt: new Date(),
    });
  }

  public isDraft(): boolean {
    return !this.props.isPublished;
  }

  public toPersistence(): NewsProps {
    return { ...this.props };
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
}