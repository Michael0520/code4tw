'use client';

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  priority?: number;
}

interface FeatureGridProps<T extends FeatureItem> {
  title: string;
  description?: string;
  items: T[];
  columns?: 2 | 3 | 4;
  showPriority?: boolean;
  className?: string;
  sectionClassName?: string;
  iconBackgroundClassName?: string;
}

export function FeatureGrid<T extends FeatureItem>({
  title,
  description,
  items,
  columns = 4,
  showPriority = false,
  className = '',
  sectionClassName = 'py-16',
  iconBackgroundClassName = 'bg-primary/10'
}: FeatureGridProps<T>) {
  if (items.length === 0) {
    return null;
  }

  const gridClasses = {
    2: 'grid-cols-1 gap-8 sm:grid-cols-2',
    3: 'grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4'
  };

  return (
    <section className={sectionClassName}>
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {title}
          </h2>
          {description && (
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              {description}
            </p>
          )}
        </div>

        <div className="mx-auto max-w-5xl">
          <div className={`grid ${gridClasses[columns]} ${className}`}>
            {items.map((item) => (
              <div
                key={item.id}
                className="rounded-lg border bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-colors p-6"
              >
                <div className={`rounded-lg ${iconBackgroundClassName} p-3 w-fit mb-4`}>
                  <span className="text-2xl" role="img" aria-label={item.title}>
                    {item.icon}
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
                {showPriority && item.priority && item.priority > 0 && (
                  <div className="mt-4">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Priority</span>
                      <span className="font-medium">{item.priority}</span>
                    </div>
                    <div className="mt-1 w-full bg-secondary/20 rounded-full h-1">
                      <div
                        className="bg-primary h-1 rounded-full transition-all duration-300"
                        style={{ width: `${item.priority}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}