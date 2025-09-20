"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Github, Globe } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { useLanguageContext } from "@/components/language-provider"
import { GlobalSearch } from "@/components/search/global-search"

const navigation = [
  { name: "首頁", name_en: "Home", href: "/" },
  { name: "專案", name_en: "Projects", href: "/projects" },
  { name: "新聞", name_en: "News", href: "/news" },
  { name: "活動", name_en: "Events", href: "/events" },
  { name: "關於我們", name_en: "About", href: "/about" },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const { language, setLanguage } = useLanguageContext()

  const toggleLanguage = () => {
    setLanguage(language === "zh" ? "en" : "zh")
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
      <div className="container flex h-16 items-center justify-between relative">
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">C4T</span>
            </div>
            <span className="font-bold text-lg">{language === "zh" ? "Code for Taiwan" : "Code for Taiwan"}</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm font-medium transition-colors hover:text-primary">
              {language === "zh" ? item.name : item.name_en}
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-2">
          <GlobalSearch />
          <Button variant="ghost" size="sm" onClick={toggleLanguage} className="hidden sm:flex">
            <Globe className="h-4 w-4 mr-1" />
            {language === "zh" ? "EN" : "中"}
          </Button>
          <ThemeToggle />
          <Button variant="ghost" size="sm" asChild className="hidden sm:flex">
            <Link href="https://github.com/g0v" target="_blank" rel="noopener noreferrer">
              <Github className="h-4 w-4" />
            </Link>
          </Button>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="md:hidden">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col space-y-4 mt-8">
                {navigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-sm font-medium transition-colors hover:text-primary"
                    onClick={() => setIsOpen(false)}
                  >
                    {language === "zh" ? item.name : item.name_en}
                  </Link>
                ))}
                <div className="flex items-center space-x-2 pt-4 border-t">
                  <Button variant="ghost" size="sm" onClick={toggleLanguage}>
                    <Globe className="h-4 w-4 mr-1" />
                    {language === "zh" ? "EN" : "中"}
                  </Button>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="https://github.com/g0v" target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
