/**
 * About Server Actions
 * Use cases and data fetching logic for organization information
 */

'use server';

import {
  Organization,
  OrganizationPrinciple,
  CoreValue,
  TeamMember,
  AboutService,
} from '@/lib/features/about/domain';
import {
  STATIC_ORGANIZATION_DATA,
  STATIC_PRINCIPLES_DATA,
  STATIC_VALUES_DATA,
  STATIC_TEAM_DATA,
  ABOUT_CONFIG,
} from '@/lib/features/about/config';

// ============= Types =============

export interface OrganizationDto {
  id: string;
  name: string;
  tagline: string;
  foundedYear: number;
  age: number;
  description: string;
  mission: {
    title: string;
    description: string;
  };
  vision: {
    title: string;
    description: string;
  };
  contactInfo: Record<string, string>;
  createdAt: string;
  updatedAt: string;
}

export interface CoreValueDto {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

export interface OrganizationPrincipleDto {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  priority: number;
}

export interface TeamMemberDto {
  id: string;
  name: string;
  role: string;
  bio: string;
  imageUrl?: string;
  socialLinks: Record<string, string>;
  isActive: boolean;
}

export interface AboutResponse {
  organization: OrganizationDto;
  principles: OrganizationPrincipleDto[];
  values: CoreValueDto[];
  team: TeamMemberDto[];
  stats: {
    foundedYear: number;
    age: number;
    principlesCount: number;
    valuesCount: number;
    activeMembers: number;
    totalMembers: number;
  };
}

export interface TeamSearchFilters {
  query?: string;
  role?: string;
  isActive?: boolean;
}

// ============= Server Actions =============

/**
 * Get complete organization information
 */
export async function getAboutInformation(): Promise<AboutResponse> {
  try {
    // TODO: Replace with actual database/API call
    const organizationData = STATIC_ORGANIZATION_DATA;
    const principlesData = STATIC_PRINCIPLES_DATA;
    const valuesData = STATIC_VALUES_DATA;
    const teamData = STATIC_TEAM_DATA;

    // Create domain entities
    const organization = Organization.create(organizationData);
    const principles = principlesData.map(data =>
      OrganizationPrinciple.create(
        data.id,
        data.title,
        data.description,
        data.icon,
        data.color,
        data.priority
      )
    );
    const values = valuesData.map(data =>
      CoreValue.create(
        data.id,
        data.title,
        data.description,
        data.icon,
        data.color
      )
    );
    const team = teamData.map(data => {
      // Filter out undefined values from socialLinks
      const cleanSocialLinks = Object.fromEntries(
        Object.entries(data.socialLinks || {}).filter(([key, value]) => value !== undefined)
      ) as Record<string, string>;

      return TeamMember.create(
        data.id,
        data.name,
        data.role,
        data.bio,
        data.imageUrl,
        cleanSocialLinks,
        data.isActive
      );
    });

    // Apply business logic through domain services
    const sortedPrinciples = AboutService.getPrinciples(principles);
    const sortedValues = AboutService.getCoreValues(values);
    const activeTeam = AboutService.getActiveTeamMembers(team);
    const stats = AboutService.getOrganizationStats(organization, principles, values, team);

    // Convert to DTOs
    return {
      organization: organizationToDto(organization),
      principles: sortedPrinciples.map(principleToDto),
      values: sortedValues.map(valueToDto),
      team: activeTeam.map(memberToDto),
      stats,
    };
  } catch (error) {
    console.error('Failed to get about information:', error);
    throw new Error('Failed to load organization information');
  }
}

/**
 * Get organization information only
 */
export async function getOrganization(): Promise<OrganizationDto> {
  try {
    const organizationData = STATIC_ORGANIZATION_DATA;
    const organization = Organization.create(organizationData);
    return organizationToDto(organization);
  } catch (error) {
    console.error('Failed to get organization:', error);
    throw new Error('Failed to load organization information');
  }
}

/**
 * Get core principles
 */
export async function getPrinciples(): Promise<OrganizationPrincipleDto[]> {
  try {
    const principlesData = STATIC_PRINCIPLES_DATA;
    const principles = principlesData.map(data =>
      OrganizationPrinciple.create(
        data.id,
        data.title,
        data.description,
        data.icon,
        data.color,
        data.priority
      )
    );

    const sortedPrinciples = AboutService.getPrinciples(principles);
    return sortedPrinciples.map(principleToDto);
  } catch (error) {
    console.error('Failed to get principles:', error);
    throw new Error('Failed to load principles');
  }
}

/**
 * Get core values
 */
export async function getCoreValues(): Promise<CoreValueDto[]> {
  try {
    const valuesData = STATIC_VALUES_DATA;
    const values = valuesData.map(data =>
      CoreValue.create(
        data.id,
        data.title,
        data.description,
        data.icon,
        data.color
      )
    );

    const sortedValues = AboutService.getCoreValues(values);
    return sortedValues.map(valueToDto);
  } catch (error) {
    console.error('Failed to get core values:', error);
    throw new Error('Failed to load core values');
  }
}

/**
 * Get team members with optional filtering
 */
export async function getTeamMembers(filters?: TeamSearchFilters): Promise<TeamMemberDto[]> {
  try {
    const teamData = STATIC_TEAM_DATA;
    const team = teamData.map(data => {
      // Filter out undefined values from socialLinks
      const cleanSocialLinks = Object.fromEntries(
        Object.entries(data.socialLinks || {}).filter(([key, value]) => value !== undefined)
      ) as Record<string, string>;

      return TeamMember.create(
        data.id,
        data.name,
        data.role,
        data.bio,
        data.imageUrl,
        cleanSocialLinks,
        data.isActive
      );
    });

    let filteredTeam = team;

    // Apply filters
    if (filters?.isActive !== undefined) {
      filteredTeam = filteredTeam.filter(member =>
        member.isActiveMember() === filters.isActive
      );
    }

    if (filters?.role) {
      filteredTeam = filteredTeam.filter(member =>
        member.getRole().toLowerCase().includes(filters.role!.toLowerCase())
      );
    }

    // Apply search
    if (filters?.query) {
      filteredTeam = AboutService.searchTeamMembers(filteredTeam, filters.query);
    } else if (filters?.isActive !== false) {
      filteredTeam = AboutService.getActiveTeamMembers(filteredTeam);
    }

    return filteredTeam.map(memberToDto);
  } catch (error) {
    console.error('Failed to get team members:', error);
    throw new Error('Failed to load team members');
  }
}

/**
 * Get active team members only
 */
export async function getActiveTeamMembers(): Promise<TeamMemberDto[]> {
  return getTeamMembers({ isActive: true });
}

/**
 * Search team members
 */
export async function searchTeamMembers(query: string): Promise<TeamMemberDto[]> {
  try {
    if (!query || query.trim().length < 2) {
      return getActiveTeamMembers();
    }

    return getTeamMembers({ query: query.trim() });
  } catch (error) {
    console.error('Failed to search team members:', error);
    throw new Error('Failed to search team members');
  }
}

/**
 * Get organization statistics
 */
export async function getOrganizationStats() {
  try {
    const organizationData = STATIC_ORGANIZATION_DATA;
    const principlesData = STATIC_PRINCIPLES_DATA;
    const valuesData = STATIC_VALUES_DATA;
    const teamData = STATIC_TEAM_DATA;

    const organization = Organization.create(organizationData);
    const principles = principlesData.map(data =>
      OrganizationPrinciple.create(
        data.id,
        data.title,
        data.description,
        data.icon,
        data.color,
        data.priority
      )
    );
    const values = valuesData.map(data =>
      CoreValue.create(
        data.id,
        data.title,
        data.description,
        data.icon,
        data.color
      )
    );
    const team = teamData.map(data => {
      // Filter out undefined values from socialLinks
      const cleanSocialLinks = Object.fromEntries(
        Object.entries(data.socialLinks || {}).filter(([key, value]) => value !== undefined)
      ) as Record<string, string>;

      return TeamMember.create(
        data.id,
        data.name,
        data.role,
        data.bio,
        data.imageUrl,
        cleanSocialLinks,
        data.isActive
      );
    });

    return AboutService.getOrganizationStats(organization, principles, values, team);
  } catch (error) {
    console.error('Failed to get organization stats:', error);
    throw new Error('Failed to load statistics');
  }
}

/**
 * Get target audiences
 */
export async function getTargetAudiences() {
  try {
    return ABOUT_CONFIG.targetAudiences;
  } catch (error) {
    console.error('Failed to get target audiences:', error);
    throw new Error('Failed to load target audiences');
  }
}

/**
 * Validate organization completeness
 */
export async function validateOrganizationCompleteness() {
  try {
    const organizationData = STATIC_ORGANIZATION_DATA;
    const organization = Organization.create(organizationData);

    return AboutService.validateOrganizationCompleteness(organization);
  } catch (error) {
    console.error('Failed to validate organization:', error);
    throw new Error('Failed to validate organization information');
  }
}

// ============= Helper Functions =============

/**
 * Convert Organization entity to DTO
 */
function organizationToDto(organization: Organization): OrganizationDto {
  const data = organization.toData();

  return {
    id: data.id,
    name: data.name,
    tagline: data.tagline,
    foundedYear: data.foundedYear,
    age: organization.getAge(),
    description: data.description,
    mission: data.mission,
    vision: data.vision,
    contactInfo: data.contactInfo,
    createdAt: data.createdAt.toISOString(),
    updatedAt: data.updatedAt.toISOString(),
  };
}

/**
 * Convert OrganizationPrinciple entity to DTO
 */
function principleToDto(principle: OrganizationPrinciple): OrganizationPrincipleDto {
  return {
    id: principle.getId(),
    title: principle.getTitle(),
    description: principle.getDescription(),
    icon: principle.getIcon(),
    color: principle.getColor(),
    priority: principle.getPriority(),
  };
}

/**
 * Convert CoreValue entity to DTO
 */
function valueToDto(value: CoreValue): CoreValueDto {
  return {
    id: value.getId(),
    title: value.getTitle(),
    description: value.getDescription(),
    icon: value.getIcon(),
    color: value.getColor(),
  };
}

/**
 * Convert TeamMember entity to DTO
 */
function memberToDto(member: TeamMember): TeamMemberDto {
  return {
    id: member.getId(),
    name: member.getName(),
    role: member.getRole(),
    bio: member.getBio(),
    imageUrl: member.getImageUrl(),
    socialLinks: member.getSocialLinks(),
    isActive: member.isActiveMember(),
  };
}

// Validation functions moved to utils.ts to avoid server action conflicts