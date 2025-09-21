"use client"

import { useState, useEffect } from "react"
import { Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { useLanguageContext } from "@/components/language-provider"
import Link from "next/link"

interface SearchResult {
  id: string
  title: string
  description: string
  type: "project" | "news" | "event"
  url: string
  tags?: string[]
}

const mockSearchResults: SearchResult[] = [
  {
    id: "1",
    title: "vTaiwan",
    description: "Digital regulation adaptation platform for citizen participation",
    type: "project",
    url: "/projects/vtaiwan",
    tags: ["Vue.js", "Node.js", "Policy"],
  },
  {
    id: "2",
    title: "Moedict",
    description: "Open online dictionary for Mandarin, Taiwanese, and Hakka",
    type: "project",
    url: "/projects/moedict",
    tags: ["React", "API", "Language"],
  },
  {
    id: "3",
    title: "g0v 10th Anniversary Hackathon",
    description: "Special event celebrating g0v community's 10th anniversary",
    type: "event",
    url: "/events/g0v-10th-hackathon",
    tags: ["Hackathon", "Anniversary"],
  },
  {
    id: "4",
    title: "Open Government Data Progress",
    description: "Latest policies and implementation status of government data openness",
    type: "news",
    url: "/news/open-data-progress",
    tags: ["Open Data", "Transparency"],
  },
]

export function GlobalSearch() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const { language, t } = useLanguageContext()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setIsOpen(true)
      }
      if (e.key === "Escape") {
        setIsOpen(false)
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [])

  useEffect(() => {
    if (query.length > 0) {
      const filtered = mockSearchResults.filter(
        (result) =>
          result.title.toLowerCase().includes(query.toLowerCase()) ||
          result.description.toLowerCase().includes(query.toLowerCase()) ||
          result.tags?.some((tag) => tag.toLowerCase().includes(query.toLowerCase())),
      )
      setResults(filtered)
    } else {
      setResults([])
    }
  }, [query])

  const getTypeLabel = (type: string) => {
    return t(`search.types.${type}` as any) || type
  }

  if (!isOpen) {
    return (
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(true)}
        className="hidden sm:flex items-center space-x-2 text-muted-foreground"
      >
        <Search className="h-4 w-4" />
        <span>{t("common.search")}</span>
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
    )
  }

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
      <div className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-2xl translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 sm:rounded-lg">
        <div className="flex items-center space-x-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={t("search.placeholder")}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border-0 focus-visible:ring-0 text-base"
            autoFocus
          />
          <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        {results.length > 0 && (
          <div className="max-h-96 overflow-y-auto space-y-2">
            {results.map((result) => (
              <Link key={result.id} href={result.url} onClick={() => setIsOpen(false)}>
                <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-medium">{result.title}</h3>
                          <Badge variant="secondary" className="text-xs">
                            {getTypeLabel(result.type)}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{result.description}</p>
                        {result.tags && (
                          <div className="flex flex-wrap gap-1">
                            {result.tags.map((tag, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}

        {query.length > 0 && results.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            {t("search.noResults")}
          </div>
        )}

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center space-x-4">
            <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium">
              ↑↓
            </kbd>
            <span>{t("search.navigate")}</span>
            <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium">
              ↵
            </kbd>
            <span>{t("search.select")}</span>
          </div>
          <div className="flex items-center space-x-2">
            <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium">
              esc
            </kbd>
            <span>{t("search.close")}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
