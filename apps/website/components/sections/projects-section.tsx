"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, Star, GitFork } from "lucide-react"
import Link from "next/link"
import { useLanguageContext } from "@/components/language-provider"

export function ProjectsSection() {
  const { language } = useLanguageContext()

  const projects = [
    {
      title: "vTaiwan",
      title_en: "vTaiwan",
      description_zh: "數位法規調適平台，讓公民參與法規制定過程",
      description_en: "Digital platform for regulatory adaptation with citizen participation",
      tags: ["Vue.js", "Node.js", "政策參與"],
      stars: 245,
      forks: 67,
      status: "active",
      github: "https://github.com/g0v/vtaiwan.tw",
      image: "/digital-democracy-platform-interface.jpg",
    },
    {
      title: "萌典",
      title_en: "Moedict",
      description_zh: "開放的線上國語、台語、客語辭典",
      description_en: "Open online dictionary for Mandarin, Taiwanese, and Hakka",
      tags: ["React", "API", "語言保存"],
      stars: 892,
      forks: 156,
      status: "active",
      github: "https://github.com/g0v/moedict-webkit",
      image: "/taiwanese-dictionary-interface.jpg",
    },
    {
      title: "立法院議事錄",
      title_en: "Legislative Records",
      description_zh: "立法院會議記錄搜尋與視覺化平台",
      description_en: "Search and visualization platform for legislative records",
      tags: ["Python", "Data Viz", "政府透明"],
      stars: 178,
      forks: 43,
      status: "active",
      github: "https://github.com/g0v/ly.g0v.tw",
      image: "/legislative-data-visualization-dashboard.jpg",
    },
    {
      title: "口罩地圖",
      title_en: "Mask Map",
      description_zh: "COVID-19 期間的即時口罩庫存地圖",
      description_en: "Real-time mask availability map during COVID-19",
      tags: ["React", "Maps API", "緊急應變"],
      stars: 1234,
      forks: 289,
      status: "archived",
      github: "https://github.com/g0v/mask-map",
      image: "/taiwan-mask-availability-map.jpg",
    },
  ]

  return (
    <section className="py-24 sm:py-32 bg-muted/30 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/grid-pattern.jpg')] opacity-5" />

      <div className="container px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="outline" className="mb-4">
            {language === "zh" ? "專案展示" : "Projects"}
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            {language === "zh" ? "我們的開源專案" : "Our Open Source Projects"}
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground text-pretty">
            {language === "zh"
              ? "這些專案展現了我們如何運用科技解決社會問題，每個專案都歡迎社群貢獻。"
              : "These projects showcase how we use technology to solve social problems. All projects welcome community contributions."}
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-6xl">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2">
            {projects.map((project, index) => (
              <Card
                key={index}
                className="group hover:shadow-lg transition-all duration-300 border-0 bg-card/80 backdrop-blur-sm overflow-hidden"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={language === "zh" ? project.title : project.title_en}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                  <Badge
                    variant={project.status === "active" ? "default" : "secondary"}
                    className="absolute top-4 right-4 text-xs"
                  >
                    {project.status === "active"
                      ? language === "zh"
                        ? "進行中"
                        : "Active"
                      : language === "zh"
                        ? "已封存"
                        : "Archived"}
                  </Badge>
                </div>

                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl mb-2">
                        {language === "zh" ? project.title : project.title_en}
                      </CardTitle>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4" />
                          <span>{project.stars}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <GitFork className="h-4 w-4" />
                          <span>{project.forks}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {language === "zh" ? project.description_zh : project.description_en}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4 mr-1" />
                        {language === "zh" ? "原始碼" : "Source"}
                      </Link>
                    </Button>
                    <Button variant="ghost" size="sm">
                      <ExternalLink className="h-4 w-4 mr-1" />
                      {language === "zh" ? "查看" : "View"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg" asChild>
              <Link href="https://github.com/g0v" target="_blank" rel="noopener noreferrer">
                {language === "zh" ? "查看所有專案" : "View All Projects"}
                <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
