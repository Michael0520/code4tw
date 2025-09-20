// Environment configuration
export interface AppConfig {
  readonly app: {
    readonly name: string;
    readonly version: string;
    readonly environment: 'development' | 'staging' | 'production';
    readonly baseUrl: string;
  };
  readonly database: {
    readonly url: string;
    readonly maxConnections: number;
    readonly connectionTimeout: number;
  };
  readonly features: {
    readonly advancedSearch: boolean;
    readonly userProfiles: boolean;
    readonly notifications: boolean;
    readonly analytics: boolean;
  };
  readonly api: {
    readonly timeout: number;
    readonly retryAttempts: number;
    readonly retryDelay: number;
  };
  readonly security: {
    readonly jwtSecret: string;
    readonly sessionTimeout: number;
    readonly maxLoginAttempts: number;
  };
}

// Default configuration
const DEFAULT_CONFIG: AppConfig = {
  app: {
    name: 'Code4TW Website',
    version: '1.0.0',
    environment: 'development',
    baseUrl: 'http://localhost:3002',
  },
  database: {
    url: process.env.DATABASE_URL || 'sqlite://./dev.db',
    maxConnections: Number(process.env.DB_MAX_CONNECTIONS) || 10,
    connectionTimeout: Number(process.env.DB_CONNECTION_TIMEOUT) || 5000,
  },
  features: {
    advancedSearch: process.env.FEATURE_ADVANCED_SEARCH === 'true',
    userProfiles: process.env.FEATURE_USER_PROFILES === 'true',
    notifications: process.env.FEATURE_NOTIFICATIONS === 'true',
    analytics: process.env.FEATURE_ANALYTICS === 'true',
  },
  api: {
    timeout: Number(process.env.API_TIMEOUT) || 30000,
    retryAttempts: Number(process.env.API_RETRY_ATTEMPTS) || 3,
    retryDelay: Number(process.env.API_RETRY_DELAY) || 1000,
  },
  security: {
    jwtSecret: process.env.JWT_SECRET || 'dev-secret-key',
    sessionTimeout: Number(process.env.SESSION_TIMEOUT) || 1800000, // 30 minutes
    maxLoginAttempts: Number(process.env.MAX_LOGIN_ATTEMPTS) || 5,
  },
};

// Environment-specific overrides
const ENVIRONMENT_CONFIGS: Record<string, Partial<AppConfig>> = {
  production: {
    app: {
      environment: 'production' as const,
      baseUrl: 'https://codefortaiwan.org',
    },
    features: {
      analytics: true,
      notifications: true,
    },
  },
  staging: {
    app: {
      environment: 'staging' as const,
      baseUrl: 'https://staging.codefortaiwan.org',
    },
    features: {
      analytics: false,
      notifications: false,
    },
  },
};

// Configuration loader
export function loadAppConfig(): AppConfig {
  const environment = process.env.NODE_ENV || 'development';
  const envConfig = ENVIRONMENT_CONFIGS[environment] || {};

  // Deep merge configurations
  return {
    app: { ...DEFAULT_CONFIG.app, ...envConfig.app },
    database: { ...DEFAULT_CONFIG.database, ...envConfig.database },
    features: { ...DEFAULT_CONFIG.features, ...envConfig.features },
    api: { ...DEFAULT_CONFIG.api, ...envConfig.api },
    security: { ...DEFAULT_CONFIG.security, ...envConfig.security },
  };
}

// Singleton instance
let configInstance: AppConfig | null = null;

export function getAppConfig(): AppConfig {
  if (!configInstance) {
    configInstance = loadAppConfig();
  }
  return configInstance;
}

// Configuration validation
export function validateConfig(config: AppConfig): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Validate required fields
  if (!config.app.name) {
    errors.push('App name is required');
  }

  if (!config.security.jwtSecret || config.security.jwtSecret === 'dev-secret-key') {
    if (config.app.environment === 'production') {
      errors.push('JWT secret must be set in production');
    }
  }

  if (config.database.maxConnections <= 0) {
    errors.push('Database max connections must be positive');
  }

  if (config.api.timeout <= 0) {
    errors.push('API timeout must be positive');
  }

  if (config.security.sessionTimeout <= 0) {
    errors.push('Session timeout must be positive');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}