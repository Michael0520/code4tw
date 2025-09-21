"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { usePathname } from "next/navigation"
import { useTranslation } from "@/lib/i18n"

export type Language = "zh" | "en"

interface LanguageContextType {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const [language, setLanguage] = useState<Language>("zh")
  const { t } = useTranslation(language)

  useEffect(() => {
    // Extract language from pathname (e.g., /en/news -> en, /zh/about -> zh)
    const pathLanguage = pathname.split('/')[1] as Language
    if (pathLanguage === 'en' || pathLanguage === 'zh') {
      setLanguage(pathLanguage)
    }
  }, [pathname])

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguageContext() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguageContext must be used within a LanguageProvider")
  }
  return context
}