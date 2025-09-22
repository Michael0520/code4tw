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

// Static project data - all using i18n keys for consistency
export const STATIC_PROJECTS_DATA = [
  {
    id: 1,
    titleKey: "projects.vtaiwan.title",
    descriptionKey: "projects.vtaiwan.description",
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
    titleKey: "projects.moedict.title",
    descriptionKey: "projects.moedict.description",
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
    titleKey: "projects.legislative.title",
    descriptionKey: "projects.legislative.description",
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