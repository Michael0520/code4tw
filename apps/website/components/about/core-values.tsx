'use client';

import { useTranslations } from 'next-intl';
import { CoreValueDto } from '@/lib/features/about/actions';

interface CoreValuesProps {
  values: CoreValueDto[];
}

export function CoreValues({ values }: CoreValuesProps) {
  const t = useTranslations();

  if (values.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-muted/30">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t('about.values.title')}
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            {t('about.valuesDescription')}
          </p>
        </div>

        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <div
                key={value.id}
                className="rounded-lg border bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-colors p-6"
              >
                <div className="rounded-lg bg-accent/10 p-3 w-fit mb-4">
                  <span className="text-2xl" role="img" aria-label={value.title}>
                    {value.icon}
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}