// 共享翻譯資源 - 服務器端和客戶端都可使用
export const resources = {
  en: {
    translation: {
      metadata: {
        title: "Code for Taiwan | Taiwan g0v",
        description: "Code for Taiwan is an open civic tech community that brings together developers, designers, and citizens to build digital solutions for government transparency and social good."
      },
      navigation: {
        home: "Home",
        about: "About",
        contact: "Contact",
        language: "Language"
      },
      hero: {
        badge: "Open Source • Collaboration • Civic Tech",
        title: "Technology for ",
        titleHighlight: "Social Good",
        description: "Code for Taiwan is an open civic tech community that brings together developers, designers, and citizens to build digital solutions for government transparency and social good.",
        joinUs: "Join Us",
        viewGitHub: "View GitHub"
      },
      about: {
        title: "About Code for Taiwan",
        subtitle: "Building better Taiwan through technology and collaboration",
        mission: {
          description: "We foster transparency, accountability, and citizen participation in Taiwan through collaborative development of civic technology."
        },
        foundedYear: "Founded",
        yearsOld: "years old",
        joinUs: "Join Our Community",
        joinUsDescription: "Whether you're a developer, designer, or citizen who cares about social issues, we welcome your participation. Let's use technology to make Taiwan better together!",
        getInTouch: "Get in Touch",
        corePrinciples: "Core Principles",
        corePrinciplesDescription: "The fundamental principles that guide our work and community.",
        organizationDescription: "Our mission and vision for Taiwan's digital future.",
        team: "Our Team",
        teamDescription: "Meet the people behind Code for Taiwan.",
        activeMembers: "Active Members",
        principles: "Principles",
        valuesLabel: "Values",
        audiences: {
          developers: "Developers",
          designers: "Designers",
          citizens: "Citizens",
          students: "Students",
          researchers: "Researchers"
        },
        values: {
          title: "Our Values"
        },
        valuesDescription: "The core values that drive our community and projects."
      },
      community: {
        badge: "Community Participation",
        title: "Join Our Community",
        description: "Participate in community activities through various channels and work with like-minded partners for Taiwan's digital democracy.",
        joinTitle: "Join Our Ranks",
        joinDescription: "Whether you're a developer, designer, or a citizen who cares about social issues, we welcome your participation. Let's use technology to make Taiwan better together!"
      },
      footer: {
        legal: {
          copyright: "© 2024 Code for Taiwan. All rights reserved."
        }
      },
      search: {
        placeholder: "Search content...",
        noResults: "No results found",
        navigate: "navigate",
        select: "select",
        close: "close",
        types: {}
      },
      common: {
        search: "Search",
        viewMore: "View More",
        reset: "Reset",
        filter: "Filter",
        sort: "Sort",
        showing: "Showing",
        noResults: "No results found"
      },
    }
  },
  zh: {
    translation: {
      metadata: {
        title: "Code for Taiwan | 台灣零時政府",
        description: "Code for Taiwan 是一個開放的公民科技社群，匯聚開發者、設計師與公民，共同打造數位解決方案，讓政府更透明、社會更美好。"
      },
      navigation: {
        home: "首頁",
        about: "關於我們",
        contact: "聯絡我們",
        language: "語言"
      },
      hero: {
        badge: "開源 • 協作 • 公民科技",
        title: "用科技改變 ",
        titleHighlight: "台灣社會",
        description: "Code for Taiwan 是一個開放的公民科技社群，匯聚開發者、設計師與公民，共同打造數位解決方案，讓政府更透明、社會更美好。",
        joinUs: "加入我們",
        viewGitHub: "查看 GitHub"
      },
      about: {
        title: "關於 Code for Taiwan",
        subtitle: "透過科技與協作，打造更好的台灣",
        mission: {
          description: "透過公民科技的協作開發，促進台灣的透明度、問責制和公民參與。"
        },
        foundedYear: "成立於",
        yearsOld: "年",
        joinUs: "加入我們的社群",
        joinUsDescription: "不論你是開發者、設計師、或是關心社會議題的公民，我們都歡迎你的參與。讓我們一起用科技讓台灣更美好！",
        getInTouch: "聯絡我們",
        corePrinciples: "核心原則",
        corePrinciplesDescription: "指引我們工作和社群的基本原則。",
        organizationDescription: "我們對台灣數位未來的使命與願景。",
        team: "我們的團隊",
        teamDescription: "認識 Code for Taiwan 背後的成員。",
        activeMembers: "活躍成員",
        principles: "原則",
        valuesLabel: "價值",
        audiences: {
          developers: "開發者",
          designers: "設計師",
          citizens: "公民",
          students: "學生",
          researchers: "研究者"
        },
        values: {
          title: "我們的價值"
        },
        valuesDescription: "驅動我們社群和專案的核心價值。"
      },
      community: {
        badge: "社群參與",
        title: "加入我們的社群",
        description: "透過多種管道參與社群活動，與志同道合的夥伴一起為台灣的數位民主努力。",
        joinTitle: "加入我們的行列",
        joinDescription: "不論你是開發者、設計師、或是關心社會議題的公民，我們都歡迎你的參與。讓我們一起用科技讓台灣更美好！"
      },
      footer: {
        legal: {
          copyright: "© 2024 Code for Taiwan. 保留所有權利。"
        }
      },
      search: {
        placeholder: "搜尋內容...",
        noResults: "找不到結果",
        navigate: "導航",
        select: "選擇",
        close: "關閉",
        types: {}
      },
      common: {
        search: "搜尋",
        viewMore: "查看更多",
        reset: "重設",
        filter: "篩選",
        sort: "排序",
        showing: "顯示",
        noResults: "找不到結果"
      },
    }
  }
} as const;