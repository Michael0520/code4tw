import { Project } from '../entities/project';
import { ProjectCategory } from '../value-objects/project-category';

export interface ProjectStatistics {
  readonly totalProjects: number;
  readonly activeProjects: number;
  readonly completedProjects: number;
  readonly totalStars: number;
  readonly totalForks: number;
  readonly averageStarsPerProject: number;
  readonly categoryDistribution: Record<string, number>;
  readonly popularTags: readonly { tag: string; count: number }[];
}

export class ProjectAnalytics {
  public static calculateStatistics(projects: readonly Project[]): ProjectStatistics {
    const totalProjects = projects.length;
    const activeProjects = projects.filter(p => p.isActive()).length;
    const completedProjects = projects.filter(p => p.isCompleted()).length;
    const totalStars = projects.reduce((sum, p) => sum + p.getStarCount(), 0);
    const totalForks = projects.reduce((sum, p) => sum + p.getForkCount(), 0);
    const averageStarsPerProject = totalProjects > 0 ? totalStars / totalProjects : 0;

    // Calculate category distribution
    const categoryMap = new Map<string, number>();
    projects.forEach(project => {
      const category = project.getCategory().getValue();
      categoryMap.set(category, (categoryMap.get(category) || 0) + 1);
    });

    // Calculate popular tags
    const tagMap = new Map<string, number>();
    projects.forEach(project => {
      project.getTags().forEach(tag => {
        tagMap.set(tag, (tagMap.get(tag) || 0) + 1);
      });
    });

    const popularTags = Array.from(tagMap.entries())
      .map(([tag, count]) => ({ tag, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    return {
      totalProjects,
      activeProjects,
      completedProjects,
      totalStars,
      totalForks,
      averageStarsPerProject: Math.round(averageStarsPerProject * 100) / 100,
      categoryDistribution: Object.fromEntries(categoryMap),
      popularTags,
    };
  }

  public static findTopPerformers(projects: readonly Project[], limit: number = 5): readonly Project[] {
    return [...projects]
      .sort((a, b) => {
        // Sort by star count first, then by fork count
        const starDiff = b.getStarCount() - a.getStarCount();
        if (starDiff !== 0) return starDiff;
        return b.getForkCount() - a.getForkCount();
      })
      .slice(0, limit);
  }

  public static findProjectsByCategory(
    projects: readonly Project[],
    category: ProjectCategory
  ): readonly Project[] {
    return projects.filter(project => project.getCategory().equals(category));
  }

  public static searchProjects(
    projects: readonly Project[],
    query: string
  ): readonly Project[] {
    const lowerQuery = query.toLowerCase();

    return projects.filter(project => {
      const titleMatch = project.getTitle().toLowerCase().includes(lowerQuery);
      const descriptionMatch = project.getDescription().toLowerCase().includes(lowerQuery);
      const tagMatch = project.getTags().some(tag =>
        tag.toLowerCase().includes(lowerQuery)
      );

      return titleMatch || descriptionMatch || tagMatch;
    });
  }

  public static calculateHealthScore(project: Project): number {
    const factors = {
      hasStars: project.getStarCount() > 0 ? 20 : 0,
      hasForks: project.getForkCount() > 0 ? 15 : 0,
      isActive: project.isActive() ? 25 : 0,
      hasTags: project.getTags().length > 0 ? 10 : 0,
      hasUrls: (project.getGithubUrl() ? 15 : 0) + (project.getWebsiteUrl() ? 15 : 0),
    };

    return Object.values(factors).reduce((sum, score) => sum + score, 0);
  }

  public static getProjectImpactLevel(project: Project): 'low' | 'medium' | 'high' {
    const starCount = project.getStarCount();

    if (starCount >= 100) return 'high';
    if (starCount >= 20) return 'medium';
    return 'low';
  }
}