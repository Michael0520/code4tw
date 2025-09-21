export const BUSINESS_RULES = {
  validation: {
    maxNameLength: 100,
    minPasswordLength: 8,
    maxFileSize: 5 * 1024 * 1024, // 5MB
  },
  limits: {
    maxItemsPerPage: 50,
    maxRetryAttempts: 3,
    sessionTimeout: 30 * 60 * 1000, // 30 minutes
  },
  features: {
    enableUserRegistration: true,
    enableFileUpload: true,
    enableComments: true,
  },
} as const;