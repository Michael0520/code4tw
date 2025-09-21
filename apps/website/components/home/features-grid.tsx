import Link from "next/link";
import type { HomeFeature } from "@/lib/features/home/config";

interface FeaturesGridProps {
  features: HomeFeature[];
  locale: string;
}

const featureTexts = {
  openSource: {
    zh: { title: "開源協作", description: "所有專案皆開源，歡迎社群成員共同貢獻" },
    en: { title: "Open Source", description: "All projects are open source and welcome contributions from the community" }
  },
  community: {
    zh: { title: "社群驅動", description: "由志工組成的多元社群，共同為社會影響力而努力" },
    en: { title: "Community Driven", description: "Diverse community of volunteers working together for social impact" }
  },
  innovation: {
    zh: { title: "創新解決", description: "運用現代科技，為社會挑戰提供創新解決方案" },
    en: { title: "Innovation", description: "Innovative solutions for social challenges using modern technology" }
  },
  transparency: {
    zh: { title: "政府透明", description: "打造工具讓政府更加透明且負責任" },
    en: { title: "Government Transparency", description: "Building tools to make government more transparent and accountable" }
  }
};

export function FeaturesGrid({ features, locale }: FeaturesGridProps) {
  const isZh = locale === "zh";

  return (
    <section className="py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature) => {
          const text = featureTexts[feature.id as keyof typeof featureTexts];
          const content = isZh ? text.zh : text.en;

          return (
            <Link
              key={feature.id}
              href={`/${locale}${feature.link}`}
              className="group p-8 rounded-xl bg-card border border-border hover:border-primary/20 hover:shadow-lg transition-all duration-300"
            >
              <div className="text-4xl mb-6 text-center group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h4 className="text-xl font-semibold mb-4 text-center">
                {content.title}
              </h4>
              <p className="text-muted-foreground text-center leading-relaxed">
                {content.description}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}