export const HOME_CONFIG = {
  aboutFeatures: [
    {
      id: "transparency",
      title: "透明治理",
      description: "推動政府資訊透明化，讓公民更容易監督政府運作",
      link: "/about",
      icon: "🏛️"
    },
    {
      id: "social",
      title: "社會關懷",
      description: "關注弱勢族群權益，用科技縮小數位落差",
      link: "/about",
      icon: "🤝"
    },
    {
      id: "action",
      title: "快速行動",
      description: "面對社會議題，我們快速響應並提出解決方案",
      link: "/about",
      icon: "⚡"
    },
    {
      id: "connection",
      title: "國際連結",
      description: "與國際公民科技社群交流，分享台灣經驗",
      link: "/about",
      icon: "🌍"
    }
  ],
  projects: [
    {
      id: "vtaiwan",
      title: "vTaiwan",
      description: "數位法規調適平台，讓公民參與法規制定過程",
      stars: 245,
      forks: 67,
      technologies: ["Vue.js", "Node.js", "政策參與"],
      github: "https://github.com/g0v/vtaiwan.tw"
    },
    {
      id: "moedict",
      title: "萌典",
      description: "開放的線上國語、台語、客語辭典",
      stars: 892,
      forks: 156,
      technologies: ["React", "API", "語言保存"],
      github: "https://github.com/g0v/moedict-webkit"
    }
  ],
  communityRoles: [
    "開發者", "設計師", "專案經理", "資料科學家", "公民記者", "社會工作者"
  ]
} as const;

export type HomeConfig = typeof HOME_CONFIG;
export type AboutFeature = typeof HOME_CONFIG.aboutFeatures[0];
export type HomeFeature = AboutFeature; // Alias for backwards compatibility
export type Project = typeof HOME_CONFIG.projects[0];