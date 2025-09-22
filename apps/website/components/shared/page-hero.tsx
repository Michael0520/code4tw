interface PageHeroProps {
  title: string;
  description: string;
}

export function PageHero({ title, description }: PageHeroProps) {
  return (
    <section className="py-16 sm:py-24 bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl text-balance">
            {title}
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground text-pretty">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}