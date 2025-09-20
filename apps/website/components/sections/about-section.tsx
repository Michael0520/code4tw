"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Target, Heart, Zap, Globe } from "lucide-react"
import { useLanguageContext } from "@/components/language-provider"

export function AboutSection() {
  const { language } = useLanguageContext()

  const values = [
    {
      icon: Target,
      title_zh: "透明治理",
      title_en: "Transparent Governance",
      description_zh: "推動政府資訊透明化，讓公民更容易監督政府運作",
      description_en: "Promoting government transparency to enable better civic oversight",
    },
    {
      icon: Heart,
      title_zh: "社會關懷",
      title_en: "Social Care",
      description_zh: "關注弱勢族群權益，用科技縮小數位落差",
      description_en: "Caring for vulnerable groups and bridging the digital divide",
    },
    {
      icon: Zap,
      title_zh: "快速行動",
      title_en: "Rapid Action",
      description_zh: "面對社會議題，我們快速響應並提出解決方案",
      description_en: "Rapid response to social issues with innovative solutions",
    },
    {
      icon: Globe,
      title_zh: "國際連結",
      title_en: "Global Connection",
      description_zh: "與國際公民科技社群交流，分享台灣經驗",
      description_en: "Connecting with global civic tech communities and sharing Taiwan experiences",
    },
  ]

  return (
    <section className="py-24 sm:py-32 relative">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/90 to-background/95 z-10" />
        <img
          src="/civic-tech-collaboration.jpg"
          alt="Civic tech collaboration"
          className="w-full h-full object-cover opacity-10"
        />
      </div>

      <div className="container px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="outline" className="mb-4">
            {language === "zh" ? "關於我們" : "About Us"}
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            {language === "zh" ? "我們的使命與價值" : "Our Mission & Values"}
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground text-pretty">
            {language === "zh"
              ? "Code for Taiwan 致力於透過開源協作，建立更開放、透明、參與式的數位民主社會。我們相信科技應該服務於人民，而非相反。"
              : "Code for Taiwan is committed to building a more open, transparent, and participatory digital democracy through open source collaboration. We believe technology should serve the people."}
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-5xl">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <Card
                  key={index}
                  className="relative overflow-hidden border-0 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-colors"
                >
                  <CardContent className="p-6">
                    <div className="rounded-lg bg-primary/10 p-3 w-fit mb-4">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">
                      {language === "zh" ? value.title_zh : value.title_en}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {language === "zh" ? value.description_zh : value.description_en}
                    </p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        <div className="mx-auto mt-16 max-w-4xl">
          <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20 relative overflow-hidden">
            <div className="absolute inset-0 opacity-5">
              <img
                src="/taiwan-digital-democracy.jpg"
                alt="Taiwan digital democracy"
                className="w-full h-full object-cover"
              />
            </div>
            <CardContent className="p-8 text-center relative z-10">
              <h3 className="text-2xl font-bold mb-4">{language === "zh" ? "加入我們的行列" : "Join Our Community"}</h3>
              <p className="text-muted-foreground mb-6 text-pretty">
                {language === "zh"
                  ? "不論你是開發者、設計師、或是關心社會議題的公民，我們都歡迎你的參與。讓我們一起用科技讓台灣更美好！"
                  : "Whether you are a developer, designer, or citizen who cares about social issues, we welcome your participation. Let's make Taiwan better with technology!"}
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                <Badge variant="secondary">{language === "zh" ? "開發者" : "Developers"}</Badge>
                <Badge variant="secondary">{language === "zh" ? "設計師" : "Designers"}</Badge>
                <Badge variant="secondary">{language === "zh" ? "專案經理" : "Project Managers"}</Badge>
                <Badge variant="secondary">{language === "zh" ? "資料科學家" : "Data Scientists"}</Badge>
                <Badge variant="secondary">{language === "zh" ? "公民記者" : "Citizen Journalists"}</Badge>
                <Badge variant="secondary">{language === "zh" ? "社會工作者" : "Social Workers"}</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
