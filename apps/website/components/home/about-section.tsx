import type { AboutFeature } from "@/lib/features/home/config";

interface AboutSectionProps {
  features: AboutFeature[];
  locale: string;
}

export function AboutSection({ features, locale }: AboutSectionProps) {
  const isZh = locale === "zh";

  return (
    <section className="py-24 sm:py-32">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-4 inline-flex items-center rounded-full border px-3 py-1 text-sm">
            {isZh ? "關於我們" : "About Us"}
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {isZh ? "我們的使命與價值" : "Our Mission and Values"}
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            {isZh
              ? "Code for Taiwan 致力於透過開源協作，建立更開放、透明、參與式的數位民主社會。我們相信科技應該服務於人民，而非相反。"
              : "Code for Taiwan is committed to building a more open, transparent, and participatory digital democracy through open source collaboration. We believe technology should serve the people, not the other way around."
            }
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-5xl">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div key={feature.id} className="rounded-lg border bg-card p-6">
                <div className="rounded-lg bg-primary/10 p-3 w-fit mb-4">
                  <div className="h-6 w-6 bg-primary rounded"></div>
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}