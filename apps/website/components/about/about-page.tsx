"use client"

import { Header } from "@/components/layout/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, Target, Heart, Globe, Github, ExternalLink, CheckCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useTranslations } from "next-intl"

interface AboutPageProps {
  locale: string;
}

const teamMembers = [
  {
    id: 1,
    name: "唐鳳",
    name_en: "Audrey Tang",
    role_zh: "數位發展部部長",
    role_en: "Minister of Digital Affairs",
    image: "/team-audrey-tang.jpg",
    expertise: ["數位民主", "開放政府", "公民參與"],
    description_zh: "推動台灣數位轉型與開放政府的先驅",
    description_en: "Pioneer in Taiwan's digital transformation and open government",
  },
  {
    id: 2,
    name: "高嘉良",
    name_en: "Chia-liang Kao",
    role_zh: "g0v 共同發起人",
    role_en: "g0v Co-founder",
    image: "/team-chia-liang-kao.jpg",
    expertise: ["開源軟體", "公民科技", "資料科學"],
    description_zh: "g0v 零時政府共同發起人，推動開源公民科技發展",
    description_en: "Co-founder of g0v, promoting open source civic technology development",
  },
  {
    id: 3,
    name: "瞿筱葳",
    name_en: "Isabel Hou",
    role_zh: "g0v 共同發起人",
    role_en: "g0v Co-founder",
    image: "/team-isabel-hou.jpg",
    expertise: ["新聞學", "資料視覺化", "媒體創新"],
    description_zh: "致力於新聞科技與資料視覺化的創新應用",
    description_en: "Dedicated to innovative applications of journalism technology and data visualization",
  },
];

const achievements = [
  {
    id: 1,
    number: "500+",
    label_zh: "社群成員",
    label_en: "Community Members",
    description_zh: "活躍的社群貢獻者",
    description_en: "Active community contributors",
  },
  {
    id: 2,
    number: "10,000+",
    label_zh: "貢獻者",
    label_en: "Contributors",
    description_zh: "參與貢獻的志願者",
    description_en: "Volunteer contributors",
  },
  {
    id: 3,
    number: "12",
    label_zh: "年經驗",
    label_en: "Years",
    description_zh: "深耕公民科技領域",
    description_en: "In civic technology",
  },
  {
    id: 4,
    number: "50+",
    label_zh: "合作夥伴",
    label_en: "Partners",
    description_zh: "政府與民間組織夥伴",
    description_en: "Government and civil partners",
  },
];

const values = [
  {
    id: 1,
    icon: <Target className="h-8 w-8" />,
    title_zh: "開放透明",
    title_en: "Open Transparency",
    description_zh: "促進政府資訊透明化，讓公民能夠監督政府運作",
    description_en: "Promoting government transparency for citizen oversight",
  },
  {
    id: 2,
    icon: <Users className="h-8 w-8" />,
    title_zh: "協作共創",
    title_en: "Collaborative Creation",
    description_zh: "集結多方力量，透過協作共同解決社會問題",
    description_en: "Bringing together diverse forces to solve social problems collaboratively",
  },
  {
    id: 3,
    icon: <Heart className="h-8 w-8" />,
    title_zh: "社會關懷",
    title_en: "Social Care",
    description_zh: "關注弱勢族群權益，用科技縮小數位落差",
    description_en: "Caring for disadvantaged groups and bridging the digital divide",
  },
  {
    id: 4,
    icon: <Globe className="h-8 w-8" />,
    title_zh: "國際連結",
    title_en: "Global Connection",
    description_zh: "與國際公民科技社群交流，分享台灣經驗",
    description_en: "Connecting with global civic tech communities and sharing Taiwan's experience",
  },
];

export function AboutPage({ locale }: AboutPageProps) {
  const t = useTranslations();
  return (
    <div className="min-h-screen bg-background">
      <Header locale={locale} />
      <main>
        {/* Hero Section */}
        <section className="py-16 sm:py-24 bg-gradient-to-br from-background via-background to-muted/20">
          <div className="container px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl text-balance">
                {t('about.aboutUsTitle')}
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground text-pretty">
                {t('about.aboutUsDescription')}
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16">
          <div className="container px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-foreground mb-6">
                  {t('about.ourMission')}
                </h2>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  {t('about.missionDescription')}
                </p>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span className="text-muted-foreground">
                      {t('about.missionPoints.openData')}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span className="text-muted-foreground">
                      {t('about.missionPoints.participation')}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span className="text-muted-foreground">
                      {t('about.missionPoints.talent')}
                    </span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <Image
                  src="/about-mission-collaboration.jpg"
                  alt={t('about.teamCollaboration')}
                  width={500}
                  height={300}
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-16 bg-muted/30">
          <div className="container px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-foreground mb-4">
                {t('about.coreValues')}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t('about.coreValuesDescription')}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value) => (
                <Card key={value.id} className="text-center border-0 bg-card/80 backdrop-blur-sm">
                  <CardHeader>
                    <div className="mx-auto mb-4 p-3 rounded-full bg-primary/10 text-primary w-fit">
                      {value.icon}
                    </div>
                    <CardTitle className="text-xl">
                      {locale === "zh" ? value.title_zh : value.title_en}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {locale === "zh" ? value.description_zh : value.description_en}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Achievements */}
        <section className="py-16">
          <div className="container px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-foreground mb-4">
                {t('about.ourAchievements')}
              </h2>
              <p className="text-lg text-muted-foreground">
                {t('about.achievementsDescription')}
              </p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {achievements.map((achievement) => (
                <div key={achievement.id} className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">
                    {achievement.number}
                  </div>
                  <div className="text-lg font-semibold text-foreground mb-1">
                    {locale === "zh" ? achievement.label_zh : achievement.label_en}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {locale === "zh" ? achievement.description_zh : achievement.description_en}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 bg-muted/30">
          <div className="container px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-foreground mb-4">
                {t('about.coreTeam')}
              </h2>
              <p className="text-lg text-muted-foreground">
                {t('about.coreTeamDescription')}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member) => (
                <Card key={member.id} className="border-0 bg-card/80 backdrop-blur-sm overflow-hidden">
                  <div className="aspect-square overflow-hidden">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={locale === "zh" ? member.name : member.name_en}
                      width={300}
                      height={300}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl">
                      {locale === "zh" ? member.name : member.name_en}
                    </CardTitle>
                    <p className="text-muted-foreground">
                      {locale === "zh" ? member.role_zh : member.role_en}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                      {locale === "zh" ? member.description_zh : member.description_en}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {member.expertise.slice(0, 3).map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16">
          <div className="container px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground mb-4">
                {t('about.joinUsTitle')}
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                {t('about.joinUsFullDescription')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link href="https://github.com/g0v" target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    {t('about.viewGitHub')}
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="https://join.g0v.tw" target="_blank" rel="noopener noreferrer">
                    {t('about.joinCommunity')}
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Link>
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
              {t('about.copyright')}
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}