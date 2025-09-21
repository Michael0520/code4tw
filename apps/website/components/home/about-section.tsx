"use client"

import type { AboutFeature } from "@/lib/features/home/config";
import { useLanguageContext } from "@/components/language-provider";

interface AboutSectionProps {
  features: AboutFeature[];
}

export function AboutSection({ features }: AboutSectionProps) {
  const { t } = useLanguageContext();

  return (
    <section className="py-24 sm:py-32">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-4 inline-flex items-center rounded-full border px-3 py-1 text-sm">
            {t("home.about.badge")}
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t("home.about.title")}
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            {t("home.about.description")}
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-5xl">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div key={feature.id} className="rounded-lg border bg-card p-6">
                <div className="rounded-lg bg-primary/10 p-3 w-fit mb-4">
                  <div className="h-6 w-6 bg-primary rounded"></div>
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  {t(`about.values.${feature.id}.title`)}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t(`about.values.${feature.id}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}