"use server"

import { HOME_CONFIG } from "@/lib/features/home/config";
import type { AboutFeature } from "@/lib/features/home/config";

export async function getHomeData(): Promise<{
  aboutFeatures: AboutFeature[];
  communityRoles: string[];
}> {
  return {
    aboutFeatures: [...HOME_CONFIG.aboutFeatures] as AboutFeature[],
    communityRoles: [...HOME_CONFIG.communityRoles]
  };
}

export async function getAboutFeatures(): Promise<AboutFeature[]> {
  return [...HOME_CONFIG.aboutFeatures] as AboutFeature[];
}


export async function getCommunityRoles(): Promise<readonly string[]> {
  return HOME_CONFIG.communityRoles;
}