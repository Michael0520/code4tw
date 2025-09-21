import type { Project } from "@/lib/features/home/config";

interface ProjectsSectionProps {
  projects: Project[];
  locale: string;
}

export function ProjectsSection({ projects, locale }: ProjectsSectionProps) {
  const isZh = locale === "zh";

  return (
    <section className="py-24 sm:py-32 bg-muted/30">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-4 inline-flex items-center rounded-full border px-3 py-1 text-sm">
            {isZh ? "專案展示" : "Project Showcase"}
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {isZh ? "我們的開源專案" : "Our Open Source Projects"}
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            {isZh
              ? "這些專案展現了我們如何運用科技解決社會問題，每個專案都歡迎社群貢獻。"
              : "These projects showcase how we use technology to solve social problems. Every project welcomes community contributions."
            }
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-6xl">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2">
            {projects.map((project) => (
              <div key={project.id} className="rounded-lg border bg-card overflow-hidden">
                <div className="h-48 bg-muted"></div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span>⭐ {project.stars}</span>
                        <span>🍴 {project.forks}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex space-x-2">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center rounded-md border border-input bg-background px-3 py-2 text-sm font-medium transition-colors hover:bg-accent"
                    >
                      {isZh ? "原始碼" : "Source Code"}
                    </a>
                    <button className="inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground">
                      {isZh ? "查看" : "View"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}