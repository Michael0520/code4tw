'use client';

import { useTranslations } from 'next-intl';
import { OrganizationDto } from '@/lib/features/about/actions';

interface AboutHeroProps {
  organization: OrganizationDto;
}

export function AboutHero({ organization }: AboutHeroProps) {
  const t = useTranslations();

  return (
    <section className="py-16 sm:py-24 relative overflow-hidden">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-4 inline-flex items-center rounded-full border px-3 py-1 text-sm">
            {t('about.title')}
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            {organization.name}
          </h1>
          <p className="mt-6 text-xl leading-8 text-muted-foreground">
            {organization.tagline}
          </p>
          <div className="mt-8 flex justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                {t('about.foundedYear')}: {organization.foundedYear}
              </span>
              <span className="inline-flex items-center rounded-full bg-secondary/10 px-2 py-1 text-xs font-medium text-secondary-foreground">
                {organization.age} {t('about.yearsOld')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}