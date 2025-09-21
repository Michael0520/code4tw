/**
 * Projects Domain Layer Tests
 * TDD approach - testing all business logic
 */

import { describe, it, expect } from 'vitest';
import {
  Project,
  ProjectId,
  ProjectCategory,
  ProjectStatus,
  GitHubMetrics,
  ProjectService,
  ProjectData
} from '@/lib/features/projects/domain';

describe('ProjectId Value Object', () => {
  it('should create valid ProjectId', () => {
    const id = new ProjectId('project-123');
    expect(id.getValue()).toBe('project-123');
  });

  it('should throw error for empty ProjectId', () => {
    expect(() => new ProjectId('')).toThrow('ProjectId cannot be empty');
    expect(() => new ProjectId('   ')).toThrow('ProjectId cannot be empty');
  });

  it('should compare ProjectIds correctly', () => {
    const id1 = new ProjectId('project-123');
    const id2 = new ProjectId('project-123');
    const id3 = new ProjectId('project-456');

    expect(id1.equals(id2)).toBe(true);
    expect(id1.equals(id3)).toBe(false);
  });
});

describe('ProjectCategory Value Object', () => {
  it('should create valid category', () => {
    const category = new ProjectCategory('government');
    expect(category.getValue()).toBe('government');
    expect(category.getDisplayName()).toBe('Government');
  });

  it('should throw error for invalid category', () => {
    expect(() => new ProjectCategory('invalid' as any)).toThrow(
      'Invalid project category: invalid'
    );
  });

  it('should return correct display names', () => {
    const testCases = [
      { value: 'government', display: 'Government' },
      { value: 'education', display: 'Education' },
      { value: 'civic-tech', display: 'Civic Technology' }
    ];

    testCases.forEach(test => {
      const category = new ProjectCategory(test.value as any);
      expect(category.getDisplayName()).toBe(test.display);
    });
  });

  it('should compare categories correctly', () => {
    const cat1 = new ProjectCategory('education');
    const cat2 = new ProjectCategory('education');
    const cat3 = new ProjectCategory('healthcare');

    expect(cat1.equals(cat2)).toBe(true);
    expect(cat1.equals(cat3)).toBe(false);
  });
});

describe('ProjectStatus Value Object', () => {
  it('should create valid status', () => {
    const status = new ProjectStatus('active');
    expect(status.getValue()).toBe('active');
    expect(status.isActive()).toBe(true);
    expect(status.isCompleted()).toBe(false);
  });

  it('should throw error for invalid status', () => {
    expect(() => new ProjectStatus('invalid' as any)).toThrow(
      'Invalid project status: invalid'
    );
  });

  it('should correctly identify status states', () => {
    const active = new ProjectStatus('active');
    const completed = new ProjectStatus('completed');
    const planning = new ProjectStatus('planning');

    expect(active.isActive()).toBe(true);
    expect(active.isCompleted()).toBe(false);

    expect(completed.isActive()).toBe(false);
    expect(completed.isCompleted()).toBe(true);

    expect(planning.isActive()).toBe(false);
    expect(planning.isCompleted()).toBe(false);
  });
});

describe('GitHubMetrics Value Object', () => {
  it('should create valid metrics', () => {
    const metrics = new GitHubMetrics(100, 25);
    expect(metrics.getStars()).toBe(100);
    expect(metrics.getForks()).toBe(25);
  });

  it('should calculate popularity score', () => {
    const metrics = new GitHubMetrics(100, 25);
    // Popularity = stars * 2 + forks
    expect(metrics.getPopularityScore()).toBe(225);
  });

  it('should throw error for negative values', () => {
    expect(() => new GitHubMetrics(-1, 0)).toThrow(
      'Stars count cannot be negative'
    );
    expect(() => new GitHubMetrics(0, -1)).toThrow(
      'Forks count cannot be negative'
    );
  });
});

describe('Project Entity', () => {
  const validProjectData: ProjectData = {
    id: '1',
    title: 'Test Project',
    description: 'A test project description',
    category: 'government',
    status: 'active',
    tags: ['test', 'sample'],
    githubUrl: 'https://github.com/test/project',
    websiteUrl: 'https://test.com',
    stars: 100,
    forks: 25,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-15')
  };

  it('should create valid project', () => {
    const project = new Project(validProjectData);

    expect(project.getId().getValue()).toBe('1');
    expect(project.getTitle()).toBe('Test Project');
    expect(project.getDescription()).toBe('A test project description');
    expect(project.getCategory().getValue()).toBe('government');
    expect(project.getStatus().getValue()).toBe('active');
    expect(project.getTags()).toEqual(['test', 'sample']);
    expect(project.isActive()).toBe(true);
  });

  it('should validate title', () => {
    const invalidData = { ...validProjectData, title: '' };
    expect(() => new Project(invalidData)).toThrow(
      'Project title cannot be empty'
    );

    const tooLongTitle = 'a'.repeat(101);
    const longTitleData = { ...validProjectData, title: tooLongTitle };
    expect(() => new Project(longTitleData)).toThrow(
      'Project title cannot exceed 100 characters'
    );
  });

  it('should validate description', () => {
    const invalidData = { ...validProjectData, description: '' };
    expect(() => new Project(invalidData)).toThrow(
      'Project description cannot be empty'
    );

    const tooLongDesc = 'a'.repeat(501);
    const longDescData = { ...validProjectData, description: tooLongDesc };
    expect(() => new Project(longDescData)).toThrow(
      'Project description cannot exceed 500 characters'
    );
  });

  it('should check if project has tag', () => {
    const project = new Project(validProjectData);

    expect(project.hasTag('test')).toBe(true);
    expect(project.hasTag('TEST')).toBe(true); // Case insensitive
    expect(project.hasTag('nonexistent')).toBe(false);
  });

  it('should match search query', () => {
    const project = new Project(validProjectData);

    // Should match title
    expect(project.matchesSearch('Test')).toBe(true);
    expect(project.matchesSearch('PROJECT')).toBe(true);

    // Should match description
    expect(project.matchesSearch('description')).toBe(true);

    // Should match tags
    expect(project.matchesSearch('sample')).toBe(true);

    // Should not match
    expect(project.matchesSearch('nonexistent')).toBe(false);
  });
});

describe('ProjectService', () => {
  const createTestProjects = (): Project[] => {
    return [
      new Project({
        id: '1',
        title: 'Government Project',
        description: 'A government project',
        category: 'government',
        status: 'active',
        tags: ['vue', 'government'],
        stars: 100,
        forks: 20,
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-15')
      }),
      new Project({
        id: '2',
        title: 'Education Tool',
        description: 'An education project',
        category: 'education',
        status: 'completed',
        tags: ['react', 'education'],
        stars: 200,
        forks: 50,
        createdAt: new Date('2024-01-02'),
        updatedAt: new Date('2024-01-16')
      }),
      new Project({
        id: '3',
        title: 'Healthcare App',
        description: 'A healthcare application',
        category: 'healthcare',
        status: 'active',
        tags: ['python', 'healthcare'],
        stars: 150,
        forks: 30,
        createdAt: new Date('2024-01-03'),
        updatedAt: new Date('2024-01-17')
      })
    ];
  };

  describe('filterProjects', () => {
    it('should filter by category', () => {
      const projects = createTestProjects();
      const filtered = ProjectService.filterProjects(projects, {
        category: 'government'
      });

      expect(filtered).toHaveLength(1);
      expect(filtered[0].getTitle()).toBe('Government Project');
    });

    it('should filter by status', () => {
      const projects = createTestProjects();
      const filtered = ProjectService.filterProjects(projects, {
        status: 'active'
      });

      expect(filtered).toHaveLength(2);
      expect(filtered.every(p => p.isActive())).toBe(true);
    });

    it('should filter by tags', () => {
      const projects = createTestProjects();
      const filtered = ProjectService.filterProjects(projects, {
        tags: ['react', 'python']
      });

      expect(filtered).toHaveLength(2); // Projects with react OR python
    });

    it('should apply multiple filters', () => {
      const projects = createTestProjects();
      const filtered = ProjectService.filterProjects(projects, {
        status: 'active',
        tags: ['government']
      });

      expect(filtered).toHaveLength(1);
      expect(filtered[0].getTitle()).toBe('Government Project');
    });

    it('should return all when no filters applied', () => {
      const projects = createTestProjects();
      const filtered = ProjectService.filterProjects(projects, {});

      expect(filtered).toHaveLength(3);
    });
  });

  describe('searchProjects', () => {
    it('should search in title', () => {
      const projects = createTestProjects();
      const results = ProjectService.searchProjects(projects, 'government');

      expect(results).toHaveLength(1);
      expect(results[0].getTitle()).toBe('Government Project');
    });

    it('should search in description', () => {
      const projects = createTestProjects();
      const results = ProjectService.searchProjects(projects, 'application');

      expect(results).toHaveLength(1);
      expect(results[0].getTitle()).toBe('Healthcare App');
    });

    it('should search in tags', () => {
      const projects = createTestProjects();
      const results = ProjectService.searchProjects(projects, 'react');

      expect(results).toHaveLength(1);
      expect(results[0].getTitle()).toBe('Education Tool');
    });

    it('should return all for empty query', () => {
      const projects = createTestProjects();
      const results = ProjectService.searchProjects(projects, '');

      expect(results).toHaveLength(3);
    });
  });

  describe('sortProjects', () => {
    it('should sort by title', () => {
      const projects = createTestProjects();
      const sorted = ProjectService.sortProjects(projects, 'title', 'asc');

      expect(sorted[0].getTitle()).toBe('Education Tool');
      expect(sorted[1].getTitle()).toBe('Government Project');
      expect(sorted[2].getTitle()).toBe('Healthcare App');
    });

    it('should sort by stars', () => {
      const projects = createTestProjects();
      const sorted = ProjectService.sortProjects(projects, 'stars', 'desc');

      expect(sorted[0].getMetrics().getStars()).toBe(200);
      expect(sorted[1].getMetrics().getStars()).toBe(150);
      expect(sorted[2].getMetrics().getStars()).toBe(100);
    });

    it('should sort by date', () => {
      const projects = createTestProjects();
      const sorted = ProjectService.sortProjects(projects, 'date', 'asc');

      expect(sorted[0].getId().getValue()).toBe('1');
      expect(sorted[1].getId().getValue()).toBe('2');
      expect(sorted[2].getId().getValue()).toBe('3');
    });
  });

  describe('getFeaturedProjects', () => {
    it('should return most popular active projects', () => {
      const projects = createTestProjects();
      const featured = ProjectService.getFeaturedProjects(projects, 2);

      expect(featured).toHaveLength(2);
      // Healthcare has popularity score of 150*2 + 30 = 330
      // Government has popularity score of 100*2 + 20 = 220
      expect(featured[0].getTitle()).toBe('Healthcare App');
      expect(featured[1].getTitle()).toBe('Government Project');
    });

    it('should only include active projects', () => {
      const projects = createTestProjects();
      const featured = ProjectService.getFeaturedProjects(projects, 10);

      expect(featured).toHaveLength(2); // Only 2 active projects
      expect(featured.every(p => p.isActive())).toBe(true);
    });
  });

  describe('getProjectStats', () => {
    it('should calculate correct statistics', () => {
      const projects = createTestProjects();
      const stats = ProjectService.getProjectStats(projects);

      expect(stats.total).toBe(3);
      expect(stats.active).toBe(2);
      expect(stats.totalStars).toBe(450);
      expect(stats.totalForks).toBe(100);
      expect(stats.categoryDistribution).toEqual({
        government: 1,
        education: 1,
        healthcare: 1
      });
    });
  });
});