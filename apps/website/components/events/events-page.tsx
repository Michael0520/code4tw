"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, MapPin, Users, Search, Filter, ArrowRight, ExternalLink } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface EventsPageProps {
  locale: string;
}

const eventsData = [
  {
    id: 1,
    title: "g0v 雙月黑客松",
    title_en: "g0v Bimonthly Hackathon",
    description_zh: "g0v 社群每兩個月舉辦的黑客松活動，歡迎所有對公民科技有興趣的朋友參與",
    description_en: "Bimonthly hackathon by g0v community, welcoming all interested in civic technology",
    date: "2024-04-27",
    time: "09:00 - 18:00",
    location: "台北",
    location_en: "Taipei",
    venue: "社會創新實驗中心",
    venue_en: "Social Innovation Lab",
    category: "hackathon",
    attendees: 120,
    featured: true,
    status: "upcoming",
    registrationUrl: "https://g0v.hackmd.io",
    image: "/events-hackathon-collaboration.jpg",
  },
  {
    id: 2,
    title: "開放資料工作坊",
    title_en: "Open Data Workshop",
    description_zh: "學習如何使用開放資料進行專案開發，適合初學者參與",
    description_en: "Learn how to use open data for project development, suitable for beginners",
    date: "2024-05-15",
    time: "14:00 - 17:00",
    location: "台中",
    location_en: "Taichung",
    venue: "台中市政府資訊中心",
    venue_en: "Taichung City Government IT Center",
    category: "workshop",
    attendees: 40,
    featured: false,
    status: "upcoming",
    registrationUrl: "https://workshop.g0v.tw",
    image: "/events-open-data-workshop.jpg",
  },
  {
    id: 3,
    title: "數位民主論壇",
    title_en: "Digital Democracy Forum",
    description_zh: "探討數位時代的民主參與模式與未來發展",
    description_en: "Exploring democratic participation models and future development in the digital age",
    date: "2024-06-08",
    time: "10:00 - 16:00",
    location: "高雄",
    location_en: "Kaohsiung",
    venue: "高雄展覽館",
    venue_en: "Kaohsiung Exhibition Center",
    category: "conference",
    attendees: 200,
    featured: false,
    status: "upcoming",
    registrationUrl: "https://forum.gov.tw",
    image: "/events-digital-democracy-forum.jpg",
  },
  {
    id: 4,
    title: "公民科技入門課程",
    title_en: "Civic Tech Beginner Course",
    description_zh: "為期一個月的線上課程，從零開始學習公民科技",
    description_en: "One-month online course to learn civic technology from scratch",
    date: "2024-07-01",
    time: "19:00 - 21:00",
    location: "線上",
    location_en: "Online",
    venue: "Zoom 會議室",
    venue_en: "Zoom Meeting Room",
    category: "course",
    attendees: 80,
    featured: false,
    status: "upcoming",
    registrationUrl: "https://course.g0v.tw",
    image: "/events-civic-tech-course.jpg",
  },
  {
    id: 5,
    title: "Code for Taiwan 年會",
    title_en: "Code for Taiwan Annual Conference",
    description_zh: "年度最大型的公民科技聚會，分享一年來的成果與未來展望",
    description_en: "The largest annual civic tech gathering, sharing achievements and future prospects",
    date: "2024-03-16",
    time: "09:00 - 18:00",
    location: "台北",
    location_en: "Taipei",
    venue: "台大醫院國際會議中心",
    venue_en: "NTU Hospital International Convention Center",
    category: "conference",
    attendees: 300,
    featured: false,
    status: "past",
    registrationUrl: "https://conf2024.g0v.tw",
    image: "/events-annual-conference.jpg",
  },
];

const categories = [
  { value: "all", label_zh: "全部類型", label_en: "All Types" },
  { value: "hackathon", label_zh: "黑客松", label_en: "Hackathon" },
  { value: "workshop", label_zh: "工作坊", label_en: "Workshop" },
  { value: "conference", label_zh: "會議", label_en: "Conference" },
  { value: "course", label_zh: "課程", label_en: "Course" },
];

const statuses = [
  { value: "all", label_zh: "全部狀態", label_en: "All Status" },
  { value: "upcoming", label_zh: "即將舉行", label_en: "Upcoming" },
  { value: "past", label_zh: "已結束", label_en: "Past" },
];

export function EventsPage({ locale }: EventsPageProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")

  const filteredEvents = eventsData.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.title_en.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description_zh.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description_en.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = selectedCategory === "all" || event.category === selectedCategory
    const matchesStatus = selectedStatus === "all" || event.status === selectedStatus

    return matchesSearch && matchesCategory && matchesStatus
  })

  const featuredEvent = filteredEvents.find((event) => event.featured)
  const regularEvents = filteredEvents.filter((event) => !event.featured)

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-16 sm:py-24 bg-gradient-to-br from-background via-background to-muted/20">
          <div className="container px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl text-balance">
                {locale === "zh" ? "活動資訊" : "Events"}
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground text-pretty">
                {locale === "zh"
                  ? "參與 Code for Taiwan 的各種活動，包括黑客松、工作坊、會議和課程，與志同道合的夥伴一起學習成長。"
                  : "Join Code for Taiwan's various events, including hackathons, workshops, conferences, and courses. Learn and grow with like-minded partners."}
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
                    placeholder={locale === "zh" ? "搜尋活動..." : "Search events..."}
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
                          {locale === "zh" ? category.label_zh : category.label_en}
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
                          {locale === "zh" ? status.label_zh : status.label_en}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                {locale === "zh"
                  ? `找到 ${filteredEvents.length} 個活動`
                  : `Found ${filteredEvents.length} events`}
              </div>
            </div>
          </div>
        </section>

        {/* Featured Event */}
        {featuredEvent && (
          <section className="py-16">
            <div className="container px-4 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-4xl">
                <Badge className="mb-4">{locale === "zh" ? "精選活動" : "Featured Event"}</Badge>
                <Card className="overflow-hidden border-0 bg-card/80 backdrop-blur-sm">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                    <div className="aspect-video lg:aspect-square overflow-hidden">
                      <Image
                        src={featuredEvent.image || "/placeholder.svg"}
                        alt={locale === "zh" ? featuredEvent.title : featuredEvent.title_en}
                        width={600}
                        height={400}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-8 flex flex-col justify-center">
                      <Badge variant="secondary" className="w-fit mb-4">
                        {locale === "zh"
                          ? categories.find((c) => c.value === featuredEvent.category)?.label_zh
                          : categories.find((c) => c.value === featuredEvent.category)?.label_en}
                      </Badge>
                      <h2 className="text-2xl font-bold mb-4 text-balance">
                        {locale === "zh" ? featuredEvent.title : featuredEvent.title_en}
                      </h2>
                      <p className="text-muted-foreground mb-6 leading-relaxed">
                        {locale === "zh" ? featuredEvent.description_zh : featuredEvent.description_en}
                      </p>
                      <div className="space-y-2 text-sm text-muted-foreground mb-6">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2" />
                          <span>{featuredEvent.date} • {featuredEvent.time}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2" />
                          <span>{locale === "zh" ? featuredEvent.venue : featuredEvent.venue_en}</span>
                        </div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-2" />
                          <span>{featuredEvent.attendees} {locale === "zh" ? "人參與" : "attendees"}</span>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <Button asChild>
                          <Link href={featuredEvent.registrationUrl} target="_blank" rel="noopener noreferrer">
                            {locale === "zh" ? "立即報名" : "Register Now"}
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                        <Button variant="outline" asChild>
                          <Link href={featuredEvent.registrationUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-2 h-4 w-4" />
                            {locale === "zh" ? "了解更多" : "Learn More"}
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              </div>
            </div>
          </section>
        )}

        {/* Events Grid */}
        <section className="py-16 bg-muted/30">
          <div className="container px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {regularEvents.map((event) => (
                <Card
                  key={event.id}
                  className="group hover:shadow-lg transition-all duration-300 border-0 bg-card/80 backdrop-blur-sm overflow-hidden"
                >
                  <div className="aspect-video overflow-hidden">
                    <Image
                      src={event.image || "/placeholder.svg"}
                      alt={locale === "zh" ? event.title : event.title_en}
                      width={400}
                      height={225}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardHeader className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary" className="text-xs">
                        {locale === "zh"
                          ? categories.find((c) => c.value === event.category)?.label_zh
                          : categories.find((c) => c.value === event.category)?.label_en}
                      </Badge>
                      <Badge variant={event.status === "upcoming" ? "default" : "outline"} className="text-xs">
                        {event.status === "upcoming"
                          ? locale === "zh"
                            ? "即將舉行"
                            : "Upcoming"
                          : locale === "zh"
                            ? "已結束"
                            : "Past"}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg mb-2">
                      {locale === "zh" ? event.title : event.title_en}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                      {locale === "zh" ? event.description_zh : event.description_en}
                    </p>
                    <div className="space-y-2 text-xs text-muted-foreground mb-4">
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-2" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-2" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-3 w-3 mr-2" />
                        <span>{locale === "zh" ? event.location : event.location_en}</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="w-fit p-0 h-auto group" asChild>
                      <Link href={event.registrationUrl} target="_blank" rel="noopener noreferrer">
                        {locale === "zh" ? "查看詳情" : "View Details"}
                        <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </CardHeader>
                </Card>
              ))}
            </div>

            {filteredEvents.length === 0 && (
              <div className="text-center py-16">
                <div className="text-muted-foreground mb-4">
                  {locale === "zh" ? "沒有找到符合條件的活動" : "No events found matching your criteria"}
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

        {/* Newsletter Signup */}
        <section className="py-16">
          <div className="container px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground mb-4">
                {locale === "zh" ? "訂閱活動通知" : "Subscribe to Event Updates"}
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                {locale === "zh"
                  ? "第一時間獲得最新活動資訊和報名通知。"
                  : "Get the latest event information and registration notifications."}
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