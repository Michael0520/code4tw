"use client"

import { useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Globe, Check, ChevronDown } from "lucide-react"
import { useLanguageContext } from "@/components/language-provider"
import { useTranslations } from "next-intl"

const languages = [
  { code: "zh", name: "Chinese", nativeNameKey: "language.chinese" },
  { code: "en", name: "English", nativeNameKey: "language.english" },
  // Future language support
  // { code: "ja", name: "Japanese", nativeNameKey: "language.japanese" },
  // { code: "ko", name: "Korean", nativeNameKey: "language.korean" },
] as const

export function LanguageSelector() {
  const { language: locale } = useLanguageContext()
  const t = useTranslations()
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  const currentLanguage = languages.find(lang => lang.code === locale) || languages[0]

  const handleLanguageChange = (newLocale: string) => {
    if (newLocale === locale) return

    const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}/, "")
    router.push(`/${newLocale}${pathWithoutLocale}`)
    setIsOpen(false)
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="flex gap-1">
          <Globe className="h-4 w-4" />
          <span>{t(currentLanguage.nativeNameKey)}</span>
          <ChevronDown className="h-3 w-3 opacity-60" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[120px]">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            className="flex items-center justify-between cursor-pointer"
          >
            <span>{t(language.nativeNameKey)}</span>
            {language.code === locale && (
              <Check className="h-4 w-4 text-primary" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}