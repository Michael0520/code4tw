'use client';

import { ProjectDto } from '@/lib/features/projects/actions';
import ProjectCard from './project-card';

interface ProjectsListProps {
  projects: ProjectDto[];
  featured?: boolean;
}

export default function ProjectsList({ projects, featured = false }: ProjectsListProps) {
  const gridCols = featured ? 'lg:grid-cols-3' : 'lg:grid-cols-3 xl:grid-cols-4';

  return (
    <div className={`grid gap-6 sm:grid-cols-2 ${gridCols}`}>
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          featured={featured}
        />
      ))}
    </div>
  );
}