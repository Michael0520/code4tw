export interface Project {
  id: string
  title: string
  title_en: string
  description_zh: string
  description_en: string
  image?: string
  github: string
  website?: string
  tags: string[]
  category: string
  status: "active" | "archived"
  stars: number
  forks: number
}

export const PROJECTS_CONFIG = {
  // Project Categories
  categories: [
    { value: 'all', labelKey: 'projects.categories.all' },
    { value: 'governance', labelKey: 'projects.categories.governance' },
    { value: 'transparency', labelKey: 'projects.categories.transparency' },
    { value: 'culture', labelKey: 'projects.categories.culture' },
    { value: 'health', labelKey: 'projects.categories.health' }
  ],

  // Project Statuses
  statuses: [
    { value: 'all', labelKey: 'projects.statuses.all' },
    { value: 'active', labelKey: 'common.active' },
    { value: 'archived', labelKey: 'common.archived' }
  ],

  // Popular Tags (for filtering)
  popularTags: [
    'Vue.js',
    'React',
    'Node.js',
    'Python',
    'Open Data',
    'Government',
    'Education',
    'Healthcare',
    'Environment',
    'Transportation'
  ],

  // Display Settings
  display: {
    itemsPerPage: 12,
    featuredCount: 6,
    maxTagsToShow: 5,
    maxDescriptionLength: 150
  },

  // Search Configuration
  search: {
    minQueryLength: 2,
    debounceMs: 300,
    searchFields: ['title', 'description', 'tags']
  },

  // Sorting Options
  sortOptions: [
    { value: 'stars', label: 'Most Stars', order: 'desc' },
    { value: 'forks', label: 'Most Forks', order: 'desc' },
    { value: 'title', label: 'Alphabetical', order: 'asc' },
    { value: 'date', label: 'Newest First', order: 'desc' }
  ],

  // Default Values
  defaults: {
    category: 'all',
    status: 'all',
    sortBy: 'stars',
    sortOrder: 'desc'
  },

  // GitHub Integration
  github: {
    apiUrl: 'https://api.github.com',
    org: 'g0v',
    rateLimit: 60, // requests per hour
    cacheTime: 3600000 // 1 hour in milliseconds
  },

  // URLs
  urls: {
    projectsApi: '/api/projects',
    githubBase: 'https://github.com',
    defaultImage: '/images/project-placeholder.svg'
  },

  // Validation Rules
  validation: {
    title: {
      minLength: 2,
      maxLength: 100,
      required: true
    },
    description: {
      minLength: 10,
      maxLength: 500,
      required: true
    },
    tags: {
      minCount: 0,
      maxCount: 10,
      maxLength: 30
    }
  },

  // Messages - translation keys
  messages: {
    noProjects: 'projects.messages.noProjects',
    loading: 'projects.messages.loading',
    error: 'projects.messages.error',
    searchPlaceholder: 'projects.messages.searchPlaceholder',
    filterBy: 'projects.messages.filterBy',
    sortBy: 'projects.messages.sortBy'
  }
}

export const STATIC_PROJECTS_DATA: Project[] = [
  {
    id: "vtaiwan",
    title: "vTaiwan 數位法規調適平台",
    title_en: "vTaiwan Digital Regulation Platform",
    description_zh: "數位法規調適平台，讓公民參與法規制定過程，促進民主參與和政策透明度。",
    description_en: "A platform for digital regulation adaptation where citizens can participate in policy-making processes.",
    image: "/projects/vtaiwan.jpg",
    github: "https://github.com/vtaiwan/vtaiwan",
    website: "https://vtaiwan.tw",
    tags: ["Vue.js", "Node.js", "Policy", "Participation"],
    category: "government",
    status: "active",
    stars: 245,
    forks: 58,
  },
  {
    id: "moedict",
    title: "萌典開放辭典",
    title_en: "Moedict Open Dictionary",
    description_zh: "開放的線上國語、台語、客語辭典，提供免費且易用的語言學習資源。",
    description_en: "Open online dictionary for Mandarin, Taiwanese, and Hakka languages with free and accessible language resources.",
    image: "/projects/moedict.jpg",
    github: "https://github.com/audreyt/moedict-webkit",
    website: "https://moedict.tw",
    tags: ["React", "API", "Language", "Dictionary"],
    category: "education",
    status: "active",
    stars: 892,
    forks: 187,
  },
  {
    id: "cofacts",
    title: "Cofacts 真的假的",
    title_en: "Cofacts Fact-checking Platform",
    description_zh: "協作式事實查核系統，對抗不實訊息，讓民眾能夠辨識真假資訊。",
    description_en: "Collaborative fact-checking system combating misinformation through community-driven verification.",
    image: "/projects/cofacts.jpg",
    github: "https://github.com/cofacts/rumors-line-bot",
    website: "https://cofacts.tw",
    tags: ["Fact-checking", "LINE Bot", "Community"],
    category: "social",
    status: "active",
    stars: 156,
    forks: 89,
  },
  {
    id: "budget-viz",
    title: "中央政府總預算視覺化",
    title_en: "Central Government Budget Visualization",
    description_zh: "台灣政府預算的互動式視覺化，提升政府財政透明度，讓民眾了解預算分配。",
    description_en: "Interactive visualization of Taiwan's government budget for enhanced transparency and public understanding.",
    image: "/projects/budget-viz.jpg",
    github: "https://github.com/g0v/budget.g0v.tw",
    website: "https://budget.g0v.tw",
    tags: ["D3.js", "Data Visualization", "Budget", "Transparency"],
    category: "government",
    status: "active",
    stars: 324,
    forks: 67,
  },
  {
    id: "itaigi",
    title: "iTaigi 愛台語",
    title_en: "iTaigi Taiwanese Language Platform",
    description_zh: "群眾協作的台語詞彙平台，收集和分享台語用法，保存台灣本土語言文化。",
    description_en: "Crowdsourced Taiwanese language platform for collecting and sharing vocabulary to preserve local culture.",
    image: "/projects/itaigi.jpg",
    github: "https://github.com/i3thuan5/itaigi",
    website: "https://itaigi.tw",
    tags: ["Language", "Crowdsourcing", "Culture", "Django"],
    category: "education",
    status: "active",
    stars: 78,
    forks: 23,
  },
  {
    id: "civic-tech-handbook",
    title: "公民科技指南",
    title_en: "Civic Tech Handbook",
    description_zh: "公民科技專案指南，提供工具、資源和最佳實踐，協助社群建立有影響力的專案。",
    description_en: "A comprehensive guide for civic tech projects, providing tools, resources, and best practices.",
    image: "/projects/handbook.jpg",
    github: "https://github.com/g0v/civic-tech-handbook",
    website: "https://g0v.hackmd.io/book",
    tags: ["Documentation", "Guide", "Community", "Best Practices"],
    category: "civic-tech",
    status: "active",
    stars: 156,
    forks: 42,
  },
]