// Business rules configuration
export interface BusinessRulesConfig {
  readonly user: {
    readonly validation: {
      readonly emailRegex: RegExp;
      readonly minPasswordLength: number;
      readonly maxPasswordLength: number;
      readonly minNameLength: number;
      readonly maxNameLength: number;
      readonly allowedNameCharacters: RegExp;
    };
    readonly permissions: {
      readonly admin: readonly string[];
      readonly user: readonly string[];
      readonly guest: readonly string[];
    };
    readonly limits: {
      readonly maxLoginAttempts: number;
      readonly lockoutDurationMs: number;
      readonly passwordResetTokenExpiryMs: number;
    };
  };
  readonly content: {
    readonly file: {
      readonly maxSizeBytes: number;
      readonly allowedTypes: readonly string[];
      readonly allowedMimeTypes: readonly string[];
    };
    readonly text: {
      readonly maxCommentLength: number;
      readonly maxPostLength: number;
      readonly maxTitleLength: number;
      readonly profanityFiltering: boolean;
    };
    readonly moderation: {
      readonly autoModerationEnabled: boolean;
      readonly flagThreshold: number;
      readonly autoHideThreshold: number;
    };
  };
  readonly project: {
    readonly creation: {
      readonly minTitleLength: number;
      readonly maxTitleLength: number;
      readonly minDescriptionLength: number;
      readonly maxDescriptionLength: number;
      readonly requiredFields: readonly string[];
    };
    readonly collaboration: {
      readonly maxCollaborators: number;
      readonly inviteExpiryDays: number;
      readonly approvalRequired: boolean;
    };
    readonly status: {
      readonly allowedStatuses: readonly string[];
      readonly defaultStatus: string;
      readonly autoArchiveDays: number;
    };
  };
  readonly notification: {
    readonly email: {
      readonly enabled: boolean;
      readonly batchingEnabled: boolean;
      readonly batchIntervalMs: number;
      readonly maxDailyEmails: number;
    };
    readonly inApp: {
      readonly enabled: boolean;
      readonly retentionDays: number;
      readonly maxUnreadCount: number;
    };
  };
}

// Default business rules
export const BUSINESS_RULES: BusinessRulesConfig = {
  user: {
    validation: {
      emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      minPasswordLength: 8,
      maxPasswordLength: 128,
      minNameLength: 2,
      maxNameLength: 100,
      allowedNameCharacters: /^[a-zA-Z\s\u4e00-\u9fff\u3400-\u4dbf\uf900-\ufaff]+$/,
    },
    permissions: {
      admin: [
        'user:read',
        'user:write',
        'user:delete',
        'project:read',
        'project:write',
        'project:delete',
        'content:moderate',
        'system:configure',
      ] as const,
      user: [
        'user:read_own',
        'user:write_own',
        'project:read',
        'project:write_own',
        'content:create',
        'content:edit_own',
      ] as const,
      guest: ['project:read', 'content:read'] as const,
    },
    limits: {
      maxLoginAttempts: 5,
      lockoutDurationMs: 15 * 60 * 1000, // 15 minutes
      passwordResetTokenExpiryMs: 60 * 60 * 1000, // 1 hour
    },
  },
  content: {
    file: {
      maxSizeBytes: 10 * 1024 * 1024, // 10MB
      allowedTypes: ['.jpg', '.jpeg', '.png', '.gif', '.pdf', '.doc', '.docx', '.zip'] as const,
      allowedMimeTypes: [
        'image/jpeg',
        'image/png',
        'image/gif',
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/zip',
      ] as const,
    },
    text: {
      maxCommentLength: 1000,
      maxPostLength: 10000,
      maxTitleLength: 200,
      profanityFiltering: true,
    },
    moderation: {
      autoModerationEnabled: true,
      flagThreshold: 3,
      autoHideThreshold: 5,
    },
  },
  project: {
    creation: {
      minTitleLength: 5,
      maxTitleLength: 100,
      minDescriptionLength: 20,
      maxDescriptionLength: 2000,
      requiredFields: ['title', 'description', 'category', 'techStack'] as const,
    },
    collaboration: {
      maxCollaborators: 20,
      inviteExpiryDays: 7,
      approvalRequired: false,
    },
    status: {
      allowedStatuses: ['draft', 'active', 'paused', 'completed', 'archived'] as const,
      defaultStatus: 'draft',
      autoArchiveDays: 365,
    },
  },
  notification: {
    email: {
      enabled: true,
      batchingEnabled: true,
      batchIntervalMs: 60 * 60 * 1000, // 1 hour
      maxDailyEmails: 10,
    },
    inApp: {
      enabled: true,
      retentionDays: 30,
      maxUnreadCount: 100,
    },
  },
};

// Business rule utilities
export class BusinessRuleEngine {
  private rules: BusinessRulesConfig;

  constructor(rules: BusinessRulesConfig = BUSINESS_RULES) {
    this.rules = rules;
  }

  // User validation helpers
  public validateEmail(email: string): boolean {
    return this.rules.user.validation.emailRegex.test(email);
  }

  public validatePassword(password: string): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];
    const { minPasswordLength, maxPasswordLength } = this.rules.user.validation;

    if (password.length < minPasswordLength) {
      errors.push(`Password must be at least ${minPasswordLength} characters long`);
    }

    if (password.length > maxPasswordLength) {
      errors.push(`Password must be no more than ${maxPasswordLength} characters long`);
    }

    if (!/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    }

    if (!/[a-z]/.test(password)) {
      errors.push('Password must contain at least one lowercase letter');
    }

    if (!/[0-9]/.test(password)) {
      errors.push('Password must contain at least one number');
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  public validateUserName(name: string): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];
    const { minNameLength, maxNameLength, allowedNameCharacters } = this.rules.user.validation;

    if (name.length < minNameLength) {
      errors.push(`Name must be at least ${minNameLength} characters long`);
    }

    if (name.length > maxNameLength) {
      errors.push(`Name must be no more than ${maxNameLength} characters long`);
    }

    if (!allowedNameCharacters.test(name)) {
      errors.push('Name contains invalid characters');
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  // Permission helpers
  public hasPermission(userRole: keyof BusinessRulesConfig['user']['permissions'], permission: string): boolean {
    return this.rules.user.permissions[userRole].includes(permission);
  }

  // File validation helpers
  public validateFileSize(sizeBytes: number): boolean {
    return sizeBytes <= this.rules.content.file.maxSizeBytes;
  }

  public validateFileType(extension: string): boolean {
    return this.rules.content.file.allowedTypes.includes(extension.toLowerCase());
  }

  public validateMimeType(mimeType: string): boolean {
    return this.rules.content.file.allowedMimeTypes.includes(mimeType);
  }

  // Project validation helpers
  public validateProjectTitle(title: string): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];
    const { minTitleLength, maxTitleLength } = this.rules.project.creation;

    if (title.length < minTitleLength) {
      errors.push(`Title must be at least ${minTitleLength} characters long`);
    }

    if (title.length > maxTitleLength) {
      errors.push(`Title must be no more than ${maxTitleLength} characters long`);
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  // Get specific rule values
  public getRule<T extends keyof BusinessRulesConfig>(category: T): BusinessRulesConfig[T] {
    return this.rules[category];
  }

  public getRuleValue<T extends keyof BusinessRulesConfig, K extends keyof BusinessRulesConfig[T]>(
    category: T,
    key: K
  ): BusinessRulesConfig[T][K] {
    return this.rules[category][key];
  }
}

// Export singleton instance
export const businessRules = new BusinessRuleEngine();