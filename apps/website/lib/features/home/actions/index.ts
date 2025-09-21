"use server"

import { HOME_CONFIG } from "@/lib/features/home/config";
import type { HomeConfig, AboutFeature, Project } from "@/lib/features/home/config";

export async function getHomeData(): Promise<{
  aboutFeatures: AboutFeature[];
  projects: Project[];
  communityRoles: string[];
}> {
  return {
    aboutFeatures: [...HOME_CONFIG.aboutFeatures] as AboutFeature[],
    projects: [...HOME_CONFIG.projects] as Project[],
    communityRoles: [...HOME_CONFIG.communityRoles]
  };
}

export async function getAboutFeatures(): Promise<AboutFeature[]> {
  return [...HOME_CONFIG.aboutFeatures] as AboutFeature[];
}

export async function getProjects(): Promise<Project[]> {
  return [...HOME_CONFIG.projects] as Project[];
}

export async function getCommunityRoles(): Promise<readonly string[]> {
  return HOME_CONFIG.communityRoles;
}