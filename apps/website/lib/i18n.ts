export type Language = "zh" | "en"

export interface Translations {
  [key: string]: {
    zh: string
    en: string
  }
}

export const translations: Translations = {
  // Navigation
  "nav.home": { zh: "首頁", en: "Home" },
  "nav.projects": { zh: "專案", en: "Projects" },
  "nav.news": { zh: "新聞", en: "News" },
  "nav.events": { zh: "活動", en: "Events" },
  "nav.about": { zh: "關於我們", en: "About" },

  // Hero Section
  "hero.badge": { zh: "開源 • 協作 • 公民科技", en: "Open Source • Collaboration • Civic Tech" },
  "hero.title": { zh: "用科技改變", en: "Technology for" },
  "hero.title.highlight": { zh: "台灣社會", en: "Social Good" },
  "hero.description": {
    zh: "Code for Taiwan 是一個開放的公民科技社群，匯聚開發者、設計師與公民，共同打造數位解決方案，讓政府更透明、社會更美好。",
    en: "Code for Taiwan is an open civic tech community that brings together developers, designers, and citizens to build digital solutions for government transparency and social good.",
  },
  "hero.join": { zh: "加入我們", en: "Join Us" },
  "hero.projects": { zh: "查看專案", en: "View Projects" },

  // Features
  "feature.opensource": { zh: "開源協作", en: "Open Source" },
  "feature.opensource.desc": {
    zh: "所有專案皆開源，歡迎貢獻",
    en: "All projects are open source and welcome contributions",
  },
  "feature.community": { zh: "社群驅動", en: "Community Driven" },
  "feature.community.desc": { zh: "由志工組成的多元社群", en: "Diverse community of volunteers" },
  "feature.innovation": { zh: "創新解決", en: "Innovation" },
  "feature.innovation.desc": { zh: "用創新思維解決社會問題", en: "Innovative solutions for social challenges" },

  // Common
  "common.loading": { zh: "載入中...", en: "Loading..." },
  "common.search": { zh: "搜尋", en: "Search" },
  "common.filter": { zh: "篩選", en: "Filter" },
  "common.all": { zh: "全部", en: "All" },
  "common.active": { zh: "進行中", en: "Active" },
  "common.archived": { zh: "已封存", en: "Archived" },
}

export function useTranslation(language: Language) {
  return {
    t: (key: string): string => {
      const translation = translations[key]
      if (!translation) {
        console.warn(`Translation missing for key: ${key}`)
        return key
      }
      return translation[language]
    },
    language,
  }
}
