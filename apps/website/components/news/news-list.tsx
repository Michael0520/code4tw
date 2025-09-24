/**
 * News List Component
 * Displays news articles in a grid layout
 */

import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, User, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { NewsDto } from '@/lib/features/news/actions';

interface NewsListProps {
  articles: NewsDto[];
  showFeatured?: boolean;
}

export function NewsList({ articles, showFeatured = false }: NewsListProps) {
  const { t } = useTranslation();

  const featuredArticle = showFeatured ? articles.find(article => article.isFeatured) : null;
  const regularArticles = showFeatured
    ? articles.filter(article => !article.isFeatured)
    : articles;

  return (
    <div className="space-y-16">
      {/* Featured Article */}
      {featuredArticle && (
        <div className="mx-auto max-w-4xl">
          <Badge className="mb-4">{t('news.featured')}</Badge>
          <Card className="overflow-hidden border-0 bg-card/80 backdrop-blur-sm">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              <div className="aspect-video lg:aspect-square overflow-hidden bg-muted">
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                  {/* Placeholder for image */}
                  <span>News Image</span>
                </div>
              </div>
              <CardContent className="p-8 flex flex-col justify-center">
                <Badge variant="secondary" className="w-fit mb-4">
                  {featuredArticle.categoryDisplay}
                </Badge>
                <h2 className="text-2xl font-bold mb-4 text-balance">
                  {featuredArticle.title}
                </h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {featuredArticle.excerpt}
                </p>
                <div className="flex items-center text-sm text-muted-foreground mb-6">
                  <User className="h-4 w-4 mr-1" />
                  <span className="mr-4">{featuredArticle.authorName}</span>
                  <Calendar className="h-4 w-4 mr-1" />
                  <span className="mr-4">{featuredArticle.publishedTimeAgo}</span>
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{featuredArticle.readingTime}</span>
                </div>
                <Button className="w-fit group">
                  {t('news.readMore')}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </CardContent>
            </div>
          </Card>
        </div>
      )}

      {/* Regular Articles Grid */}
      {regularArticles.length > 0 && (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {regularArticles.map((article) => (
            <Card
              key={article.id}
              className="group hover:shadow-lg transition-all duration-300 border-0 bg-card/80 backdrop-blur-sm overflow-hidden"
            >
              <div className="aspect-video overflow-hidden bg-muted">
                <div className="w-full h-full flex items-center justify-center text-muted-foreground group-hover:scale-105 transition-transform duration-300">
                  {/* Placeholder for image */}
                  <span>News Image</span>
                </div>
              </div>
              <CardHeader className="p-6">
                <Badge variant="secondary" className="w-fit mb-2">
                  {article.categoryDisplay}
                </Badge>
                <h3 className="text-lg font-semibold mb-2 text-balance">
                  {article.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {article.excerpt}
                </p>
                <div className="flex items-center text-xs text-muted-foreground mb-4">
                  <User className="h-3 w-3 mr-1" />
                  <span className="mr-3">{article.authorName}</span>
                  <Calendar className="h-3 w-3 mr-1" />
                  <span className="mr-3">{article.publishedTimeAgo}</span>
                  <Clock className="h-3 w-3 mr-1" />
                  <span>{article.readingTime}</span>
                </div>
                <Button variant="ghost" size="sm" className="w-fit p-0 h-auto group">
                  {t('news.readMore')}
                  <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                </Button>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}

      {/* No Results */}
      {articles.length === 0 && (
        <div className="text-center py-16">
          <div className="text-muted-foreground mb-4">
            {t('common.noResults')}
          </div>
        </div>
      )}
    </div>
  );
}