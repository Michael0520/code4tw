interface CommunitySectionProps {
  roles: readonly string[];
  locale: string;
}

export function CommunitySection({ roles, locale }: CommunitySectionProps) {
  const isZh = locale === "zh";

  return (
    <section className="py-24 sm:py-32">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-4 inline-flex items-center rounded-full border px-3 py-1 text-sm">
            {isZh ? "社群參與" : "Community Participation"}
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {isZh ? "加入我們的社群" : "Join Our Community"}
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            {isZh
              ? "透過多種管道參與社群活動，與志同道合的夥伴一起為台灣的數位民主努力。"
              : "Participate in community activities through various channels and work with like-minded partners for Taiwan's digital democracy."
            }
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-4xl">
          <div className="rounded-lg border bg-gradient-to-r from-primary/5 to-accent/5 p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">
              {isZh ? "加入我們的行列" : "Join Our Ranks"}
            </h3>
            <p className="text-muted-foreground mb-6">
              {isZh
                ? "不論你是開發者、設計師、或是關心社會議題的公民，我們都歡迎你的參與。讓我們一起用科技讓台灣更美好！"
                : "Whether you're a developer, designer, or a citizen who cares about social issues, we welcome your participation. Let's use technology to make Taiwan better together!"
              }
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {roles.map((role) => (
                <span
                  key={role}
                  className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium"
                >
                  {role}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}