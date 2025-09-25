"use client";

import { useTranslations } from "next-intl";

export function CommunitySection({ roles }: { roles: readonly string[] }) {
  const t = useTranslations('community');

  return (
    <section className="py-24 sm:py-32">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-4 inline-flex items-center rounded-full border px-3 py-1 text-sm">
            {t('badge')}
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t('title')}
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            {t('description')}
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-4xl">
          <div className="rounded-lg border bg-gradient-to-r from-primary/5 to-accent/5 p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">
              {t('joinTitle')}
            </h3>
            <p className="text-muted-foreground mb-6">
              {t('joinDescription')}
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