"use client"

import { useState, useEffect } from "react"
import { Search, Hash, Calendar, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { useRouter } from "next/navigation"
import { useLanguageContext } from "@/components/language-provider"

interface SearchResult {
  id: string
  title: string
  titleZh: string
  description: string
  descriptionZh: string
  type: "project" | "news" | "event" | "page"
  url: string
  tags?: string[]
  icon?: React.ReactNode
}

const searchResults: SearchResult[] = [
  {
    id: "vtaiwan",
    title: "vTaiwan Digital Regulation Platform",
    titleZh: "vTaiwan 數位法規調適平台",
    description: "A platform for digital regulation adaptation where citizens can participate in policy-making",
    descriptionZh: "數位法規調適平台，讓公民參與法規制定過程",
    type: "project",
    url: "/projects",
    tags: ["Vue.js", "Node.js", "Policy", "Participation"],
    icon: <Hash className="h-4 w-4" />,
  },
  {
    id: "moedict",
    title: "Moedict Open Dictionary",
    titleZh: "萌典開放辭典",
    description: "Open online dictionary for Mandarin, Taiwanese, and Hakka languages",
    descriptionZh: "開放的線上國語、台語、客語辭典",
    type: "project",
    url: "/projects",
    tags: ["React", "API", "Language", "Dictionary"],
    icon: <Hash className="h-4 w-4" />,
  },
  {
    id: "g0v-hackathon",
    title: "g0v Bi-monthly Hackathon",
    titleZh: "g0v 雙月大黑客松",
    description: "Regular civic hacking events bringing together citizens, designers, and developers",
    descriptionZh: "定期的公民科技黑客松活動，匯聚公民、設計師與開發者",
    type: "event",
    url: "/events",
    tags: ["Hackathon", "Civic Tech", "Community"],
    icon: <Calendar className="h-4 w-4" />,
  },
  {
    id: "cofacts",
    title: "Cofacts Fact-checking Platform",
    titleZh: "Cofacts 真的假的",
    description: "Collaborative fact-checking system combating misinformation",
    descriptionZh: "協作式事實查核系統，對抗不實訊息",
    type: "project",
    url: "/projects",
    tags: ["Fact-checking", "LINE Bot", "Community"],
    icon: <Hash className="h-4 w-4" />,
  },
  {
    id: "about",
    title: "About Code for Taiwan",
    titleZh: "關於我們",
    description: "Learn about Code for Taiwan's mission, values and community",
    descriptionZh: "了解 Code for Taiwan 的使命、價值觀和社群",
    type: "page",
    url: "/about",
    tags: ["Mission", "Community", "Values"],
    icon: <FileText className="h-4 w-4" />,
  },
  {
    id: "projects",
    title: "Open Source Projects",
    titleZh: "開源專案",
    description: "Explore all our civic technology projects and contribute",
    descriptionZh: "探索我們所有的公民科技專案並參與貢獻",
    type: "page",
    url: "/projects",
    tags: ["Open Source", "Projects", "Civic Tech"],
    icon: <FileText className="h-4 w-4" />,
  },
  {
    id: "events",
    title: "Community Events",
    titleZh: "社群活動",
    description: "Join our hackathons, workshops and community gatherings",
    descriptionZh: "參加我們的黑客松、工作坊和社群聚會",
    type: "page",
    url: "/events",
    tags: ["Events", "Hackathon", "Workshop"],
    icon: <FileText className="h-4 w-4" />,
  },
]

export function GlobalSearch() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const { language: locale, t } = useLanguageContext()
  const router = useRouter()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setIsOpen(true)
      }
      if (e.key === "Escape") {
        setIsOpen(false)
        setQuery("")
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [])

  useEffect(() => {
    if (query.length > 0) {
      const filtered = searchResults.filter((result) => {
        const title = locale === "zh" ? result.titleZh : result.title
        const description = locale === "zh" ? result.descriptionZh : result.description

        return (
          title.toLowerCase().includes(query.toLowerCase()) ||
          description.toLowerCase().includes(query.toLowerCase()) ||
          result.tags?.some((tag) => tag.toLowerCase().includes(query.toLowerCase()))
        )
      })
      setResults(filtered)
    } else {
      setResults(searchResults.slice(0, 6))
    }
  }, [query, locale])

  const getTypeLabel = (type: string) => {
    const typeKeys: { [key: string]: string } = {
      project: "search.type.project",
      news: "search.type.news",
      event: "search.type.event",
      page: "search.type.page",
    }
    return t(typeKeys[type] || "search.type.page")
  }

  const getTypeColor = (type: string) => {
    const colors = {
      project: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      news: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      event: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
      page: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
    }
    return colors[type as keyof typeof colors] || colors.page
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="hidden sm:flex items-center space-x-2 text-muted-foreground w-64 justify-start"
        >
          <Search className="h-4 w-4" />
          <span className="flex-1 text-left">{t("common.search")}</span>
          <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
            <span className="text-xs">⌘</span>K
          </kbd>
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl p-0">
        <DialogTitle className="sr-only">{t("search.placeholder")}</DialogTitle>
        <DialogDescription className="sr-only">
          {t("search.popular")}
        </DialogDescription>
        <div className="border-b p-4">
          <div className="flex items-center space-x-2">
            <Search className="h-5 w-5 text-muted-foreground" />
            <Input
              placeholder={t("search.placeholder")}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="border-0 focus-visible:ring-0 text-base h-11"
              autoFocus
            />
          </div>
        </div>

        <div className="max-h-96 overflow-y-auto">
          {results.length > 0 ? (
            <div className="p-2">
              {query.length === 0 && (
                <div className="px-3 py-2 text-xs font-medium text-muted-foreground">
                  {t("search.popular")}
                </div>
              )}
              {results.map((result) => (
                <div
                  key={result.id}
                  onClick={() => {
                    router.push(`/${locale}${result.url}`)
                    setIsOpen(false)
                    setQuery("")
                  }}
                  className="flex items-start space-x-3 rounded-lg p-3 hover:bg-muted/50 transition-colors cursor-pointer"
                >
                  <div className="text-muted-foreground mt-0.5">
                    {result.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-medium text-sm truncate">
                        {locale === "zh" ? result.titleZh : result.title}
                      </h3>
                      <Badge
                        variant="secondary"
                        className={`text-xs ${getTypeColor(result.type)}`}
                      >
                        {getTypeLabel(result.type)}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-1 mb-2">
                      {locale === "zh" ? result.descriptionZh : result.description}
                    </p>
                    {result.tags && (
                      <div className="flex flex-wrap gap-1">
                        {result.tags.slice(0, 3).map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : query.length > 0 ? (
            <div className="text-center py-8 px-4 text-muted-foreground">
              <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">
                {t("search.noResults")}
              </p>
              <p className="text-xs mt-1">
                {t("search.tryDifferent")}
              </p>
            </div>
          ) : null}
        </div>

        <div className="border-t p-3">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium">
                  ↑↓
                </kbd>
                <span>{t("search.navigate")}</span>
              </div>
              <div className="flex items-center space-x-1">
                <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium">
                  ↵
                </kbd>
                <span>{t("search.select")}</span>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium">
                esc
              </kbd>
              <span>{t("search.close")}</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}