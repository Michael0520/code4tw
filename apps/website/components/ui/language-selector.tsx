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

interface LanguageSelectorProps {
  locale: string;
}

const languages = [
  { code: "zh", name: "Chinese", nativeName: "中文" },
  { code: "en", name: "English", nativeName: "English" },
  // Future language support
  // { code: "ja", name: "Japanese", nativeName: "日本語" },
  // { code: "ko", name: "Korean", nativeName: "한국어" },
] as const

export function LanguageSelector({ locale }: LanguageSelectorProps) {
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
          <span>{currentLanguage.nativeName}</span>
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
            <span>{language.nativeName}</span>
            {language.code === locale && (
              <Check className="h-4 w-4 text-primary" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}