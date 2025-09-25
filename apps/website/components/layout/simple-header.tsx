"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LanguageSelector } from "@/components/ui/language-selector"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { Github, Menu } from "lucide-react"
import { useTranslation } from "react-i18next"

interface SimpleHeaderProps {
  locale: string;
}

const navigation = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
]

export function SimpleHeader({ locale }: SimpleHeaderProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { t } = useTranslation()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/85">
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background to-background/95 opacity-95" />
      <div className="container relative flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href={`/${locale}`}
          className="group flex items-center space-x-3 transition-all duration-200 hover:scale-105"
        >
          <div className="relative">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg shadow-primary/25 transition-all duration-300 group-hover:shadow-xl group-hover:shadow-primary/35 group-hover:rotate-3">
              <span className="text-primary-foreground font-bold text-sm tracking-wide">C4T</span>
            </div>
            <div className="absolute -inset-0.5 bg-gradient-to-br from-primary/20 to-transparent rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg leading-tight bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent group-hover:from-primary group-hover:to-primary/80 transition-all duration-300">
              Code for Taiwan
            </span>
            <span className="text-xs text-muted-foreground/70 font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 -mt-0.5">
              Open Government • Open Source
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="space-x-1">
            {navigation.map((item) => (
              <NavigationMenuItem key={item.href}>
                <NavigationMenuLink asChild>
                  <Link
                    href={`/${locale}${item.href}`}
                    className="group relative inline-flex h-10 w-max items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300 hover:bg-accent/80 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 hover:scale-105 hover:shadow-md"
                  >
                    <span className="relative z-10">{t(`navigation.${item.key}`)}</span>
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/10 via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-primary/20 to-transparent blur opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-2">
          <div className="hidden md:flex items-center space-x-3">
            <div className="group">
              <LanguageSelector locale={locale} />
            </div>
            <Separator orientation="vertical" className="h-5 bg-border/60" />
            <Button
              variant="ghost"
              size="sm"
              className="group h-9 w-9 rounded-lg hover:bg-accent/80 hover:scale-110 transition-all duration-300 hover:shadow-md"
              asChild
            >
              <Link href="https://github.com/g0v" target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                <span className="sr-only">GitHub Repository</span>
              </Link>
            </Button>
          </div>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="group md:hidden h-10 w-10 rounded-lg hover:bg-accent/80 hover:scale-110 transition-all duration-300"
              >
                <Menu className="h-5 w-5 transition-transform duration-300 group-hover:rotate-180" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[320px] p-6 bg-background/95 backdrop-blur-xl border-l border-border/50">
              <SheetHeader className="mb-8">
                <SheetTitle className="flex items-center space-x-3 text-left">
                  <div className="h-7 w-7 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg shadow-primary/25">
                    <span className="text-primary-foreground font-bold text-sm">C4T</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-base">Code for Taiwan</span>
                    <span className="text-xs text-muted-foreground/80">Menu</span>
                  </div>
                </SheetTitle>
              </SheetHeader>

              <div className="flex flex-col h-[calc(100%-5rem)]">
                {/* Navigation Links */}
                <nav className="flex flex-col space-y-2 mb-8">
                  {navigation.map((item, index) => (
                    <Link
                      key={item.href}
                      href={`/${locale}${item.href}`}
                      className="group relative text-base font-medium transition-all duration-300 hover:text-primary py-4 px-4 rounded-xl hover:bg-accent/60 hover:scale-105 -mx-3 hover:shadow-md"
                      onClick={() => setIsOpen(false)}
                      style={{
                        animationDelay: `${index * 50}ms`,
                      }}
                    >
                      <span className="relative z-10">{t(`navigation.${item.key}`)}</span>
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/5 via-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </Link>
                  ))}
                </nav>

                {/* Bottom Section */}
                <div className="mt-auto pt-6 border-t border-border/50">
                  <div className="flex flex-col space-y-4">
                    <div className="group">
                      <LanguageSelector locale={locale} />
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="group justify-start -mx-3 h-12 rounded-xl hover:bg-accent/60 transition-all duration-300 hover:scale-105"
                      asChild
                    >
                      <Link href="https://github.com/g0v" target="_blank" rel="noopener noreferrer">
                        <Github className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                        <span className="ml-3 font-medium">GitHub Repository</span>
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}