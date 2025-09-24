import { HOME_CONFIG, type AboutFeature, type Project } from "./config";

export async function getHomeData(): Promise<{
  aboutFeatures: AboutFeature[];
  projects: Project[];
  communityRoles: readonly string[];
}> {
  return {
    aboutFeatures: HOME_CONFIG.aboutFeatures,
    projects: HOME_CONFIG.projects,
    communityRoles: HOME_CONFIG.communityRoles
  };
}