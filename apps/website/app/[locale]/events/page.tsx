"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, MapPin, Users, Search, Filter, ExternalLink } from "lucide-react"
import Link from "next/link"

export default function EventsPage() {
  const [language] = useState<"zh" | "en">("zh")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")

  const events = [
    {
      id: 1,
      title: "g0v 黑客松 #58",
      title_en: "g0v Hackathon #58",
      description_zh: "每兩個月舉辦的 g0v 黑客松，歡迎所有對公民科技有興趣的朋友參加",
      description_en: "Bi-monthly g0v hackathon, welcoming all friends interested in civic technology",
      type: "hackathon",
      status: "upcoming",
      date: "2024-02-17",
      time: "09:00-18:00",
      location: "中央研究院人文社會科學館",
      location_en: "Academia Sinica Humanities and Social Sciences Building",
      capacity: 100,
      registered: 85,
      image: "/events-g0v-hackathon.jpg",
      registrationUrl: "https://g0v-jothon.kktix.cc/events/g0v-hackath58n",
      featured: true,
    },
    {
      id: 2,
      title: "開放資料工作坊",
      title_en: "Open Data Workshop",
      description_zh: "學習如何使用政府開放資料，並實作簡單的資料視覺化專案",
      description_en: "Learn how to use government open data and create simple data visualization projects",
      type: "workshop",
      status: "upcoming",
      date: "2024-02-10",
      time: "14:00-17:00",
      location: "台北市政府資訊局",
      location_en: "Taipei City Government Department of Information Technology",
      capacity: 30,
      registered: 22,
      image: "/events-open-data-workshop.jpg",
      registrationUrl: "https://example.com/register",
      featured: false,
    },
    {
      id: 3,
      title: "公民科技月聚",
      title_en: "Civic Tech Monthly Meetup",
      description_zh: "每月定期聚會，分享最新的公民科技專案和想法",
      description_en: "Monthly regular meetup to share the latest civic tech projects and ideas",
      type: "meetup",
      status: "upcoming",
      date: "2024-02-05",
      time: "19:00-21:00",
      location: "NPO HUB Taipei",
      location_en: "NPO HUB Taipei",
      capacity: 50,
      registered: 35,
      image: "/events-civic-tech-meetup.jpg",
      registrationUrl: "https://example.com/register",
      featured: false,
    },
    {
      id: 4,
      title: "vTaiwan 使用者研習",
      title_en: "vTaiwan User Training",
      description_zh: "深入了解 vTaiwan 平台的使用方法和參與數位法規調適的流程",
      description_en: "Deep dive into vTaiwan platform usage and digital regulatory adaptation process",
      type: "training",
      status: "past",
      date: "2024-01-20",
      time: "10:00-16:00",
      location: "線上活動",
      location_en: "Online Event",
      capacity: 80,
      registered: 65,
      image: "/events-vtaiwan-training.jpg",
      registrationUrl: "https://example.com/register",
      featured: false,
    },
    {
      id: 5,
      title: "開源貢獻新手村",
      title_en: "Open Source Contribution Bootcamp",
      description_zh: "專為新手設計的開源貢獻教學活動，從 Git 基礎到 PR 提交",
      description_en: "Beginner-friendly open source contribution tutorial, from Git basics to PR submission",
      type: "workshop",
      status: "past",
      date: "2024-01-15",
      time: "13:00-17:00",
      location: "台大資工系",
      location_en: "NTU Computer Science Department",
      capacity: 40,
      registered: 38,
      image: "/events-open-source-bootcamp.jpg",
      registrationUrl: "https://example.com/register",
      featured: false,
    },
    {
      id: 6,
      title: "數位民主論壇",
      title_en: "Digital Democracy Forum",
      description_zh: "探討數位時代的民主參與模式和公民科技的角色",
      description_en: "Exploring democratic participation models and the role of civic tech in the digital age",
      type: "conference",
      status: "past",
      date: "2024-01-10",
      time: "09:00-17:00",
      location: "台北國際會議中心",
      location_en: "Taipei International Convention Center",
      capacity: 200,
      registered: 180,
      image: "/events-digital-democracy-forum.jpg",
      registrationUrl: "https://example.com/register",
      featured: false,
    },
  ]

  const eventTypes = [
    { value: "all", label_zh: "全部類型", label_en: "All Types" },
    { value: "hackathon", label_zh: "黑客松", label_en: "Hackathon" },
    { value: "workshop", label_zh: "工作坊", label_en: "Workshop" },
    { value: "meetup", label_zh: "聚會", label_en: "Meetup" },
    { value: "training", label_zh: "培訓", label_en: "Training" },
    { value: "conference", label_zh: "會議", label_en: "Conference" },
  ]

  const eventStatuses = [
    { value: "all", label_zh: "全部狀態", label_en: "All Status" },
    { value: "upcoming", label_zh: "即將舉行", label_en: "Upcoming" },
    { value: "past", label_zh: "已結束", label_en: "Past Events" },
  ]

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.title_en.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description_zh.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description_en.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesType = selectedType === "all" || event.type === selectedType
    const matchesStatus = selectedStatus === "all" || event.status === selectedStatus

    return matchesSearch && matchesType && matchesStatus
  })

  const upcomingEvents = filteredEvents.filter((event) => event.status === "upcoming")
  const pastEvents = filteredEvents.filter((event) => event.status === "past")

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-16 sm:py-24 bg-gradient-to-br from-background via-background to-muted/20">
          <div className="container px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl text-balance">
                {language === "zh" ? "活動資訊" : "Events"}
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground text-pretty">
                {language === "zh"
                  ? "參加我們的活動，與志同道合的夥伴一起學習、交流和協作。"
                  : "Join our events to learn, exchange ideas, and collaborate with like-minded partners."}
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
                    placeholder={language === "zh" ? "搜尋活動..." : "Search events..."}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger className="w-full sm:w-40">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {eventTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {language === "zh" ? type.label_zh : type.label_en}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger className="w-full sm:w-36">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {eventStatuses.map((status) => (
                        <SelectItem key={status.value} value={status.value}>
                          {language === "zh" ? status.label_zh : status.label_en}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                {language === "zh" ? `找到 ${filteredEvents.length} 個活動` : `Found ${filteredEvents.length} events`}
              </div>
            </div>
          </div>
        </section>

        {/* Upcoming Events */}
        {upcomingEvents.length > 0 && (
          <section className="py-16">
            <div className="container px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-bold mb-8">{language === "zh" ? "即將舉行" : "Upcoming Events"}</h2>
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                {upcomingEvents.map((event) => (
                  <Card
                    key={event.id}
                    className={`group hover:shadow-lg transition-all duration-300 border-0 bg-card/80 backdrop-blur-sm overflow-hidden ${
                      event.featured ? "lg:col-span-2" : ""
                    }`}
                  >
                    <div className={`grid gap-0 ${event.featured ? "lg:grid-cols-2" : "grid-cols-1"}`}>
                      <div
                        className={`${event.featured ? "aspect-video lg:aspect-square" : "aspect-video"} overflow-hidden`}
                      >
                        <img
                          src={event.image || "/placeholder.svg"}
                          alt={language === "zh" ? event.title : event.title_en}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <Badge variant="default" className="text-xs">
                            {language === "zh"
                              ? eventTypes.find((t) => t.value === event.type)?.label_zh
                              : eventTypes.find((t) => t.value === event.type)?.label_en}
                          </Badge>
                          {event.featured && (
                            <Badge variant="secondary" className="text-xs">
                              {language === "zh" ? "精選活動" : "Featured"}
                            </Badge>
                          )}
                        </div>
                        <CardTitle className={`mb-3 text-balance ${event.featured ? "text-2xl" : "text-lg"}`}>
                          {language === "zh" ? event.title : event.title_en}
                        </CardTitle>
                        <p className="text-muted-foreground mb-4 leading-relaxed text-sm">
                          {language === "zh" ? event.description_zh : event.description_en}
                        </p>
                        <div className="space-y-2 mb-6">
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4 mr-2" />
                            <span className="mr-4">{event.date}</span>
                            <Clock className="h-4 w-4 mr-2" />
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4 mr-2" />
                            <span>{language === "zh" ? event.location : event.location_en}</span>
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Users className="h-4 w-4 mr-2" />
                            <span>
                              {event.registered}/{event.capacity} {language === "zh" ? "人已報名" : "registered"}
                            </span>
                          </div>
                        </div>
                        <Button asChild className="w-full sm:w-auto">
                          <Link href={event.registrationUrl} target="_blank" rel="noopener noreferrer">
                            {language === "zh" ? "立即報名" : "Register Now"}
                            <ExternalLink className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Past Events */}
        {pastEvents.length > 0 && (
          <section className="py-16 bg-muted/30">
            <div className="container px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-bold mb-8">{language === "zh" ? "過往活動" : "Past Events"}</h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {pastEvents.map((event) => (
                  <Card
                    key={event.id}
                    className="group hover:shadow-lg transition-all duration-300 border-0 bg-card/80 backdrop-blur-sm overflow-hidden"
                  >
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={event.image || "/placeholder.svg"}
                        alt={language === "zh" ? event.title : event.title_en}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardHeader className="p-4">
                      <Badge variant="outline" className="w-fit mb-2 text-xs">
                        {language === "zh"
                          ? eventTypes.find((t) => t.value === event.type)?.label_zh
                          : eventTypes.find((t) => t.value === event.type)?.label_en}
                      </Badge>
                      <CardTitle className="text-lg mb-2 text-balance">
                        {language === "zh" ? event.title : event.title_en}
                      </CardTitle>
                      <div className="space-y-1 text-xs text-muted-foreground">
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center">
                          <Users className="h-3 w-3 mr-1" />
                          <span>
                            {event.registered} {language === "zh" ? "人參加" : "attendees"}
                          </span>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {filteredEvents.length === 0 && (
          <section className="py-16">
            <div className="container px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <div className="text-muted-foreground mb-4">
                  {language === "zh" ? "沒有找到符合條件的活動" : "No events found matching your criteria"}
                </div>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedType("all")
                    setSelectedStatus("all")
                  }}
                >
                  {language === "zh" ? "清除篩選" : "Clear Filters"}
                </Button>
              </div>
            </div>
          </section>
        )}

        {/* Call to Action */}
        <section className="py-16">
          <div className="container px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground mb-4">
                {language === "zh" ? "想要舉辦活動？" : "Want to Host an Event?"}
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                {language === "zh"
                  ? "如果您有想法想要與社群分享，歡迎聯絡我們討論舉辦活動的可能性。"
                  : "If you have ideas to share with the community, feel free to contact us to discuss hosting an event."}
              </p>
              <Button size="lg" asChild>
                <Link href="/contact">{language === "zh" ? "聯絡我們" : "Contact Us"}</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
