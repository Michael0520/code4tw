"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MessageSquare, Mail, Slack, Facebook } from "lucide-react"
import Link from "next/link"
import { useLanguageContext } from "@/components/language-provider"

export function CommunitySection() {
  const { language } = useLanguageContext()
  const [email, setEmail] = useState("")

  const communityLinks = [
    {
      icon: Slack,
      name: "Slack",
      description_zh: "即時討論與協作",
      description_en: "Real-time discussion and collaboration",
      href: "https://g0v.hackmd.io/about",
    },
    {
      icon: Facebook,
      name: "Facebook",
      description_zh: "社群動態與活動公告",
      description_en: "Community updates and event announcements",
      href: "https://www.facebook.com/g0v.tw",
    },
    {
      icon: MessageSquare,
      name: "HackMD",
      description_zh: "共筆文件與會議記錄",
      description_en: "Collaborative documents and meeting notes",
      href: "https://g0v.hackmd.io/",
    },
  ]

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter subscription
    console.log("Subscribe:", email)
    setEmail("")
  }

  return (
    <section className="py-24 sm:py-32 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5 z-10" />
        <div className="absolute inset-0 bg-[url('/grid-pattern.jpg')] opacity-5 z-5" />
      </div>

      <div className="container px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="outline" className="mb-4">
            {language === "zh" ? "社群參與" : "Community"}
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            {language === "zh" ? "加入我們的社群" : "Join Our Community"}
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground text-pretty">
            {language === "zh"
              ? "透過多種管道參與社群活動，與志同道合的夥伴一起為台灣的數位民主努力。"
              : "Participate in community activities through various channels and work with like-minded partners for Taiwan's digital democracy."}
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-5xl">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {communityLinks.map((link, index) => {
              const Icon = link.icon
              return (
                <Card
                  key={index}
                  className="group hover:shadow-lg transition-all duration-300 border-0 bg-card/50 backdrop-blur-sm hover:bg-card/80"
                >
                  <CardContent className="p-6 text-center">
                    <div className="rounded-full bg-primary/10 p-4 w-fit mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{link.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {language === "zh" ? link.description_zh : link.description_en}
                    </p>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={link.href} target="_blank" rel="noopener noreferrer">
                        {language === "zh" ? "加入" : "Join"}
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        <div className="mx-auto mt-16 max-w-2xl">
          <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <Mail className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">
                  {language === "zh" ? "訂閱電子報" : "Subscribe to Newsletter"}
                </h3>
                <p className="text-muted-foreground">
                  {language === "zh"
                    ? "獲取最新的專案動態、活動資訊和社群消息"
                    : "Get the latest project updates, event information, and community news"}
                </p>
              </div>

              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4">
                <Input
                  type="email"
                  placeholder={language === "zh" ? "輸入您的電子郵件" : "Enter your email"}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1"
                  required
                />
                <Button type="submit" className="sm:w-auto">
                  {language === "zh" ? "訂閱" : "Subscribe"}
                </Button>
              </form>

              <p className="text-xs text-muted-foreground mt-4 text-center">
                {language === "zh"
                  ? "我們尊重您的隱私，不會將您的資料分享給第三方。"
                  : "We respect your privacy and will not share your data with third parties."}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mx-auto mt-16 max-w-4xl">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 text-center">
            <div className="group">
              <div className="text-3xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform">
                500+
              </div>
              <div className="text-sm text-muted-foreground">
                {language === "zh" ? "活躍貢獻者" : "Active Contributors"}
              </div>
            </div>
            <div className="group">
              <div className="text-3xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform">
                100+
              </div>
              <div className="text-sm text-muted-foreground">
                {language === "zh" ? "開源專案" : "Open Source Projects"}
              </div>
            </div>
            <div className="group">
              <div className="text-3xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform">50+</div>
              <div className="text-sm text-muted-foreground">{language === "zh" ? "年度活動" : "Annual Events"}</div>
            </div>
            <div className="group">
              <div className="text-3xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform">10+</div>
              <div className="text-sm text-muted-foreground">
                {language === "zh" ? "年社群經驗" : "Years of Community"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
