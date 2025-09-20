// Central configuration export
export { getAppConfig, loadAppConfig, validateConfig, type AppConfig } from './app-config';
export { businessRules, BusinessRuleEngine, BUSINESS_RULES, type BusinessRulesConfig } from './business-rules';
export {
  getFeatureFlags,
  FeatureFlagManager,
  isFeatureEnabled,
  getFeatureCategory,
  type FeatureFlags,
} from './feature-flags';

// Configuration constants - externalized to avoid magic numbers
export const CONFIG_CONSTANTS = {
  // API Constants
  API_TIMEOUT_MS: 30000,
  API_RETRY_ATTEMPTS: 3,
  API_RETRY_DELAY_MS: 1000,

  // UI Constants
  PAGINATION_DEFAULT_SIZE: 20,
  PAGINATION_MAX_SIZE: 100,
  SEARCH_DEBOUNCE_MS: 300,
  TOAST_DURATION_MS: 5000,

  // File Upload Constants
  MAX_FILE_SIZE_MB: 10,
  ALLOWED_IMAGE_TYPES: ['.jpg', '.jpeg', '.png', '.gif', '.webp'] as const,
  ALLOWED_DOCUMENT_TYPES: ['.pdf', '.doc', '.docx', '.txt'] as const,

  // Session Constants
  SESSION_TIMEOUT_MS: 30 * 60 * 1000, // 30 minutes
  REMEMBER_ME_DURATION_DAYS: 30,
  PASSWORD_RESET_TOKEN_EXPIRY_HOURS: 24,

  // Content Constants
  MAX_COMMENT_LENGTH: 1000,
  MAX_POST_TITLE_LENGTH: 200,
  MAX_POST_CONTENT_LENGTH: 10000,
  MIN_SEARCH_QUERY_LENGTH: 2,

  // Rate Limiting Constants
  MAX_LOGIN_ATTEMPTS: 5,
  LOGIN_LOCKOUT_DURATION_MS: 15 * 60 * 1000, // 15 minutes
  API_RATE_LIMIT_PER_MINUTE: 60,

  // Notification Constants
  MAX_NOTIFICATIONS_DISPLAYED: 10,
  NOTIFICATION_BATCH_SIZE: 50,
  EMAIL_BATCH_INTERVAL_MS: 60 * 60 * 1000, // 1 hour

  // Project Constants
  MAX_PROJECT_TITLE_LENGTH: 100,
  MAX_PROJECT_DESCRIPTION_LENGTH: 2000,
  MAX_COLLABORATORS_PER_PROJECT: 20,
  PROJECT_INVITE_EXPIRY_DAYS: 7,

  // Performance Constants
  IMAGE_LAZY_LOADING_THRESHOLD: 100, // pixels
  INFINITE_SCROLL_THRESHOLD: 200, // pixels
  CACHE_TTL_MINUTES: 5,
  STALE_WHILE_REVALIDATE_MINUTES: 60,
} as const;

// URL patterns and routing constants
export const URL_PATTERNS = {
  // API Endpoints
  API_BASE: '/api/v1',
  AUTH_LOGIN: '/api/auth/login',
  AUTH_LOGOUT: '/api/auth/logout',
  AUTH_REGISTER: '/api/auth/register',
  USER_PROFILE: '/api/users/:id',
  PROJECTS_LIST: '/api/projects',
  PROJECT_DETAIL: '/api/projects/:id',

  // Page Routes
  HOME: '/',
  ABOUT: '/about',
  PROJECTS: '/projects',
  PROJECT_DETAIL_PAGE: '/projects/:slug',
  NEWS: '/news',
  EVENTS: '/events',
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  PROFILE: '/profile',
  SETTINGS: '/settings',

  // External URLs
  GITHUB_REPO: 'https://github.com/g0v/code4tw',
  SLACK_INVITE: 'https://join.g0v.tw/',
  FACEBOOK_PAGE: 'https://www.facebook.com/g0v.tw',
} as const;

// Validation patterns
export const VALIDATION_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  USERNAME: /^[a-zA-Z0-9_-]{3,20}$/,
  PHONE: /^\+?[\d\s\-\(\)]{10,}$/,
  URL: /^https?:\/\/.+/,
  GITHUB_USERNAME: /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i,
  SLUG: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
} as const;

// Theme and styling constants
export const THEME_CONFIG = {
  colors: {
    primary: '#3b82f6',
    secondary: '#64748b',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#06b6d4',
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
  },
  transitions: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
  },
} as const;

// Error messages configuration
export const ERROR_MESSAGES = {
  // Authentication
  AUTH_INVALID_CREDENTIALS: 'Invalid email or password',
  AUTH_ACCOUNT_LOCKED: 'Account temporarily locked due to too many failed attempts',
  AUTH_SESSION_EXPIRED: 'Your session has expired. Please log in again',
  AUTH_INSUFFICIENT_PERMISSIONS: 'You do not have permission to perform this action',

  // Validation
  VALIDATION_REQUIRED_FIELD: 'This field is required',
  VALIDATION_INVALID_EMAIL: 'Please enter a valid email address',
  VALIDATION_PASSWORD_TOO_WEAK: 'Password must contain at least 8 characters with uppercase, lowercase, number, and special character',
  VALIDATION_PASSWORDS_DO_NOT_MATCH: 'Passwords do not match',
  VALIDATION_FILE_TOO_LARGE: 'File size exceeds maximum allowed size',
  VALIDATION_INVALID_FILE_TYPE: 'File type is not supported',

  // Network
  NETWORK_CONNECTION_ERROR: 'Unable to connect to server. Please check your internet connection',
  NETWORK_TIMEOUT: 'Request timed out. Please try again',
  NETWORK_SERVER_ERROR: 'Server error occurred. Please try again later',

  // General
  GENERAL_UNKNOWN_ERROR: 'An unexpected error occurred. Please try again',
  GENERAL_NOT_FOUND: 'The requested resource was not found',
  GENERAL_ACCESS_DENIED: 'Access denied',
} as const;

// Success messages configuration
export const SUCCESS_MESSAGES = {
  // Authentication
  AUTH_LOGIN_SUCCESS: 'Successfully logged in',
  AUTH_LOGOUT_SUCCESS: 'Successfully logged out',
  AUTH_REGISTER_SUCCESS: 'Account created successfully',
  AUTH_PASSWORD_RESET_SENT: 'Password reset email sent',
  AUTH_PASSWORD_CHANGED: 'Password changed successfully',

  // User Actions
  USER_PROFILE_UPDATED: 'Profile updated successfully',
  USER_SETTINGS_SAVED: 'Settings saved successfully',

  // Project Actions
  PROJECT_CREATED: 'Project created successfully',
  PROJECT_UPDATED: 'Project updated successfully',
  PROJECT_DELETED: 'Project deleted successfully',
  PROJECT_JOINED: 'Successfully joined project',
  PROJECT_LEFT: 'Successfully left project',

  // Content Actions
  COMMENT_POSTED: 'Comment posted successfully',
  POST_SAVED: 'Post saved successfully',
  FILE_UPLOADED: 'File uploaded successfully',
} as const;

// Application-wide configuration aggregator
export interface ApplicationConfig {
  app: ReturnType<typeof getAppConfig>;
  businessRules: BusinessRuleEngine;
  featureFlags: FeatureFlagManager;
  constants: typeof CONFIG_CONSTANTS;
  urls: typeof URL_PATTERNS;
  validation: typeof VALIDATION_PATTERNS;
  theme: typeof THEME_CONFIG;
  messages: {
    errors: typeof ERROR_MESSAGES;
    success: typeof SUCCESS_MESSAGES;
  };
}

// Create and export application configuration instance
export function createApplicationConfig(): ApplicationConfig {
  return {
    app: getAppConfig(),
    businessRules: businessRules,
    featureFlags: getFeatureFlags(),
    constants: CONFIG_CONSTANTS,
    urls: URL_PATTERNS,
    validation: VALIDATION_PATTERNS,
    theme: THEME_CONFIG,
    messages: {
      errors: ERROR_MESSAGES,
      success: SUCCESS_MESSAGES,
    },
  };
}

// Singleton application config
let applicationConfigInstance: ApplicationConfig | null = null;

export function getApplicationConfig(): ApplicationConfig {
  if (!applicationConfigInstance) {
    applicationConfigInstance = createApplicationConfig();
  }
  return applicationConfigInstance;
}