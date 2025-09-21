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

  // Search
  "search.placeholder": { zh: "搜尋專案、活動或頁面...", en: "Search projects, events, or pages..." },
  "search.popular": { zh: "熱門結果", en: "Popular results" },
  "search.noResults": { zh: "找不到相關結果", en: "No results found" },
  "search.tryDifferent": { zh: "請嘗試不同的關鍵字", en: "Try different keywords" },
  "search.navigate": { zh: "導航", en: "Navigate" },
  "search.select": { zh: "選擇", en: "Select" },
  "search.close": { zh: "關閉", en: "Close" },
  "search.type.project": { zh: "專案", en: "Project" },
  "search.type.news": { zh: "新聞", en: "News" },
  "search.type.event": { zh: "活動", en: "Event" },
  "search.type.page": { zh: "頁面", en: "Page" },

  // About Values
  "about.values.title": { zh: "我們的價值", en: "Our Values" },
  "about.values.transparency.title": { zh: "透明治理", en: "Transparent Governance" },
  "about.values.transparency.description": { zh: "推動政府資訊透明化，讓公民更容易監督政府運作", en: "Promoting government transparency to enable better citizen oversight" },
  "about.values.social.title": { zh: "社會關懷", en: "Social Care" },
  "about.values.social.description": { zh: "關注弱勢族群權益，用科技縮小數位落差", en: "Focus on minority rights and bridging the digital divide with technology" },
  "about.values.action.title": { zh: "快速行動", en: "Rapid Action" },
  "about.values.action.description": { zh: "面對社會議題，我們快速響應並提出解決方案", en: "Quick response to social issues with actionable solutions" },
  "about.values.connection.title": { zh: "國際連結", en: "Global Connection" },
  "about.values.connection.description": { zh: "與國際公民科技社群交流，分享台灣經驗", en: "Connecting with international civic tech communities to share Taiwan's experience" },

  // Home page sections
  "home.community.badge": { zh: "社群參與", en: "Community Participation" },
  "home.community.title": { zh: "加入我們的社群", en: "Join Our Community" },
  "home.community.description": { zh: "透過多種管道參與社群活動，與志同道合的夥伴一起為台灣的數位民主努力。", en: "Participate in community activities through various channels and work with like-minded partners for Taiwan's digital democracy." },
  "home.community.join": { zh: "加入我們的行列", en: "Join Our Ranks" },
  "home.community.welcome": { zh: "不論你是開發者、設計師、或是關心社會議題的公民，我們都歡迎你的參與。讓我們一起用科技讓台灣更美好！", en: "Whether you are a developer, designer, or citizen concerned about social issues, we welcome your participation. Let's make Taiwan better with technology!" },

  "home.about.badge": { zh: "關於我們", en: "About Us" },
  "home.about.title": { zh: "我們的使命與價值", en: "Our Mission and Values" },
  "home.about.description": { zh: "Code for Taiwan 致力於透過開源協作，建立更開放、透明、參與式的數位民主社會。我們相信科技應該服務於人民，而非相反。", en: "Code for Taiwan is committed to building a more open, transparent, and participatory digital democracy through open source collaboration. We believe technology should serve the people, not the other way around." },

  "home.projects.badge": { zh: "專案展示", en: "Project Showcase" },
  "home.projects.title": { zh: "我們的開源專案", en: "Our Open Source Projects" },
  "home.projects.description": { zh: "這些專案展現了我們如何運用科技解決社會問題，每個專案都歡迎社群貢獻。", en: "These projects showcase how we use technology to solve social problems. Every project welcomes community contributions." },
  "home.projects.source": { zh: "原始碼", en: "Source Code" },
  "home.projects.view": { zh: "查看", en: "View" },

  // Features
  "features.opensource.title": { zh: "開源協作", en: "Open Source" },
  "features.opensource.description": { zh: "所有專案皆開源，歡迎社群成員共同貢獻", en: "All projects are open source and welcome contributions from the community" },
  "features.community.title": { zh: "社群驅動", en: "Community Driven" },
  "features.community.description": { zh: "由志工組成的多元社群，共同為社會影響力而努力", en: "Diverse community of volunteers working together for social impact" },
  "features.innovation.title": { zh: "創新解決", en: "Innovation" },
  "features.innovation.description": { zh: "運用現代科技，為社會挑戰提供創新解決方案", en: "Using modern technology to provide innovative solutions for social challenges" },
  "features.transparency.title": { zh: "政府透明", en: "Government Transparency" },
  "features.transparency.description": { zh: "打造工具讓政府更加透明且負責任", en: "Building tools to make government more transparent and accountable" },

  // Events page
  "events.title": { zh: "活動資訊", en: "Events" },
  "events.description": { zh: "參與 Code for Taiwan 的各種活動，包括黑客松、工作坊、會議和課程，與志同道合的夥伴一起學習成長。", en: "Join Code for Taiwan's various activities, including hackathons, workshops, conferences and courses, and learn and grow with like-minded partners." },
  "events.search.placeholder": { zh: "搜尋活動...", en: "Search events..." },
  "events.found": { zh: "找到 {count} 個活動", en: "Found {count} events" },
  "events.featured.badge": { zh: "精選活動", en: "Featured Event" },
  "events.attendees": { zh: "人參與", en: "attendees" },
  "events.register": { zh: "立即報名", en: "Register Now" },
  "events.learn_more": { zh: "了解更多", en: "Learn More" },
  "events.upcoming": { zh: "即將舉行", en: "Upcoming" },
  "events.past": { zh: "已結束", en: "Past" },
  "events.view_details": { zh: "查看詳情", en: "View Details" },
  "events.no_results": { zh: "沒有找到符合條件的活動", en: "No events found matching your criteria" },
  "events.clear_filters": { zh: "清除篩選", en: "Clear Filters" },
  "events.subscribe.title": { zh: "訂閱活動通知", en: "Subscribe to Event Updates" },
  "events.subscribe.description": { zh: "第一時間獲得最新活動資訊和報名通知。", en: "Get the latest event information and registration notifications first." },
  "events.subscribe.placeholder": { zh: "輸入您的電子郵件", en: "Enter your email" },
  "events.subscribe.button": { zh: "訂閱", en: "Subscribe" },
  "events.footer": { zh: "© 2024 Code for Taiwan. 致力於用科技讓台灣更美好。", en: "© 2024 Code for Taiwan. Committed to making Taiwan better with technology." },

  // Event types
  "events.types.all": { zh: "全部類型", en: "All Types" },
  "events.types.hackathon": { zh: "黑客松", en: "Hackathon" },
  "events.types.workshop": { zh: "工作坊", en: "Workshop" },
  "events.types.conference": { zh: "會議", en: "Conference" },
  "events.types.course": { zh: "課程", en: "Course" },

  // Event status
  "events.status.all": { zh: "全部狀態", en: "All Status" },
  "events.status.upcoming": { zh: "即將舉行", en: "Upcoming" },
  "events.status.past": { zh: "已結束", en: "Past" },

  // Projects categories
  "projects.categories.all": { zh: "全部", en: "All" },

  // Projects statuses
  "projects.statuses.all": { zh: "全部狀態", en: "All Status" },
  "projects.categories.governance": { zh: "政府治理", en: "Governance" },
  "projects.categories.transparency": { zh: "政府透明", en: "Transparency" },
  "projects.categories.culture": { zh: "文化保存", en: "Culture" },
  "projects.categories.health": { zh: "健康醫療", en: "Health" },
  "projects.categories.civic_tech": { zh: "公民科技", en: "Civic Tech" },
  "projects.categories.government": { zh: "政府透明", en: "Government" },
  "projects.categories.social": { zh: "社會參與", en: "Social" },
  "projects.categories.education": { zh: "教育", en: "Education" },
  "projects.categories.data": { zh: "資料分析", en: "Data" },

  // Language selector
  "language.chinese": { zh: "中文", en: "Chinese" },
  "language.english": { zh: "English", en: "English" },

  // Common
  "common.loading": { zh: "載入中...", en: "Loading..." },
  "common.search": { zh: "搜尋", en: "Search" },
  "common.filter": { zh: "篩選", en: "Filter" },
  "common.all": { zh: "全部", en: "All" },
  "common.active": { zh: "進行中", en: "Active" },
  "common.archived": { zh: "已封存", en: "Archived" },

  // Project-specific translations
  "projects.vtaiwan.title": { zh: "vTaiwan", en: "vTaiwan" },
  "projects.vtaiwan.description": { zh: "數位法規調適平台，讓公民參與法規制定過程", en: "Digital regulation adaptation platform where citizens can participate in policy-making" },
  "projects.moedict.title": { zh: "萌典", en: "Moedict" },
  "projects.moedict.description": { zh: "開放的線上國語、台語、客語辭典", en: "Open online dictionary for Mandarin, Taiwanese, and Hakka languages" },
  "projects.cofacts.title": { zh: "Cofacts 真的假的", en: "Cofacts" },
  "projects.cofacts.description": { zh: "協作式事實查核系統，對抗不實訊息", en: "Collaborative fact-checking system combating misinformation" },
}

export function useTranslation(language: Language) {
  return {
    t: (key: string): string => {
      const translation = translations[key]
      if (!translation) {
        console.warn(`Translation missing for key: ${key}`)
        return key // Return the key itself as fallback for easy debugging
      }
      return translation[language]
    },
    language,
  }
}