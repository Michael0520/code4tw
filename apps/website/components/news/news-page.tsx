"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, User, Search, Filter, ArrowRight } from "lucide-react"

interface NewsPageProps {
  locale: string;
}

const newsArticles = [
  {
    id: 1,
    title: "vTaiwan 平台新功能上線",
    title_en: "vTaiwan Platform New Features Launch",
    excerpt_zh: "vTaiwan 數位法規調適平台推出全新的討論功能，讓公民參與更加便利...",
    excerpt_en: "vTaiwan digital regulatory platform launches new discussion features for easier citizen participation...",
    category: "platform",
    author: "g0v 團隊",
    author_en: "g0v Team",
    date: "2024-01-15",
    readTime: 5,
    image: "/news-vtaiwan-platform-update.jpg",
    featured: true,
  },
  {
    id: 2,
    title: "2024 年度黑客松活動回顧",
    title_en: "2024 Annual Hackathon Review",
    excerpt_zh: "回顧今年度舉辦的各場黑客松活動，超過 500 位參與者共同創造了 50 個專案...",
    excerpt_en: "Review of this year's hackathon events, with over 500 participants creating 50 projects together...",
    category: "event",
    author: "活動組",
    author_en: "Event Team",
    date: "2024-01-10",
    readTime: 8,
    image: "/news-hackathon-collaboration.jpg",
    featured: false,
  },
  {
    id: 3,
    title: "開放資料政策新進展",
    title_en: "New Progress in Open Data Policy",
    excerpt_zh: "政府宣布新的開放資料政策，將有更多政府資料開放給民眾使用...",
    excerpt_en: "Government announces new open data policy, making more government data available to the public...",
    category: "policy",
    author: "政策研究組",
    author_en: "Policy Research Team",
    date: "2024-01-08",
    readTime: 6,
    image: "/news-open-data-policy.jpg",
    featured: false,
  },
  {
    id: 4,
    title: "萌典新增客語詞條",
    title_en: "Moedict Adds Hakka Entries",
    excerpt_zh: "萌典線上辭典新增 1000 筆客語詞條，持續推動台灣多元語言保存...",
    excerpt_en: "Moedict online dictionary adds 1000 Hakka entries, continuing to promote Taiwan's multilingual preservation...",
    category: "project",
    author: "萌典團隊",
    author_en: "Moedict Team",
    date: "2024-01-05",
    readTime: 4,
    image: "/news-moedict-hakka-language.jpg",
    featured: false,
  },
  {
    id: 5,
    title: "公民科技國際交流會議",
    title_en: "International Civic Tech Exchange Conference",
    excerpt_zh: "Code for Taiwan 參與國際公民科技交流會議，分享台灣經驗...",
    excerpt_en: "Code for Taiwan participates in international civic tech exchange conference, sharing Taiwan's experience...",
    category: "international",
    author: "國際事務組",
    author_en: "International Affairs Team",
    date: "2024-01-03",
    readTime: 7,
    image: "/news-international-civic-tech.jpg",
    featured: false,
  },
  {
    id: 6,
    title: "新手貢獻者指南發布",
    title_en: "Beginner Contributor Guide Released",
    excerpt_zh: "為了讓更多人參與開源專案，我們發布了詳細的新手貢獻者指南...",
    excerpt_en: "To encourage more people to participate in open source projects, we've released a detailed beginner contributor guide...",
    category: "community",
    author: "社群組",
    author_en: "Community Team",
    date: "2024-01-01",
    readTime: 3,
    image: "/news-contributor-guide.jpg",
    featured: false,
  },
];

const categories = [
  { value: "all", label_zh: "全部", label_en: "All" },
  { value: "platform", label_zh: "平台更新", label_en: "Platform Updates" },
  { value: "event", label_zh: "活動", label_en: "Events" },
  { value: "policy", label_zh: "政策", label_en: "Policy" },
  { value: "project", label_zh: "專案", label_en: "Projects" },
  { value: "international", label_zh: "國際交流", label_en: "International" },
  { value: "community", label_zh: "社群", label_en: "Community" },
];

export function NewsPage({ locale }: NewsPageProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const filteredArticles = newsArticles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.title_en.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt_zh.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt_en.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = selectedCategory === "all" || article.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const featuredArticle = filteredArticles.find((article) => article.featured)
  const regularArticles = filteredArticles.filter((article) => !article.featured)

  return (
    <div className="min-h-screen bg-background">
      <Header locale={locale} />
      <main>
        {/* Hero Section */}
        <section className="py-16 sm:py-24 bg-gradient-to-br from-background via-background to-muted/20">
          <div className="container px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl text-balance">
                {locale === "zh" ? "最新消息" : "Latest News"}
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground text-pretty">
                {locale === "zh"
                  ? "掌握 Code for Taiwan 的最新動態，包括專案更新、活動資訊和政策發展。"
                  : "Stay updated with Code for Taiwan's latest developments, including project updates, event information, and policy developments."}
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
                    placeholder={locale === "zh" ? "搜尋新聞..." : "Search news..."}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full sm:w-48">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {locale === "zh" ? category.label_zh : category.label_en}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="text-sm text-muted-foreground">
                {locale === "zh"
                  ? `找到 ${filteredArticles.length} 篇文章`
                  : `Found ${filteredArticles.length} articles`}
              </div>
            </div>
          </div>
        </section>

        {/* Featured Article */}
        {featuredArticle && (
          <section className="py-16">
            <div className="container px-4 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-4xl">
                <Badge className="mb-4">{locale === "zh" ? "精選文章" : "Featured Article"}</Badge>
                <Card className="overflow-hidden border-0 bg-card/80 backdrop-blur-sm">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                    <div className="aspect-video lg:aspect-square overflow-hidden">
                      <img
                        src={featuredArticle.image || "/placeholder.svg"}
                        alt={locale === "zh" ? featuredArticle.title : featuredArticle.title_en}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-8 flex flex-col justify-center">
                      <Badge variant="secondary" className="w-fit mb-4">
                        {locale === "zh"
                          ? categories.find((c) => c.value === featuredArticle.category)?.label_zh
                          : categories.find((c) => c.value === featuredArticle.category)?.label_en}
                      </Badge>
                      <h2 className="text-2xl font-bold mb-4 text-balance">
                        {locale === "zh" ? featuredArticle.title : featuredArticle.title_en}
                      </h2>
                      <p className="text-muted-foreground mb-6 leading-relaxed">
                        {locale === "zh" ? featuredArticle.excerpt_zh : featuredArticle.excerpt_en}
                      </p>
                      <div className="flex items-center text-sm text-muted-foreground mb-6">
                        <User className="h-4 w-4 mr-1" />
                        <span className="mr-4">
                          {locale === "zh" ? featuredArticle.author : featuredArticle.author_en}
                        </span>
                        <Calendar className="h-4 w-4 mr-1" />
                        <span className="mr-4">{featuredArticle.date}</span>
                        <Clock className="h-4 w-4 mr-1" />
                        <span>
                          {featuredArticle.readTime} {locale === "zh" ? "分鐘閱讀" : "min read"}
                        </span>
                      </div>
                      <Button className="w-fit group">
                        {locale === "zh" ? "閱讀全文" : "Read More"}
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </CardContent>
                  </div>
                </Card>
              </div>
            </div>
          </section>
        )}

        {/* News Grid */}
        <section className="py-16 bg-muted/30">
          <div className="container px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {regularArticles.map((article) => (
                <Card
                  key={article.id}
                  className="group hover:shadow-lg transition-all duration-300 border-0 bg-card/80 backdrop-blur-sm overflow-hidden"
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={article.image || "/placeholder.svg"}
                      alt={locale === "zh" ? article.title : article.title_en}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardHeader className="p-6">
                    <Badge variant="secondary" className="w-fit mb-2">
                      {locale === "zh"
                        ? categories.find((c) => c.value === article.category)?.label_zh
                        : categories.find((c) => c.value === article.category)?.label_en}
                    </Badge>
                    <h3 className="text-lg font-semibold mb-2 text-balance">
                      {locale === "zh" ? article.title : article.title_en}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                      {locale === "zh" ? article.excerpt_zh : article.excerpt_en}
                    </p>
                    <div className="flex items-center text-xs text-muted-foreground mb-4">
                      <User className="h-3 w-3 mr-1" />
                      <span className="mr-3">{locale === "zh" ? article.author : article.author_en}</span>
                      <Calendar className="h-3 w-3 mr-1" />
                      <span className="mr-3">{article.date}</span>
                      <Clock className="h-3 w-3 mr-1" />
                      <span>
                        {article.readTime} {locale === "zh" ? "分" : "min"}
                      </span>
                    </div>
                    <Button variant="ghost" size="sm" className="w-fit p-0 h-auto group">
                      {locale === "zh" ? "閱讀更多" : "Read More"}
                      <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </CardHeader>
                </Card>
              ))}
            </div>

            {filteredArticles.length === 0 && (
              <div className="text-center py-16">
                <div className="text-muted-foreground mb-4">
                  {locale === "zh" ? "沒有找到符合條件的文章" : "No articles found matching your criteria"}
                </div>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedCategory("all")
                  }}
                >
                  {locale === "zh" ? "清除篩選" : "Clear Filters"}
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="py-16">
          <div className="container px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground mb-4">
                {locale === "zh" ? "訂閱電子報" : "Subscribe to Newsletter"}
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                {locale === "zh"
                  ? "第一時間獲得最新消息和專案更新。"
                  : "Get the latest news and project updates delivered to your inbox."}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder={locale === "zh" ? "輸入您的電子郵件" : "Enter your email"}
                  className="flex-1"
                />
                <Button>{locale === "zh" ? "訂閱" : "Subscribe"}</Button>
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