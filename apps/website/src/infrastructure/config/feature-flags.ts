// Feature flags configuration
export interface FeatureFlags {
  readonly navigation: {
    readonly advancedSearch: boolean;
    readonly multiLanguage: boolean;
    readonly darkMode: boolean;
    readonly breadcrumbs: boolean;
  };
  readonly user: {
    readonly registration: boolean;
    readonly socialLogin: boolean;
    readonly emailVerification: boolean;
    readonly profileCustomization: boolean;
    readonly twoFactorAuth: boolean;
  };
  readonly project: {
    readonly creation: boolean;
    readonly collaboration: boolean;
    readonly discussion: boolean;
    readonly fileUploads: boolean;
    readonly versionControl: boolean;
  };
  readonly content: {
    readonly comments: boolean;
    readonly reactions: boolean;
    readonly sharing: boolean;
    readonly bookmarks: boolean;
    readonly reporting: boolean;
  };
  readonly notification: {
    readonly email: boolean;
    readonly push: boolean;
    readonly inApp: boolean;
    readonly digest: boolean;
  };
  readonly analytics: {
    readonly userTracking: boolean;
    readonly performanceMonitoring: boolean;
    readonly errorReporting: boolean;
    readonly heatmaps: boolean;
  };
  readonly experimental: {
    readonly aiAssistant: boolean;
    readonly realtimeCollaboration: boolean;
    readonly voiceCommands: boolean;
    readonly mobilePWA: boolean;
  };
}

// Environment-based feature flag configurations
const FEATURE_FLAG_CONFIGS: Record<string, FeatureFlags> = {
  development: {
    navigation: {
      advancedSearch: true,
      multiLanguage: true,
      darkMode: true,
      breadcrumbs: true,
    },
    user: {
      registration: true,
      socialLogin: false,
      emailVerification: false,
      profileCustomization: true,
      twoFactorAuth: false,
    },
    project: {
      creation: true,
      collaboration: true,
      discussion: true,
      fileUploads: true,
      versionControl: false,
    },
    content: {
      comments: true,
      reactions: true,
      sharing: true,
      bookmarks: true,
      reporting: false,
    },
    notification: {
      email: false,
      push: false,
      inApp: true,
      digest: false,
    },
    analytics: {
      userTracking: false,
      performanceMonitoring: true,
      errorReporting: true,
      heatmaps: false,
    },
    experimental: {
      aiAssistant: true,
      realtimeCollaboration: false,
      voiceCommands: false,
      mobilePWA: true,
    },
  },
  staging: {
    navigation: {
      advancedSearch: true,
      multiLanguage: true,
      darkMode: true,
      breadcrumbs: true,
    },
    user: {
      registration: true,
      socialLogin: true,
      emailVerification: true,
      profileCustomization: true,
      twoFactorAuth: false,
    },
    project: {
      creation: true,
      collaboration: true,
      discussion: true,
      fileUploads: true,
      versionControl: true,
    },
    content: {
      comments: true,
      reactions: true,
      sharing: true,
      bookmarks: true,
      reporting: true,
    },
    notification: {
      email: true,
      push: false,
      inApp: true,
      digest: true,
    },
    analytics: {
      userTracking: true,
      performanceMonitoring: true,
      errorReporting: true,
      heatmaps: false,
    },
    experimental: {
      aiAssistant: false,
      realtimeCollaboration: true,
      voiceCommands: false,
      mobilePWA: true,
    },
  },
  production: {
    navigation: {
      advancedSearch: true,
      multiLanguage: true,
      darkMode: true,
      breadcrumbs: true,
    },
    user: {
      registration: true,
      socialLogin: true,
      emailVerification: true,
      profileCustomization: true,
      twoFactorAuth: true,
    },
    project: {
      creation: true,
      collaboration: true,
      discussion: true,
      fileUploads: true,
      versionControl: true,
    },
    content: {
      comments: true,
      reactions: true,
      sharing: true,
      bookmarks: true,
      reporting: true,
    },
    notification: {
      email: true,
      push: true,
      inApp: true,
      digest: true,
    },
    analytics: {
      userTracking: true,
      performanceMonitoring: true,
      errorReporting: true,
      heatmaps: true,
    },
    experimental: {
      aiAssistant: false,
      realtimeCollaboration: false,
      voiceCommands: false,
      mobilePWA: true,
    },
  },
};

// Feature flag manager
export class FeatureFlagManager {
  private flags: FeatureFlags;

  constructor(environment: string = process.env.NODE_ENV || 'development') {
    this.flags = FEATURE_FLAG_CONFIGS[environment] || FEATURE_FLAG_CONFIGS.development;
    this.applyEnvironmentOverrides();
  }

  private applyEnvironmentOverrides(): void {
    // Allow environment variables to override specific flags
    const envOverrides = {
      navigation: {
        advancedSearch: this.getBooleanEnvVar('FEATURE_ADVANCED_SEARCH'),
        multiLanguage: this.getBooleanEnvVar('FEATURE_MULTI_LANGUAGE'),
        darkMode: this.getBooleanEnvVar('FEATURE_DARK_MODE'),
        breadcrumbs: this.getBooleanEnvVar('FEATURE_BREADCRUMBS'),
      },
      user: {
        registration: this.getBooleanEnvVar('FEATURE_USER_REGISTRATION'),
        socialLogin: this.getBooleanEnvVar('FEATURE_SOCIAL_LOGIN'),
        emailVerification: this.getBooleanEnvVar('FEATURE_EMAIL_VERIFICATION'),
        profileCustomization: this.getBooleanEnvVar('FEATURE_PROFILE_CUSTOMIZATION'),
        twoFactorAuth: this.getBooleanEnvVar('FEATURE_TWO_FACTOR_AUTH'),
      },
      analytics: {
        userTracking: this.getBooleanEnvVar('FEATURE_USER_TRACKING'),
        performanceMonitoring: this.getBooleanEnvVar('FEATURE_PERFORMANCE_MONITORING'),
        errorReporting: this.getBooleanEnvVar('FEATURE_ERROR_REPORTING'),
        heatmaps: this.getBooleanEnvVar('FEATURE_HEATMAPS'),
      },
    };

    // Apply overrides only for defined environment variables
    this.deepMergeFlags(this.flags, envOverrides);
  }

  private getBooleanEnvVar(key: string): boolean | undefined {
    const value = process.env[key];
    if (value === undefined) return undefined;
    return value.toLowerCase() === 'true';
  }

  private deepMergeFlags(target: any, source: any): void {
    for (const key in source) {
      if (source[key] !== undefined) {
        if (typeof source[key] === 'object' && !Array.isArray(source[key])) {
          if (!target[key]) target[key] = {};
          this.deepMergeFlags(target[key], source[key]);
        } else {
          target[key] = source[key];
        }
      }
    }
  }

  // Check if a feature is enabled
  public isEnabled(category: keyof FeatureFlags, feature: string): boolean {
    const categoryFlags = this.flags[category];
    return (categoryFlags as any)[feature] === true;
  }

  // Get all flags for a category
  public getCategory<T extends keyof FeatureFlags>(category: T): FeatureFlags[T] {
    return this.flags[category];
  }

  // Get all feature flags
  public getAllFlags(): FeatureFlags {
    return { ...this.flags };
  }

  // Update a feature flag (for testing or admin purposes)
  public setFlag(category: keyof FeatureFlags, feature: string, enabled: boolean): void {
    (this.flags[category] as any)[feature] = enabled;
  }

  // Reset flags to environment defaults
  public resetFlags(environment?: string): void {
    const env = environment || process.env.NODE_ENV || 'development';
    this.flags = FEATURE_FLAG_CONFIGS[env] || FEATURE_FLAG_CONFIGS.development;
    this.applyEnvironmentOverrides();
  }

  // Get flags for client-side (excluding sensitive flags)
  public getClientFlags(): Partial<FeatureFlags> {
    return {
      navigation: this.flags.navigation,
      user: {
        registration: this.flags.user.registration,
        socialLogin: this.flags.user.socialLogin,
        profileCustomization: this.flags.user.profileCustomization,
        twoFactorAuth: this.flags.user.twoFactorAuth,
      },
      project: this.flags.project,
      content: this.flags.content,
      notification: {
        inApp: this.flags.notification.inApp,
      },
      experimental: this.flags.experimental,
    };
  }
}

// Singleton instance
let featureFlagInstance: FeatureFlagManager | null = null;

export function getFeatureFlags(): FeatureFlagManager {
  if (!featureFlagInstance) {
    featureFlagInstance = new FeatureFlagManager();
  }
  return featureFlagInstance;
}

// Convenience helpers
export const isFeatureEnabled = (category: keyof FeatureFlags, feature: string): boolean => {
  return getFeatureFlags().isEnabled(category, feature);
};

export const getFeatureCategory = <T extends keyof FeatureFlags>(category: T): FeatureFlags[T] => {
  return getFeatureFlags().getCategory(category);
};