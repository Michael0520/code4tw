/**
 * News Configuration
 * All configurable values and business rules
 */

export const NEWS_CONFIG = {
  // News Categories
  categories: [
    { value: 'all', label: 'All Categories' },
    { value: 'announcement', label: 'Announcement', icon: '📢', color: 'blue' },
    { value: 'release', label: 'Release', icon: '🚀', color: 'green' },
    { value: 'event', label: 'Event', icon: '📅', color: 'purple' },
    { value: 'community', label: 'Community', icon: '👥', color: 'orange' },
    { value: 'tutorial', label: 'Tutorial', icon: '📚', color: 'yellow' },
    { value: 'update', label: 'Update', icon: '🔄', color: 'gray' }
  ],

  // Display Settings
  display: {
    itemsPerPage: 10,
    featuredCount: 3,
    recentCount: 5,
    maxTagsToShow: 3,
    excerptLength: 200
  },

  // Search Configuration
  search: {
    minQueryLength: 2,
    debounceMs: 300,
    searchFields: ['title', 'excerpt', 'content', 'tags']
  },

  // Sorting Options
  sortOptions: [
    { value: 'publishedAt', label: 'Newest First', order: 'desc' },
    { value: 'publishedAt', label: 'Oldest First', order: 'asc' },
    { value: 'title', label: 'Alphabetical', order: 'asc' },
    { value: 'readingTime', label: 'Quick Reads', order: 'asc' }
  ],

  // Default Values
  defaults: {
    category: 'all',
    sortBy: 'publishedAt',
    sortOrder: 'desc'
  },

  // Reading Time Configuration
  readingTime: {
    wordsPerMinute: 200,
    minimumMinutes: 1
  },

  // Date Configuration
  dates: {
    recentDaysThreshold: 7,
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
    newsApi: '/api/news',
    defaultImage: '/images/news-placeholder.svg'
  },

  // Validation Rules
  validation: {
    title: {
      minLength: 5,
      maxLength: 200,
      required: true
    },
    excerpt: {
      minLength: 20,
      maxLength: 500,
      required: true
    },
    content: {
      minLength: 100,
      maxLength: 50000,
      required: true
    },
    tags: {
      minCount: 0,
      maxCount: 8,
      maxLength: 25
    }
  },

  // Messages
  messages: {
    noNews: 'No news articles found',
    loading: 'Loading news...',
    error: 'Failed to load news',
    searchPlaceholder: 'Search news...',
    filterBy: 'Filter by category',
    sortBy: 'Sort by',
    readMore: 'Read more',
    backToNews: 'Back to news'
  }
};

// Static news data (temporary until API/database is ready)
export const STATIC_NEWS_DATA = [
  {
    id: '1',
    title: 'vTaiwan Platform Launches New Discussion Features',
    slug: 'vtaiwan-new-discussion-features',
    excerpt: 'vTaiwan digital regulatory platform introduces enhanced discussion capabilities to facilitate better citizen participation in policy making.',
    content: `The vTaiwan platform has unveiled a major update with new discussion features designed to enhance citizen engagement in the policy-making process. These improvements include real-time commenting, threaded discussions, and improved moderation tools.

The new features were developed in response to community feedback and aim to make policy discussions more accessible and productive. Citizens can now engage in more structured debates about regulatory proposals, with better tools for organizing and prioritizing different viewpoints.

Key improvements include:
- Real-time collaborative editing for policy documents
- Enhanced voting mechanisms for proposal prioritization
- Improved accessibility features for users with disabilities
- Mobile-optimized interface for on-the-go participation

The platform continues to serve as a bridge between government and citizens, demonstrating Taiwan's commitment to digital democracy and transparent governance.`,
    category: 'announcement' as const,
    authorId: 'team-g0v',
    authorName: 'g0v Team',
    tags: ['vTaiwan', 'Digital Democracy', 'Policy', 'Platform Update'],
    isPublished: true,
    isFeatured: true,
    publishedAt: new Date('2024-01-15'),
    createdAt: new Date('2024-01-14'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: '2',
    title: 'g0v Summit 2024 Call for Proposals Opens',
    slug: 'g0v-summit-2024-cfp',
    excerpt: 'The largest civic tech conference in Asia is accepting proposals for talks, workshops, and community sessions.',
    content: `g0v Summit 2024 is officially calling for proposals! This biennial conference brings together civic hackers, government officials, NGO workers, and citizens from across Asia and beyond.

We're looking for diverse voices and perspectives on topics including:
- Digital democracy and participation
- Open government and transparency
- Social innovation through technology
- Community organizing and activism
- Data for social good
- Digital rights and privacy

The summit will feature multiple tracks including technical talks, policy discussions, community showcases, and hands-on workshops. We especially encourage submissions from underrepresented communities and first-time speakers.

Important dates:
- Proposal deadline: March 15, 2024
- Speaker notification: April 1, 2024
- Summit dates: October 26-27, 2024

Join us in shaping the future of civic technology in Taiwan and beyond!`,
    category: 'event' as const,
    authorId: 'summit-team',
    authorName: 'g0v Summit Team',
    tags: ['g0v Summit', 'Conference', 'Call for Proposals', 'Civic Tech'],
    isPublished: true,
    isFeatured: true,
    publishedAt: new Date('2024-01-10'),
    createdAt: new Date('2024-01-09'),
    updatedAt: new Date('2024-01-10')
  },
  {
    id: '3',
    title: 'Moedict API v2.0 Released with Enhanced Language Support',
    slug: 'moedict-api-v2-release',
    excerpt: 'The popular dictionary API now supports more languages and provides improved search capabilities for developers.',
    content: `Moedict, the beloved open-source dictionary project, has released version 2.0 of its API with significant improvements and new language support.

New features in v2.0:
- Extended support for Taiwanese and Hakka dialects
- Improved fuzzy search algorithms
- Better pronunciation guides with audio support
- RESTful API design with comprehensive documentation
- Rate limiting and caching for better performance

The API serves millions of requests monthly from educational apps, language learning platforms, and research projects. The new version maintains backward compatibility while offering enhanced functionality for developers.

Developer resources:
- Comprehensive API documentation at api.moedict.tw
- SDKs available for Python, JavaScript, and Ruby
- Interactive API explorer for testing
- Community Discord for developer support

Special thanks to the volunteer translators and linguists who contributed to expanding the language coverage.`,
    category: 'release' as const,
    authorId: 'moedict-team',
    authorName: 'Moedict Team',
    tags: ['Moedict', 'API', 'Language', 'Open Source', 'Release'],
    isPublished: true,
    isFeatured: false,
    publishedAt: new Date('2024-01-08'),
    createdAt: new Date('2024-01-07'),
    updatedAt: new Date('2024-01-08')
  },
  {
    id: '4',
    title: 'Community Spotlight: Taiwan Open Data Success Stories',
    slug: 'open-data-success-stories',
    excerpt: 'Highlighting innovative projects that have leveraged Taiwan\'s open data initiatives to create social impact.',
    content: `Taiwan's commitment to open data has spawned numerous innovative projects that benefit society. This month we spotlight three remarkable success stories.

**Project 1: Public Transport Accessibility Map**
A volunteer-driven initiative mapping wheelchair accessibility across Taipei's MRT system. Using open government data on station facilities, the project created an interactive map helping people with mobility challenges plan their journeys.

**Project 2: Air Quality Prediction Model**
Researchers combined environmental monitoring data with weather patterns to create accurate air quality forecasts. The model now helps thousands of people make informed decisions about outdoor activities.

**Project 3: School Lunch Nutrition Tracker**
Parents developed a platform tracking nutritional content of school meals using education department data. The tool has influenced policy changes improving meal quality across multiple school districts.

These projects demonstrate how open data, combined with civic engagement, can drive meaningful change. Each started as a weekend project and grew into essential community resources.`,
    category: 'community' as const,
    authorId: 'community-team',
    authorName: 'Community Team',
    tags: ['Open Data', 'Community', 'Social Impact', 'Innovation'],
    isPublished: true,
    isFeatured: false,
    publishedAt: new Date('2024-01-05'),
    createdAt: new Date('2024-01-04'),
    updatedAt: new Date('2024-01-05')
  },
  {
    id: '5',
    title: 'How to Get Started with Civic Hacking: A Beginner\'s Guide',
    slug: 'civic-hacking-beginners-guide',
    excerpt: 'New to civic technology? Learn how to contribute to projects that make a difference in your community.',
    content: `Interested in using your tech skills for social good but don't know where to start? This guide will help you take your first steps into civic hacking.

**What is Civic Hacking?**
Civic hacking involves using technology to improve government services, increase transparency, and solve community problems. It's about applying your skills to create positive social impact.

**Getting Started:**

1. **Join the Community**
   - Attend g0v meetups and hackathons
   - Join the Slack workspace
   - Follow projects on GitHub

2. **Find Your Interests**
   - Education and digital literacy
   - Environmental monitoring
   - Government transparency
   - Social services accessibility

3. **Choose Your Role**
   - Developer (frontend, backend, mobile)
   - Designer (UX/UI, visual design)
   - Data analyst or scientist
   - Project manager or organizer
   - Content creator or translator

4. **Start Contributing**
   - Browse open issues on GitHub
   - Attend project-specific meetups
   - Propose new features or improvements
   - Help with documentation

**Tips for Success:**
- Start small with documentation or bug fixes
- Ask questions - the community is welcoming
- Focus on projects you're passionate about
- Don't worry about being "technical enough"

Remember, civic hacking is about more than code - we need diverse skills and perspectives to create meaningful change.`,
    category: 'tutorial' as const,
    authorId: 'education-team',
    authorName: 'Education Team',
    tags: ['Tutorial', 'Civic Hacking', 'Getting Started', 'Community'],
    isPublished: true,
    isFeatured: true,
    publishedAt: new Date('2024-01-03'),
    createdAt: new Date('2024-01-02'),
    updatedAt: new Date('2024-01-03')
  },
  {
    id: '6',
    title: 'Infrastructure Updates: Improved Performance and Security',
    slug: 'infrastructure-updates-2024',
    excerpt: 'Regular maintenance updates to improve platform performance, security, and reliability across all g0v services.',
    content: `We've completed major infrastructure updates across all g0v platforms to improve performance, enhance security, and ensure better reliability for our community.

**Performance Improvements:**
- 40% faster page load times across all platforms
- Upgraded CDN infrastructure for global accessibility
- Database optimizations reducing query response times
- Improved caching strategies for static content

**Security Enhancements:**
- Updated SSL certificates and encryption protocols
- Enhanced DDoS protection and rate limiting
- Regular security audits and vulnerability assessments
- Improved authentication and authorization systems

**Reliability Updates:**
- Implemented redundant backup systems
- Enhanced monitoring and alerting capabilities
- Automated failover mechanisms
- Regular disaster recovery testing

**User Experience:**
- Better mobile responsiveness across all platforms
- Improved accessibility compliance (WCAG 2.1 AA)
- Enhanced search functionality
- Streamlined user onboarding process

These updates ensure our platforms can continue serving the growing civic tech community while maintaining the high standards of security and performance you expect.

All updates were completed with zero downtime thanks to our rolling deployment strategy.`,
    category: 'update' as const,
    authorId: 'infrastructure-team',
    authorName: 'Infrastructure Team',
    tags: ['Infrastructure', 'Performance', 'Security', 'Updates'],
    isPublished: true,
    isFeatured: false,
    publishedAt: new Date('2024-01-01'),
    createdAt: new Date('2023-12-31'),
    updatedAt: new Date('2024-01-01')
  }
];