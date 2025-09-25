"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { getHomeData } from "@/lib/features/home/actions";
import type { AboutFeature } from "@/lib/features/home/config";
import { SimpleHeader } from "@/components/layout/simple-header";
import { HeroSection } from "./hero-section";
import { AboutSection } from "./about-section";
import { CommunitySection } from "./community-section";
import { useState } from "react";

interface HomePageProps {
  locale: string;
}

export function HomePage({ locale }: HomePageProps) {
  const t = useTranslations('footer.legal');
  const [homeData, setHomeData] = useState<{
    aboutFeatures: AboutFeature[];
    communityRoles: readonly string[];
  } | null>(null);

  useEffect(() => {
    // Load home data
    getHomeData().then(setHomeData);
  }, []);

  if (!homeData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <SimpleHeader locale={locale} />

      <main>
        <HeroSection />
        <AboutSection features={homeData.aboutFeatures} />
        <CommunitySection roles={homeData.communityRoles} />
      </main>

      {/* Simple Footer */}
      <footer className="border-t bg-muted/30">
        <div className="container px-4 py-8 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              {t('copyright')}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}