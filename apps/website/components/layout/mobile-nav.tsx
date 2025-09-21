"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { LanguageSelector } from "@/components/ui/language-selector"
import { Menu, Github } from "lucide-react"
import { useLanguageContext } from "@/components/language-provider"

interface MobileNavProps {
  navigation: Array<{
    key: string
    href: string
  }>
}

export function MobileNav({ navigation }: MobileNavProps) {
  const { language: locale, t } = useLanguageContext()
  const [isOpen, setIsOpen] = useState(false)

  return (
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
              href={`/${locale}${item.href}`}
              className="text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setIsOpen(false)}
            >
              {t(item.key)}
            </Link>
          ))}
          <div className="flex items-center space-x-2 pt-4 border-t">
            <LanguageSelector />
            <Button variant="ghost" size="sm" asChild>
              <Link href="https://github.com/g0v" target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  )
}