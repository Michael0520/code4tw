"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ExternalLink, Github, Star, GitFork, Search, Filter } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { PROJECTS_CONFIG, STATIC_PROJECTS_DATA } from "@/lib/features/projects/config/index"
import { useTranslations } from "next-intl"

interface ProjectsPageProps {
  locale: string;
}

export function ProjectsPage({ locale }: ProjectsPageProps) {
  const t = useTranslations('projects')
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")

  const projects = STATIC_PROJECTS_DATA

  const filteredProjects = projects.filter((project) => {
    const projectKey = project.titleKey.replace('projects.', '')
    const projectTitle = t(`${projectKey}.title`)
    const projectDescription = t(`${projectKey}.description`)

    const matchesSearch =
      projectTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      projectDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCategory = selectedCategory === "all" || project.category === selectedCategory
    const matchesStatus = selectedStatus === "all" || project.status === selectedStatus

    return matchesSearch && matchesCategory && matchesStatus
  })

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-16 sm:py-24 bg-gradient-to-br from-background via-background to-muted/20">
          <div className="container px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl text-balance">
                {t("projects.title")}
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground text-pretty">
                {t("projects.description")}
              </p>
            </div>
          </div>
        </section>

        {/* Filters Section */}
        <section className="py-8 border-b bg-muted/30">
          <div className="container px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-4 items-center w-full sm:w-auto">
                <div className="relative w-full sm:w-80">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder={t("projects.search.placeholder")}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-full sm:w-40">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {PROJECTS_CONFIG.categories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {t(category.labelKey)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger className="w-full sm:w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {PROJECTS_CONFIG.statuses.map((status) => (
                        <SelectItem key={status.value} value={status.value}>
                          {t(status.labelKey)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                {t("projects.found", { count: filteredProjects.length })}
              </div>
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-16">
          <div className="container px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProjects.map((project) => (
                <Card
                  key={project.id}
                  className="group hover:shadow-lg transition-all duration-300 border-0 bg-card/80 backdrop-blur-sm overflow-hidden"
                >
                  <div className="aspect-video overflow-hidden">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={t(`${project.titleKey.replace('projects.', '')}.title`)}
                      width={400}
                      height={225}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-2">
                          {t(`${project.titleKey.replace('projects.', '')}.title`)}
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
                          <Badge variant={project.status === "active" ? "default" : "secondary"} className="text-xs">
                            {project.status === "active"
                              ? locale === "zh"
                                ? "進行中"
                                : "Active"
                              : locale === "zh"
                                ? "已封存"
                                : "Archived"}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4 leading-relaxed text-sm">
                      {t(`${project.titleKey.replace('projects.', '')}.description`)}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.slice(0, 3).map((tag, tagIndex) => (
                        <Badge key={tagIndex} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {project.tags.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{project.tags.length - 3}
                        </Badge>
                      )}
                    </div>

                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={project.github} target="_blank" rel="noopener noreferrer">
                          <Github className="h-4 w-4 mr-1" />
                          {locale === "zh" ? "原始碼" : "Source"}
                        </Link>
                      </Button>
                      {project.website && (
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={project.website} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4 mr-1" />
                            {locale === "zh" ? "網站" : "Website"}
                          </Link>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredProjects.length === 0 && (
              <div className="text-center py-16">
                <div className="text-muted-foreground mb-4">
                  {locale === "zh" ? "沒有找到符合條件的專案" : "No projects found matching your criteria"}
                </div>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedCategory("all")
                    setSelectedStatus("all")
                  }}
                >
                  {locale === "zh" ? "清除篩選" : "Clear Filters"}
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-muted/30">
          <div className="container px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground mb-4">
                {locale === "zh" ? "想要貢獻專案？" : "Want to Contribute?"}
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                {locale === "zh"
                  ? "我們歡迎各種形式的貢獻，無論是程式碼、設計、文件或是想法。"
                  : "We welcome all forms of contributions, whether it's code, design, documentation, or ideas."}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link href="https://github.com/g0v" target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    {locale === "zh" ? "查看 GitHub" : "View GitHub"}
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href={`/${locale}/about`}>{locale === "zh" ? "了解更多" : "Learn More"}</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Simple Footer */}
      <footer className="border-t bg-muted/30">
        <div className="container px-4 py-8 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              {locale === "zh"
                ? "© 2024 Code for Taiwan. 致力於用科技讓台灣更美好。"
                : "© 2024 Code for Taiwan. Committed to making Taiwan better through technology."}
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}