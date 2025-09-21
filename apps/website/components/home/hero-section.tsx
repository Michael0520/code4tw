import Link from "next/link";

interface HeroSectionProps {
  locale: string;
}

export function HeroSection({ locale }: HeroSectionProps) {
  const isZh = locale === "zh";

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center rounded-full border px-4 py-2 text-sm font-medium">
            {isZh ? "開源 • 協作 • 公民科技" : "Open Source • Collaboration • Civic Tech"}
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            {isZh ? "用科技改變" : "Technology for"}
            <span className="text-primary">
              {isZh ? " 台灣社會" : " Social Good"}
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
            {isZh
              ? "Code for Taiwan 是一個開放的公民科技社群，匯聚開發者、設計師與公民，共同打造數位解決方案，讓政府更透明、社會更美好。"
              : "Code for Taiwan is an open civic tech community that brings together developers, designers, and citizens to build digital solutions for government transparency and social good."
            }
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={`/${locale}/about`}
              className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              {isZh ? "加入我們" : "Join Us"}
            </Link>
            <Link
              href="https://github.com/g0v"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-md border border-input bg-background px-6 py-3 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              {isZh ? "查看專案" : "View Projects"}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}