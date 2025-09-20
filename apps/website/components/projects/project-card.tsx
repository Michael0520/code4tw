'use client';

import Link from 'next/link';
import { ProjectDto } from '@/lib/features/projects/actions';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLink, Github, Star, GitFork } from 'lucide-react';

interface ProjectCardProps {
  project: ProjectDto;
  featured?: boolean;
}

export default function ProjectCard({ project, featured = false }: ProjectCardProps) {
  const statusColors: Record<string, string> = {
    active: 'bg-green-500/10 text-green-700 border-green-500/20',
    completed: 'bg-blue-500/10 text-blue-700 border-blue-500/20',
    planning: 'bg-yellow-500/10 text-yellow-700 border-yellow-500/20',
    archived: 'bg-gray-500/10 text-gray-700 border-gray-500/20'
  };

  const categoryIcons: Record<string, string> = {
    government: '🏛️',
    education: '📚',
    environment: '🌱',
    healthcare: '🏥',
    transportation: '🚆',
    'civic-tech': '💻'
  };

  return (
    <Card className={`group hover:shadow-lg transition-all duration-300 ${featured ? 'border-primary/20' : ''}`}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">{categoryIcons[project.category] || '📁'}</span>
              <Badge variant="secondary" className="text-xs">
                {project.categoryDisplay}
              </Badge>
            </div>
            <CardTitle className="text-lg font-semibold line-clamp-2">
              {project.title}
            </CardTitle>
          </div>
          <Badge
            variant="outline"
            className={`${statusColors[project.status]} text-xs`}
          >
            {project.statusDisplay}
          </Badge>
        </div>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {project.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
          {project.tags.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{project.tags.length - 3}
            </Badge>
          )}
        </div>

        {/* Stats and Links */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Star className="h-3.5 w-3.5" />
              {project.stars}
            </span>
            <span className="flex items-center gap-1">
              <GitFork className="h-3.5 w-3.5" />
              {project.forks}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {project.githubUrl && (
              <Link
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <Github className="h-4 w-4" />
              </Link>
            )}
            {project.websiteUrl && (
              <Link
                href={project.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="h-4 w-4" />
              </Link>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}