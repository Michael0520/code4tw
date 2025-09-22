"use client"

import Link from "next/link";
import { useTranslations } from "next-intl";

interface HeroSectionProps {
  locale: string;
}

export function HeroSection({ locale }: HeroSectionProps) {
  const t = useTranslations('hero');

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center rounded-full border px-4 py-2 text-sm font-medium">
            {t("hero.badge")}
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            {t("hero.title")}
            <span className="text-primary">
              {t("hero.title.highlight")}
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
            {t("hero.description")}
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={`/${locale}/about`}
              className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              {t("hero.join")}
            </Link>
            <Link
              href="https://github.com/g0v"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-md border border-input bg-background px-6 py-3 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              {t("hero.projects")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}