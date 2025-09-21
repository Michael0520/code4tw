'use client';

import { useTranslations } from 'next-intl';
import { OrganizationPrincipleDto } from '@/lib/features/about/actions';

interface CorePrinciplesProps {
  principles: OrganizationPrincipleDto[];
}

export function CorePrinciples({ principles }: CorePrinciplesProps) {
  const t = useTranslations();

  if (principles.length === 0) {
    return null;
  }

  return (
    <section className="py-16">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t('about.corePrinciples')}
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            {t('about.corePrinciplesDescription')}
          </p>
        </div>

        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {principles.map((principle) => (
              <div
                key={principle.id}
                className="rounded-lg border bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-colors p-6"
              >
                <div className="rounded-lg bg-primary/10 p-3 w-fit mb-4">
                  <span className="text-2xl" role="img" aria-label={principle.title}>
                    {principle.icon}
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-2">{principle.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {principle.description}
                </p>
                {principle.priority > 0 && (
                  <div className="mt-4">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{t('about.priority')}</span>
                      <span className="font-medium">{principle.priority}</span>
                    </div>
                    <div className="mt-1 w-full bg-secondary/20 rounded-full h-1">
                      <div
                        className="bg-primary h-1 rounded-full transition-all duration-300"
                        style={{ width: `${principle.priority}%` }}
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