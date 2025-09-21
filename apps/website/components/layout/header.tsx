"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Github } from "lucide-react"
import { GlobalSearch } from "@/components/search/global-search"
import { LanguageSelector } from "@/components/ui/language-selector"
import { MobileNav } from "@/components/layout/mobile-nav"
import { useLanguageContext } from "@/components/language-provider"

const navigation = [
  { key: "nav.home", href: "/" },
  { key: "nav.projects", href: "/projects" },
  { key: "nav.news", href: "/news" },
  { key: "nav.events", href: "/events" },
  { key: "nav.about", href: "/about" },
]

export function Header() {
  const { language: locale, t } = useLanguageContext()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
      <div className="container flex h-16 items-center justify-between relative">
        <div className="flex items-center space-x-4">
          <Link href={`/${locale}`} className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">C4T</span>
            </div>
            <span className="font-bold text-lg">Code for Taiwan</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navigation.map((item) => (
            <Link key={item.href} href={`/${locale}${item.href}`} className="text-sm font-medium transition-colors hover:text-primary">
              {t(item.key)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-2">
          <GlobalSearch />
          <LanguageSelector />
          {/* <ThemeToggle /> */} {/* Disabled for force light mode */}
          <Button variant="ghost" size="sm" asChild className="hidden sm:flex">
            <Link href="https://github.com/g0v" target="_blank" rel="noopener noreferrer">
              <Github className="h-4 w-4" />
            </Link>
          </Button>

          <MobileNav navigation={navigation} />
        </div>
      </div>
    </header>
  )
}
