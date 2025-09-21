/**
 * About Configuration
 * All configurable values and static data for organization information
 */

import { OrganizationData } from '@/lib/features/about/domain';

export const ABOUT_CONFIG = {
  // Display Settings
  display: {
    maxPrinciplesToShow: 8,
    maxValuesToShow: 8,
    maxTeamMembersToShow: 12,
    descriptionLength: 300,
    bioLength: 200,
  },

  // Validation Rules
  validation: {
    name: {
      minLength: 2,
      maxLength: 100,
      required: true,
    },
    tagline: {
      minLength: 10,
      maxLength: 200,
      required: true,
    },
    description: {
      minLength: 50,
      maxLength: 2000,
      required: true,
    },
    mission: {
      title: {
        minLength: 5,
        maxLength: 200,
        required: true,
      },
      description: {
        minLength: 20,
        maxLength: 2000,
        required: true,
      },
    },
    teamMember: {
      name: {
        minLength: 2,
        maxLength: 100,
        required: true,
      },
      role: {
        minLength: 2,
        maxLength: 100,
        required: true,
      },
      bio: {
        minLength: 10,
        maxLength: 1000,
        required: true,
      },
    },
  },

  // Contact Information
  contactChannels: [
    { platform: 'email', label: 'Email', icon: '📧', baseUrl: 'mailto:' },
    { platform: 'website', label: 'Website', icon: '🌐', baseUrl: 'https://' },
    { platform: 'github', label: 'GitHub', icon: '🐙', baseUrl: 'https://github.com/' },
    { platform: 'slack', label: 'Slack', icon: '💬', baseUrl: 'https://' },
    { platform: 'facebook', label: 'Facebook', icon: '📘', baseUrl: 'https://facebook.com/' },
    { platform: 'twitter', label: 'Twitter', icon: '🐦', baseUrl: 'https://twitter.com/' },
    { platform: 'linkedin', label: 'LinkedIn', icon: '💼', baseUrl: 'https://linkedin.com/' },
  ],

  // Target Audiences
  targetAudiences: [
    { id: 'developers', icon: '👨‍💻', color: 'blue' },
    { id: 'designers', icon: '🎨', color: 'purple' },
    { id: 'projectManagers', icon: '📋', color: 'green' },
    { id: 'dataScientists', icon: '📊', color: 'orange' },
    { id: 'journalists', icon: '📰', color: 'red' },
    { id: 'socialWorkers', icon: '🤝', color: 'pink' },
    { id: 'students', icon: '🎓', color: 'indigo' },
    { id: 'citizens', icon: '🏛️', color: 'gray' },
  ],

  // URLs
  urls: {
    defaultAvatar: '/images/default-avatar.svg',
    organizationLogo: '/images/logo.svg',
  },
};

// Static organization data
export const STATIC_ORGANIZATION_DATA: OrganizationData = {
  id: 'code-for-taiwan',
  name: 'Code for Taiwan',
  tagline: 'Let everyone in Taiwan provide good Code!',
  foundedYear: 2024,
  description: 'Code for Taiwan is inspired by g0v and hopes to enable everyone in Taiwan to have the concept and thinking of Code. Unlike the project-oriented g0v, Code for Taiwan focuses on popularizing Code Concept. In this era of AI prevalence, many people have begun to invest in the field of no-code and low-code. The good direction is that everyone\'s productivity has improved, and the bad direction is that they don\'t know what they are developing. Therefore, we hope that through Code for Taiwan, everyone can have corresponding thinking logic when investing in program development, rather than just playing slot machines.',
  mission: {
    title: 'Our Mission',
    description: 'To foster transparency, accountability, and citizen participation in Taiwan through the collaborative development of civic technology.',
  },
  vision: {
    title: 'Our Vision',
    description: 'A Taiwan where technology serves all citizens and enables effective democratic participation.',
  },
  contactInfo: {
    email: 'hello@codefortaiwan.org',
    website: 'codefortaiwan.org',
    github: 'codefortaiwan',
    slack: 'codefortaiwan.slack.com',
    facebook: 'CodeForTaiwan',
  },
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date('2024-12-01'),
};

// Static core principles data
export const STATIC_PRINCIPLES_DATA = [
  {
    id: 'code-thinking',
    title: 'Code Thinking Popularization',
    description: 'Enable everyone to understand programming logic, not just use tools, but also understand the principles behind them',
    icon: '🧠',
    color: 'blue',
    priority: 100,
  },
  {
    id: 'innovative-solutions',
    title: 'Innovative Solutions',
    description: 'In the era of AI prevalence, cultivate correct development thinking and avoid blindly using no-code/low-code tools',
    icon: '💡',
    color: 'yellow',
    priority: 90,
  },
  {
    id: 'urban-rural-balance',
    title: 'Urban-Rural Balanced Development',
    description: 'Promote technological thinking to non-urban areas and reduce the digital divide between urban and rural areas',
    icon: '🌍',
    color: 'green',
    priority: 80,
  },
  {
    id: 'universal-participation',
    title: 'Universal Participation',
    description: 'Not only serve engineers, PMs, designers, but also enable all Taiwanese to master technology',
    icon: '🤝',
    color: 'purple',
    priority: 70,
  },
];

// Static core values data
export const STATIC_VALUES_DATA = [
  {
    id: 'transparent-governance',
    title: 'Transparent Governance',
    description: 'Promote government information transparency and make it easier for citizens to supervise government operations',
    icon: '👁️',
    color: 'blue',
  },
  {
    id: 'social-care',
    title: 'Social Care',
    description: 'Focus on the rights of disadvantaged groups and use technology to bridge the digital divide',
    icon: '❤️',
    color: 'red',
  },
  {
    id: 'rapid-action',
    title: 'Rapid Action',
    description: 'In the face of social issues, we respond quickly and propose solutions',
    icon: '⚡',
    color: 'orange',
  },
  {
    id: 'international-connection',
    title: 'International Connection',
    description: 'Exchange with international civic technology communities and share Taiwan\'s experience',
    icon: '🌐',
    color: 'green',
  },
];

// Static team members data
export const STATIC_TEAM_DATA = [
  {
    id: 'founder-1',
    name: 'Michael Lo',
    role: 'Founder & Lead Developer',
    bio: 'Passionate about using technology to solve social problems and promote civic participation.',
    imageUrl: '/team/michael-lo.jpg',
    socialLinks: {
      github: 'michaeltmlo',
      twitter: 'michaeltmlo',
      linkedin: 'michaeltmlo',
    },
    isActive: true,
  },
  {
    id: 'core-1',
    name: 'Alice Chen',
    role: 'Community Manager',
    bio: 'Expert in community building and organizing civic tech events across Taiwan.',
    imageUrl: '/team/alice-chen.jpg',
    socialLinks: {
      linkedin: 'alicechen',
      facebook: 'alicechen',
    },
    isActive: true,
  },
  {
    id: 'core-2',
    name: 'Bob Wu',
    role: 'Technical Lead',
    bio: 'Full-stack developer with experience in government technology and open data platforms.',
    imageUrl: '/team/bob-wu.jpg',
    socialLinks: {
      github: 'bobwu',
      linkedin: 'bobwu',
    },
    isActive: true,
  },
  {
    id: 'core-3',
    name: 'Catherine Liu',
    role: 'UX/UI Designer',
    bio: 'Specializes in accessible design and user experience for civic technology applications.',
    imageUrl: '/team/catherine-liu.jpg',
    socialLinks: {
      behance: 'catherineliu',
      linkedin: 'catherineliu',
    },
    isActive: true,
  },
  {
    id: 'volunteer-1',
    name: 'David Wang',
    role: 'Data Scientist',
    bio: 'Works on data analysis and visualization projects for transparency initiatives.',
    imageUrl: '/team/david-wang.jpg',
    socialLinks: {
      github: 'davidwang',
      kaggle: 'davidwang',
    },
    isActive: true,
  },
  {
    id: 'volunteer-2',
    name: 'Emily Chang',
    role: 'Project Coordinator',
    bio: 'Manages project timelines and coordinates between different stakeholder groups.',
    imageUrl: '/team/emily-chang.jpg',
    socialLinks: {
      linkedin: 'emilychang',
    },
    isActive: true,
  },
];

// Messages and labels
export const ABOUT_MESSAGES = {
  loading: 'Loading organization information...',
  error: 'Failed to load organization information',
  notFound: 'Organization information not found',
  teamLoading: 'Loading team information...',
  teamError: 'Failed to load team information',
  contactUs: 'Contact Us',
  joinUs: 'Join Us',
  learnMore: 'Learn More',
  viewProjects: 'View Projects',
  viewEvents: 'View Events',
  backToTop: 'Back to Top',
};