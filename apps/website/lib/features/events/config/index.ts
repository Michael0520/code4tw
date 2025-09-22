/**
 * Events Configuration
 * All configurable values and business rules
 */

export const EVENTS_CONFIG = {
  // Event Types
  types: [
    { value: 'all', labelKey: 'events.types.all' },
    { value: 'hackathon', labelKey: 'events.types.hackathon', icon: '⚡', color: 'purple' },
    { value: 'workshop', labelKey: 'events.types.workshop', icon: '🛠️', color: 'blue' },
    { value: 'meetup', labelKey: 'events.types.meetup', icon: '👥', color: 'green' },
    { value: 'training', labelKey: 'events.types.training', icon: '📚', color: 'orange' },
    { value: 'conference', labelKey: 'events.types.conference', icon: '🎤', color: 'red' }
  ],

  // Event Statuses
  statuses: [
    { value: 'all', labelKey: 'events.statuses.all' },
    { value: 'upcoming', labelKey: 'events.statuses.upcoming', color: 'blue' },
    { value: 'ongoing', labelKey: 'events.statuses.ongoing', color: 'green' },
    { value: 'past', labelKey: 'events.statuses.past', color: 'gray' },
    { value: 'cancelled', labelKey: 'events.statuses.cancelled', color: 'red' }
  ],

  // Display Settings
  display: {
    itemsPerPage: 12,
    featuredCount: 3,
    upcomingCount: 6,
    pastCount: 9,
    maxTagsToShow: 3,
    descriptionLength: 200
  },

  // Search Configuration
  search: {
    minQueryLength: 2,
    debounceMs: 300,
    searchFields: ['title', 'description', 'location', 'tags']
  },

  // Sorting Options
  sortOptions: [
    { value: 'eventDate', label: 'Date (Earliest First)', order: 'asc' },
    { value: 'eventDate', label: 'Date (Latest First)', order: 'desc' },
    { value: 'title', label: 'Title (A-Z)', order: 'asc' },
    { value: 'registrations', label: 'Most Popular', order: 'desc' },
    { value: 'capacity', label: 'Largest Events', order: 'desc' }
  ],

  // Default Values
  defaults: {
    type: 'all',
    status: 'upcoming',
    sortBy: 'eventDate',
    sortOrder: 'asc'
  },

  // Capacity Configuration
  capacity: {
    nearlyFullThreshold: 0.9,
    warningThreshold: 0.8,
    minimumCapacity: 1,
    maximumCapacity: 1000
  },

  // Date Configuration
  dates: {
    upcomingDaysLimit: 365,
    dateFormat: {
      short: { month: 'short', day: 'numeric' },
      long: { year: 'numeric', month: 'long', day: 'numeric' },
      full: {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }
    }
  },

  // URLs
  urls: {
    eventsApi: '/api/events',
    defaultImage: '/images/event-placeholder.svg',
    registrationBase: 'https://g0v-jothon.kktix.cc/events/'
  },

  // Validation Rules
  validation: {
    title: {
      minLength: 5,
      maxLength: 200,
      required: true
    },
    description: {
      minLength: 20,
      maxLength: 2000,
      required: true
    },
    location: {
      minLength: 2,
      maxLength: 200,
      required: true
    },
    tags: {
      minCount: 0,
      maxCount: 10,
      maxLength: 30
    },
    capacity: {
      min: 1,
      max: 1000
    }
  },

  // Messages - translation keys
  messages: {
    noEvents: 'events.messages.noEvents',
    loading: 'events.messages.loading',
    error: 'events.messages.error',
    searchPlaceholder: 'events.messages.searchPlaceholder',
    filterBy: 'events.messages.filterBy',
    sortBy: 'events.messages.sortBy',
    register: 'events.messages.register',
    soldOut: 'events.messages.soldOut',
    cancelled: 'events.messages.cancelled',
    backToEvents: 'events.messages.backToEvents',
    spotsAvailable: 'events.messages.spotsAvailable',
    registeredCount: 'events.messages.registeredCount'
  }
};

// Static events data (temporary until API/database is ready)
export const STATIC_EVENTS_DATA = [
  {
    id: '1',
    title: 'g0v Hackathon #58',
    slug: 'g0v-hackathon-58',
    description: 'Bi-monthly g0v hackathon, welcoming all friends interested in civic technology. Join us for a day of collaborative coding, networking, and building solutions for social good.',
    type: 'hackathon' as const,
    status: 'upcoming' as const,
    eventDate: new Date('2024-02-17T09:00:00'),
    endDate: new Date('2024-02-17T18:00:00'),
    timeInfo: '09:00-18:00',
    locationName: 'Academia Sinica Humanities and Social Sciences Building',
    locationAddress: 'No. 128, Sec. 2, Academia Rd, Nangang District, Taipei City',
    isOnline: false,
    maxCapacity: 100,
    currentRegistered: 85,
    registrationUrl: 'https://g0v-jothon.kktix.cc/events/g0v-hackath58n',
    imageUrl: '/events-g0v-hackathon.jpg',
    isFeatured: true,
    organizerId: 'g0v-jothon',
    organizerName: 'g0v Jothon',
    tags: ['hackathon', 'civic tech', 'collaboration', 'open source'],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-20')
  },
  {
    id: '2',
    title: 'Open Data Workshop',
    slug: 'open-data-workshop',
    description: 'Learn how to use government open data and create simple data visualization projects. This hands-on workshop will cover data access, processing, and visualization techniques.',
    type: 'workshop' as const,
    status: 'upcoming' as const,
    eventDate: new Date('2024-02-10T14:00:00'),
    endDate: new Date('2024-02-10T17:00:00'),
    timeInfo: '14:00-17:00',
    locationName: 'Taipei City Government Department of Information Technology',
    locationAddress: 'No. 1, City Hall Rd, Xinyi District, Taipei City',
    isOnline: false,
    maxCapacity: 30,
    currentRegistered: 22,
    registrationUrl: 'https://example.com/register-workshop',
    imageUrl: '/events-open-data-workshop.jpg',
    isFeatured: false,
    organizerId: 'taipei-gov',
    organizerName: 'Taipei City Government',
    tags: ['open data', 'workshop', 'data visualization', 'government'],
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-18')
  },
  {
    id: '3',
    title: 'Civic Tech Monthly Meetup',
    slug: 'civic-tech-monthly-meetup',
    description: 'Monthly regular meetup to share the latest civic tech projects and ideas. Connect with like-minded individuals and discover new opportunities for collaboration.',
    type: 'meetup' as const,
    status: 'upcoming' as const,
    eventDate: new Date('2024-02-05T19:00:00'),
    endDate: new Date('2024-02-05T21:00:00'),
    timeInfo: '19:00-21:00',
    locationName: 'NPO HUB Taipei',
    locationAddress: 'No. 25, Sec. 3, Minsheng E Rd, Zhongshan District, Taipei City',
    isOnline: false,
    maxCapacity: 50,
    currentRegistered: 35,
    registrationUrl: 'https://example.com/register-meetup',
    imageUrl: '/events-civic-tech-meetup.jpg',
    isFeatured: false,
    organizerId: 'civic-tech-tw',
    organizerName: 'Civic Tech Taiwan',
    tags: ['meetup', 'networking', 'civic tech', 'community'],
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: '4',
    title: 'vTaiwan User Training',
    slug: 'vtaiwan-user-training',
    description: 'Deep dive into vTaiwan platform usage and digital regulatory adaptation process. Learn how to participate effectively in Taiwan\'s digital democracy initiatives.',
    type: 'training' as const,
    status: 'past' as const,
    eventDate: new Date('2024-01-20T10:00:00'),
    endDate: new Date('2024-01-20T16:00:00'),
    timeInfo: '10:00-16:00',
    locationName: 'Online Event',
    isOnline: true,
    maxCapacity: 80,
    currentRegistered: 65,
    registrationUrl: 'https://example.com/register-vtaiwan',
    imageUrl: '/events-vtaiwan-training.jpg',
    isFeatured: false,
    organizerId: 'vtaiwan-team',
    organizerName: 'vTaiwan Team',
    tags: ['vtaiwan', 'digital democracy', 'training', 'online'],
    createdAt: new Date('2023-12-20'),
    updatedAt: new Date('2024-01-21')
  },
  {
    id: '5',
    title: 'Open Source Contribution Bootcamp',
    slug: 'open-source-contribution-bootcamp',
    description: 'Beginner-friendly open source contribution tutorial, from Git basics to PR submission. Perfect for those new to open source development.',
    type: 'workshop' as const,
    status: 'past' as const,
    eventDate: new Date('2024-01-15T13:00:00'),
    endDate: new Date('2024-01-15T17:00:00'),
    timeInfo: '13:00-17:00',
    locationName: 'NTU Computer Science Department',
    locationAddress: 'No. 1, Sec. 4, Roosevelt Rd, Da\'an District, Taipei City',
    isOnline: false,
    maxCapacity: 40,
    currentRegistered: 38,
    registrationUrl: 'https://example.com/register-bootcamp',
    imageUrl: '/events-open-source-bootcamp.jpg',
    isFeatured: false,
    organizerId: 'ntu-cs',
    organizerName: 'NTU Computer Science',
    tags: ['open source', 'git', 'workshop', 'beginners'],
    createdAt: new Date('2023-12-15'),
    updatedAt: new Date('2024-01-16')
  },
  {
    id: '6',
    title: 'Digital Democracy Forum',
    slug: 'digital-democracy-forum',
    description: 'Exploring democratic participation models and the role of civic tech in the digital age. Join experts and practitioners for thought-provoking discussions.',
    type: 'conference' as const,
    status: 'past' as const,
    eventDate: new Date('2024-01-10T09:00:00'),
    endDate: new Date('2024-01-10T17:00:00'),
    timeInfo: '09:00-17:00',
    locationName: 'Taipei International Convention Center',
    locationAddress: 'No. 1, Sec. 5, Xinyi Rd, Xinyi District, Taipei City',
    isOnline: false,
    maxCapacity: 200,
    currentRegistered: 180,
    registrationUrl: 'https://example.com/register-forum',
    imageUrl: '/events-digital-democracy-forum.jpg',
    isFeatured: true,
    organizerId: 'democracy-tw',
    organizerName: 'Taiwan Digital Democracy Initiative',
    tags: ['democracy', 'conference', 'digital participation', 'policy'],
    createdAt: new Date('2023-11-10'),
    updatedAt: new Date('2024-01-11')
  },
  {
    id: '7',
    title: 'Code for Taiwan Onboarding Session',
    slug: 'code-for-taiwan-onboarding',
    description: 'New member orientation session for Code for Taiwan. Learn about our mission, ongoing projects, and how you can contribute to civic technology in Taiwan.',
    type: 'meetup' as const,
    status: 'upcoming' as const,
    eventDate: new Date('2024-02-25T14:00:00'),
    endDate: new Date('2024-02-25T16:00:00'),
    timeInfo: '14:00-16:00',
    locationName: 'Social Innovation Lab',
    locationAddress: 'No. 99, Sec. 1, Zhongxiao E Rd, Zhongzheng District, Taipei City',
    isOnline: false,
    maxCapacity: 25,
    currentRegistered: 12,
    registrationUrl: 'https://example.com/register-onboarding',
    imageUrl: '/events-onboarding-session.jpg',
    isFeatured: false,
    organizerId: 'code4taiwan',
    organizerName: 'Code for Taiwan',
    tags: ['onboarding', 'newcomers', 'orientation', 'community'],
    createdAt: new Date('2024-01-25'),
    updatedAt: new Date('2024-01-28')
  },
  {
    id: '8',
    title: 'AI Ethics in Civic Technology',
    slug: 'ai-ethics-civic-tech',
    description: 'Discussion on ethical considerations when implementing AI in civic technology projects. Explore best practices and potential pitfalls.',
    type: 'conference' as const,
    status: 'upcoming' as const,
    eventDate: new Date('2024-03-15T10:00:00'),
    endDate: new Date('2024-03-15T17:00:00'),
    timeInfo: '10:00-17:00',
    locationName: 'Academia Sinica',
    locationAddress: 'No. 128, Sec. 2, Academia Rd, Nangang District, Taipei City',
    isOnline: false,
    maxCapacity: 150,
    currentRegistered: 45,
    registrationUrl: 'https://example.com/register-ai-ethics',
    imageUrl: '/events-ai-ethics.jpg',
    isFeatured: true,
    organizerId: 'ai-ethics-tw',
    organizerName: 'Taiwan AI Ethics Initiative',
    tags: ['ai', 'ethics', 'conference', 'technology'],
    createdAt: new Date('2024-01-30'),
    updatedAt: new Date('2024-02-05')
  }
];