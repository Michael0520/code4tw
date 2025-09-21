/**
 * Projects Configuration
 * All configurable values and business rules
 */

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
};

// Static project data matching original design
export const STATIC_PROJECTS_DATA = [
  {
    id: 1,
    title: "vTaiwan",
    title_en: "vTaiwan",
    description_zh: "數位法規調適平台，讓公民參與法規制定過程，促進政府與民間的對話",
    description_en: "Digital platform for regulatory adaptation with citizen participation, facilitating dialogue between government and civil society",
    tags: ["Vue.js", "Node.js", "政策參與", "數位民主"],
    category: "governance",
    stars: 245,
    forks: 67,
    status: "active",
    github: "https://github.com/g0v/vtaiwan.tw",
    website: "https://vtaiwan.tw",
    image: "/digital-democracy-platform-interface.jpg",
  },
  {
    id: 2,
    title: "萌典",
    title_en: "Moedict",
    description_zh: "開放的線上國語、台語、客語辭典，保存台灣多元語言文化",
    description_en: "Open online dictionary for Mandarin, Taiwanese, and Hakka, preserving Taiwan's diverse linguistic culture",
    tags: ["React", "API", "語言保存", "文化"],
    category: "culture",
    stars: 892,
    forks: 156,
    status: "active",
    github: "https://github.com/g0v/moedict-webkit",
    website: "https://moedict.tw",
    image: "/taiwanese-dictionary-interface.jpg",
  },
  {
    id: 3,
    title: "立法院議事錄",
    title_en: "Legislative Records",
    description_zh: "立法院會議記錄搜尋與視覺化平台，讓民眾更容易了解立法過程",
    description_en: "Search and visualization platform for legislative records, making the legislative process more accessible to citizens",
    tags: ["Python", "Data Viz", "政府透明", "開放資料"],
    category: "transparency",
    stars: 178,
    forks: 43,
    status: "active",
    github: "https://github.com/g0v/ly.g0v.tw",
    website: "https://ly.g0v.tw",
    image: "/legislative-data-visualization-dashboard.jpg",
  },
  {
    id: 4,
    titleKey: "projects.mask.title",
    descriptionKey: "projects.mask.description",
    tags: ["React", "Maps API"],
    category: "health",
    stars: 1234,
    forks: 289,
    status: "archived",
    github: "https://github.com/g0v/mask-map",
    website: "https://mask.g0v.tw",
    image: "/taiwan-mask-availability-map.jpg",
  },
  {
    id: 5,
    titleKey: "projects.budget.title",
    descriptionKey: "projects.budget.description",
    tags: ["D3.js", "React"],
    category: "transparency",
    stars: 156,
    forks: 34,
    status: "active",
    github: "https://github.com/g0v/budget.g0v.tw",
    website: "https://budget.g0v.tw",
    image: "/government-budget-visualization-charts.jpg",
  },
  {
    id: 6,
    titleKey: "projects.election.title",
    descriptionKey: "projects.election.description",
    tags: ["Next.js", "Database"],
    category: "governance",
    stars: 89,
    forks: 23,
    status: "active",
    github: "https://github.com/g0v/vote.ly.g0v.tw",
    website: "https://vote.ly.g0v.tw",
    image: "/election-candidate-information-platform.jpg",
  },
];