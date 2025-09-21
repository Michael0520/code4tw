export const HOME_CONFIG = {
  aboutFeatures: [
    {
      id: "transparency",
      link: "/about",
      icon: "🏛️"
    },
    {
      id: "social",
      link: "/about",
      icon: "🤝"
    },
    {
      id: "action",
      link: "/about",
      icon: "⚡"
    },
    {
      id: "connection",
      link: "/about",
      icon: "🌍"
    }
  ],
  projects: [
    {
      id: "vtaiwan",
      stars: 245,
      forks: 67,
      technologies: ["Vue.js", "Node.js"],
      github: "https://github.com/g0v/vtaiwan.tw"
    },
    {
      id: "moedict",
      stars: 892,
      forks: 156,
      technologies: ["React", "API"],
      github: "https://github.com/g0v/moedict-webkit"
    }
  ],
  communityRoles: [
    "developer", "designer", "manager", "datascientist", "journalist", "socialworker"
  ]
} as const;

export type HomeConfig = typeof HOME_CONFIG;
export type AboutFeature = typeof HOME_CONFIG.aboutFeatures[0];
export type HomeFeature = AboutFeature; // Alias for backwards compatibility
export type Project = typeof HOME_CONFIG.projects[0];