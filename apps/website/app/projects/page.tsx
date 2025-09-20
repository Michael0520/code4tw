"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ExternalLink, Github, Star, GitFork, Search, Filter } from "lucide-react"
import Link from "next/link"

export default function ProjectsPage() {
  const [language] = useState<"zh" | "en">("zh")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")

  const projects = [
    {
      id: 1,
      title: "vTaiwan",
      title_en: "vTaiwan",
      description_zh: "數位法規調適平台，讓公民參與法規制定過程，促進政府與民間的對話",
      description_en:
        "Digital platform for regulatory adaptation with citizen participation, facilitating dialogue between government and civil society",
      tags: ["Vue.js", "Node.js", "政策參與", "數位民主"],
      category: "governance",
      stars: 245,
      forks: 67,
      status: "active",
      github: "https://github.com/g0v/vtaiwan.tw",
      website: "https://vtaiwan.tw",
      image: "/digital-democracy-platform-interface.jpg",
    },
    {
      id: 2,
      title: "萌典",
      title_en: "Moedict",
      description_zh: "開放的線上國語、台語、客語辭典，保存台灣多元語言文化",
      description_en:
        "Open online dictionary for Mandarin, Taiwanese, and Hakka, preserving Taiwan's diverse linguistic culture",
      tags: ["React", "API", "語言保存", "文化"],
      category: "culture",
      stars: 892,
      forks: 156,
      status: "active",
      github: "https://github.com/g0v/moedict-webkit",
      website: "https://moedict.tw",
      image: "/taiwanese-dictionary-interface.jpg",
    },
    {
      id: 3,
      title: "立法院議事錄",
      title_en: "Legislative Records",
      description_zh: "立法院會議記錄搜尋與視覺化平台，讓民眾更容易了解立法過程",
      description_en:
        "Search and visualization platform for legislative records, making the legislative process more accessible to citizens",
      tags: ["Python", "Data Viz", "政府透明", "開放資料"],
      category: "transparency",
      stars: 178,
      forks: 43,
      status: "active",
      github: "https://github.com/g0v/ly.g0v.tw",
      website: "https://ly.g0v.tw",
      image: "/legislative-data-visualization-dashboard.jpg",
    },
    {
      id: 4,
      title: "口罩地圖",
      title_en: "Mask Map",
      description_zh: "COVID-19 期間的即時口罩庫存地圖，協助民眾快速找到口罩販售點",
      description_en: "Real-time mask availability map during COVID-19, helping citizens quickly find mask retailers",
      tags: ["React", "Maps API", "緊急應變", "公共衛生"],
      category: "health",
      stars: 1234,
      forks: 289,
      status: "archived",
      github: "https://github.com/g0v/mask-map",
      website: "https://mask.g0v.tw",
      image: "/taiwan-mask-availability-map.jpg",
    },
    {
      id: 5,
      title: "預算視覺化",
      title_en: "Budget Visualization",
      description_zh: "政府預算資料視覺化平台，讓複雜的預算資訊變得易懂",
      description_en: "Government budget data visualization platform, making complex budget information understandable",
      tags: ["D3.js", "React", "資料視覺化", "財政透明"],
      category: "transparency",
      stars: 156,
      forks: 34,
      status: "active",
      github: "https://github.com/g0v/budget.g0v.tw",
      website: "https://budget.g0v.tw",
      image: "/government-budget-visualization-charts.jpg",
    },
    {
      id: 6,
      title: "選舉黃頁",
      title_en: "Election Yellow Pages",
      description_zh: "候選人資訊整合平台，提供選民完整的候選人背景資料",
      description_en:
        "Candidate information integration platform, providing voters with comprehensive candidate background data",
      tags: ["Next.js", "Database", "選舉", "民主參與"],
      category: "governance",
      stars: 89,
      forks: 23,
      status: "active",
      github: "https://github.com/g0v/vote.ly.g0v.tw",
      website: "https://vote.ly.g0v.tw",
      image: "/election-candidate-information-platform.jpg",
    },
  ]

  const categories = [
    { value: "all", label_zh: "全部", label_en: "All" },
    { value: "governance", label_zh: "政府治理", label_en: "Governance" },
    { value: "transparency", label_zh: "政府透明", label_en: "Transparency" },
    { value: "culture", label_zh: "文化保存", label_en: "Culture" },
    { value: "health", label_zh: "公共衛生", label_en: "Public Health" },
  ]

  const statuses = [
    { value: "all", label_zh: "全部狀態", label_en: "All Status" },
    { value: "active", label_zh: "進行中", label_en: "Active" },
    { value: "archived", label_zh: "已封存", label_en: "Archived" },
  ]

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.title_en.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description_zh.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description_en.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
                {language === "zh" ? "開源專案" : "Open Source Projects"}
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground text-pretty">
                {language === "zh"
                  ? "探索我們的開源專案，每個專案都致力於解決社會問題，歡迎您的參與和貢獻。"
                  : "Explore our open source projects, each dedicated to solving social problems. Your participation and contributions are welcome."}
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
                    placeholder={language === "zh" ? "搜尋專案..." : "Search projects..."}
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
                      {categories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {language === "zh" ? category.label_zh : category.label_en}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger className="w-full sm:w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {statuses.map((status) => (
                        <SelectItem key={status.value} value={status.value}>
                          {language === "zh" ? status.label_zh : status.label_en}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                {language === "zh"
                  ? `找到 ${filteredProjects.length} 個專案`
                  : `Found ${filteredProjects.length} projects`}
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
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={language === "zh" ? project.title : project.title_en}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
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
                          <Badge variant={project.status === "active" ? "default" : "secondary"} className="text-xs">
                            {project.status === "active"
                              ? language === "zh"
                                ? "進行中"
                                : "Active"
                              : language === "zh"
                                ? "已封存"
                                : "Archived"}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4 leading-relaxed text-sm">
                      {language === "zh" ? project.description_zh : project.description_en}
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
                          {language === "zh" ? "原始碼" : "Source"}
                        </Link>
                      </Button>
                      {project.website && (
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={project.website} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4 mr-1" />
                            {language === "zh" ? "網站" : "Website"}
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
                  {language === "zh" ? "沒有找到符合條件的專案" : "No projects found matching your criteria"}
                </div>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedCategory("all")
                    setSelectedStatus("all")
                  }}
                >
                  {language === "zh" ? "清除篩選" : "Clear Filters"}
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
                {language === "zh" ? "想要貢獻專案？" : "Want to Contribute?"}
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                {language === "zh"
                  ? "我們歡迎各種形式的貢獻，無論是程式碼、設計、文件或是想法。"
                  : "We welcome all forms of contributions, whether it's code, design, documentation, or ideas."}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link href="https://github.com/g0v" target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    {language === "zh" ? "查看 GitHub" : "View GitHub"}
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/about">{language === "zh" ? "了解更多" : "Learn More"}</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
