export interface AboutFeature {
  id: string;
  title: string;
  description: string;
  icon?: string;
}

export interface HomeFeature extends AboutFeature {
  link: string;
}

export interface CommunityRole {
  id: string;
  title: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  status: string;
  category: string;
  image?: string;
  url?: string;
  stars?: number;
  forks?: number;
  technologies?: string[];
  github?: string;
}

export const HOME_CONFIG = {
  aboutFeatures: [
    {
      id: 'open-source',
      title: 'Open Source',
      description: 'All projects are open source and welcome contributions from the community'
    },
    {
      id: 'community-driven',
      title: 'Community Driven',
      description: 'Diverse community of volunteers working together for social impact'
    },
    {
      id: 'innovation',
      title: 'Innovation',
      description: 'Innovative solutions for social challenges using modern technology'
    },
    {
      id: 'transparency',
      title: 'Government Transparency',
      description: 'Building tools to make government more transparent and accountable'
    }
  ] as AboutFeature[],

  projects: [
    {
      id: 'vtaiwan',
      title: 'vTaiwan',
      description: 'Digital regulation adaptation platform for citizen participation',
      status: 'active',
      category: 'government',
      stars: 125,
      forks: 45,
      technologies: ['Vue.js', 'Node.js', 'PostgreSQL'],
      github: 'https://github.com/g0v/vtaiwan'
    },
    {
      id: 'moedict',
      title: 'Moedict',
      description: 'Open online dictionary for Mandarin, Taiwanese, and Hakka',
      status: 'active',
      category: 'education',
      stars: 890,
      forks: 156,
      technologies: ['JavaScript', 'LiveScript', 'CSS'],
      github: 'https://github.com/g0v/moedict-webkit'
    }
  ] as Project[],

  communityRoles: [
    'Developers',
    'Designers',
    'Data Scientists',
    'Project Managers',
    'Community Organizers'
  ] as const
};