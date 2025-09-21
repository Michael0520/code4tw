import { getHomeData } from "@/lib/features/home/actions";
import { Header } from "@/components/layout/header";
import { HeroSection } from "./hero-section";
import { AboutSection } from "./about-section";
import { ProjectsSection } from "./projects-section";
import { CommunitySection } from "./community-section";

interface HomePageProps {
  locale: string;
}

export async function HomePage({ locale }: HomePageProps) {
  const homeData = await getHomeData();
  const isZh = locale === "zh";

  return (
    <div className="min-h-screen bg-background">
      <Header locale={locale} />

      <main>
        <HeroSection locale={locale} />
        <AboutSection features={homeData.aboutFeatures} locale={locale} />
        <ProjectsSection projects={homeData.projects} locale={locale} />
        <CommunitySection roles={homeData.communityRoles} locale={locale} />
      </main>

      {/* Simple Footer */}
      <footer className="border-t bg-muted/30">
        <div className="container px-4 py-8 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              {isZh
                ? "© 2024 Code for Taiwan. 致力於用科技讓台灣更美好。"
                : "© 2024 Code for Taiwan. Committed to making Taiwan better through technology."
              }
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}