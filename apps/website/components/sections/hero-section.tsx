"use client"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Code, Users, Lightbulb, Github } from "lucide-react"
import Link from "next/link"
import { useLanguageContext } from "@/components/language-provider"

export function HeroSection() {
  const { language, t } = useLanguageContext()

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/20">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/90 to-background/95 z-10" />
        <img
          src="/taiwan-tech-community-hero.jpg"
          alt="Taiwan tech community"
          className="w-full h-full object-cover opacity-20"
        />
      </div>

      <div className="container px-4 py-24 sm:px-6 sm:py-32 lg:px-8 relative z-20">
        <div className="mx-auto max-w-4xl text-center">
          <Badge variant="secondary" className="mb-6 text-sm font-medium">
            {t("hero.badge")}
          </Badge>

          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl text-balance">
            {t("hero.title")}
            <span className="text-primary"> {t("hero.title.highlight")}</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground text-pretty">
            {t("hero.description")}
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="group">
              {t("hero.join")}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="https://github.com/g0v" target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" />
                {t("hero.projects")}
              </Link>
            </Button>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="rounded-full bg-primary/10 p-3 mb-4">
                <Code className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">{t("feature.opensource")}</h3>
              <p className="text-sm text-muted-foreground mt-2">{t("feature.opensource.desc")}</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="rounded-full bg-primary/10 p-3 mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">{t("feature.community")}</h3>
              <p className="text-sm text-muted-foreground mt-2">{t("feature.community.desc")}</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="rounded-full bg-primary/10 p-3 mb-4">
                <Lightbulb className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">{t("feature.innovation")}</h3>
              <p className="text-sm text-muted-foreground mt-2">{t("feature.innovation.desc")}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[calc(50%-4rem)] top-10 -z-10 transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:left-48 lg:top-[calc(50%-30rem)] xl:left-[calc(50%-24rem)]">
          <div className="aspect-[1108/632] w-[69.25rem] bg-gradient-to-r from-primary/20 to-accent/20 opacity-20" />
        </div>
      </div>
    </section>
  )
}
