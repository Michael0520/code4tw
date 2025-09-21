"use server"

import { HOME_CONFIG } from "@/lib/features/home/config";
import type { HomeConfig, AboutFeature, Project } from "@/lib/features/home/config";

export async function getHomeData(): Promise<{
  aboutFeatures: AboutFeature[];
  projects: Project[];
  communityRoles: string[];
}> {
  return {
    aboutFeatures: [...HOME_CONFIG.aboutFeatures],
    projects: [...HOME_CONFIG.projects],
    communityRoles: [...HOME_CONFIG.communityRoles]
  };
}

export async function getAboutFeatures(): Promise<AboutFeature[]> {
  return [...HOME_CONFIG.aboutFeatures];
}

export async function getProjects(): Promise<Project[]> {
  return [...HOME_CONFIG.projects];
}

export async function getCommunityRoles(): Promise<readonly string[]> {
  return HOME_CONFIG.communityRoles;
}