import { HOME_CONFIG } from "./config";

export async function getHomeData() {
  return {
    aboutFeatures: HOME_CONFIG.aboutFeatures,
    projects: HOME_CONFIG.projects,
    communityRoles: HOME_CONFIG.communityRoles
  };
}