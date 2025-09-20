/**
 * Projects Configuration
 * All configurable values and business rules
 */

export const PROJECTS_CONFIG = {
  // Project Categories
  categories: [
    { value: 'all', label: 'All Categories' },
    { value: 'government', label: 'Government', icon: '🏛️' },
    { value: 'education', label: 'Education', icon: '📚' },
    { value: 'environment', label: 'Environment', icon: '🌱' },
    { value: 'healthcare', label: 'Healthcare', icon: '🏥' },
    { value: 'transportation', label: 'Transportation', icon: '🚆' },
    { value: 'civic-tech', label: 'Civic Technology', icon: '💻' }
  ],

  // Project Statuses
  statuses: [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active', color: 'green' },
    { value: 'completed', label: 'Completed', color: 'blue' },
    { value: 'planning', label: 'Planning', color: 'yellow' },
    { value: 'archived', label: 'Archived', color: 'gray' }
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

  // Messages (can be used with i18n later)
  messages: {
    noProjects: 'No projects found',
    loading: 'Loading projects...',
    error: 'Failed to load projects',
    searchPlaceholder: 'Search projects...',
    filterBy: 'Filter by',
    sortBy: 'Sort by'
  }
};

// Static project data (temporary until API/database is ready)
export const STATIC_PROJECTS_DATA = [
  {
    id: '1',
    title: 'vTaiwan',
    description: 'Digital platform for regulatory adaptation with citizen participation',
    category: 'government' as const,
    status: 'active' as const,
    tags: ['Vue.js', 'Node.js', 'Policy', 'Open Government'],
    githubUrl: 'https://github.com/g0v/vtaiwan.tw',
    websiteUrl: 'https://vtaiwan.tw',
    stars: 245,
    forks: 67,
    createdAt: new Date('2023-01-15'),
    updatedAt: new Date('2024-01-10')
  },
  {
    id: '2',
    title: 'Moedict',
    description: 'Open dictionary for Mandarin, Taiwanese, and Hakka languages',
    category: 'education' as const,
    status: 'active' as const,
    tags: ['React', 'Language', 'Education', 'Open Data'],
    githubUrl: 'https://github.com/g0v/moedict-webkit',
    websiteUrl: 'https://moedict.tw',
    stars: 892,
    forks: 156,
    createdAt: new Date('2022-06-10'),
    updatedAt: new Date('2024-01-08')
  },
  {
    id: '3',
    title: 'Budget Visualization',
    description: 'Interactive visualization of Taiwan government budget data',
    category: 'government' as const,
    status: 'completed' as const,
    tags: ['D3.js', 'Data Visualization', 'Open Data', 'Budget'],
    githubUrl: 'https://github.com/g0v/twbudget',
    websiteUrl: 'https://budget.g0v.tw',
    stars: 423,
    forks: 98,
    createdAt: new Date('2021-03-20'),
    updatedAt: new Date('2023-12-15')
  },
  {
    id: '4',
    title: 'Air Quality Monitor',
    description: 'Real-time air quality monitoring and alert system for Taiwan',
    category: 'environment' as const,
    status: 'active' as const,
    tags: ['Python', 'IoT', 'Environment', 'Open Hardware'],
    githubUrl: 'https://github.com/g0v/airbox',
    stars: 156,
    forks: 43,
    createdAt: new Date('2023-05-01'),
    updatedAt: new Date('2024-01-12')
  },
  {
    id: '5',
    title: 'Vaccine Appointment System',
    description: 'COVID-19 vaccine appointment helper and availability tracker',
    category: 'healthcare' as const,
    status: 'archived' as const,
    tags: ['React', 'Node.js', 'Healthcare', 'COVID-19'],
    githubUrl: 'https://github.com/g0v/vaxx.tw',
    stars: 1024,
    forks: 234,
    createdAt: new Date('2021-06-01'),
    updatedAt: new Date('2022-12-31')
  },
  {
    id: '6',
    title: 'Bus Route Optimizer',
    description: 'Optimize public transportation routes based on citizen feedback',
    category: 'transportation' as const,
    status: 'planning' as const,
    tags: ['Python', 'Machine Learning', 'Transportation', 'Urban Planning'],
    githubUrl: 'https://github.com/g0v/bus-optimize',
    stars: 67,
    forks: 12,
    createdAt: new Date('2023-11-01'),
    updatedAt: new Date('2024-01-05')
  },
  {
    id: '7',
    title: 'Legislative Yuan Transcript',
    description: 'Searchable database of Legislative Yuan meeting transcripts',
    category: 'government' as const,
    status: 'active' as const,
    tags: ['Python', 'NLP', 'Open Data', 'Government'],
    githubUrl: 'https://github.com/g0v/ly-transcript',
    websiteUrl: 'https://sayit.archive.tw',
    stars: 334,
    forks: 78,
    createdAt: new Date('2022-02-15'),
    updatedAt: new Date('2024-01-11')
  },
  {
    id: '8',
    title: 'School Lunch Menu Platform',
    description: 'Transparency platform for school lunch menus and nutritional data',
    category: 'education' as const,
    status: 'active' as const,
    tags: ['Vue.js', 'Education', 'Health', 'Open Data'],
    githubUrl: 'https://github.com/g0v/school-lunch',
    stars: 89,
    forks: 23,
    createdAt: new Date('2023-08-20'),
    updatedAt: new Date('2024-01-09')
  }
];