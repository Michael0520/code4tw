# CLAUDE.md - Code4TW Development Standards

This file provides comprehensive guidance to Claude Code when working with this repository.

## Core Development Principles

### 1. English-Only Codebase

**ALL code must be written in English without exception.**

- **Variables, functions, classes**: English names only
- **Comments and documentation**: English only
- **Commit messages**: English only
- **Code strings**: Use i18n keys, never hardcoded Chinese
- **Exception**: Translation data files (i18n) may contain Chinese content

```typescript
// ❌ WRONG - Chinese in code
const 使用者名稱 = "john"; // 取得使用者名稱
function 計算總價() { ... }

// ✅ CORRECT - English only
const username = "john"; // Get user name
function calculateTotalPrice() { ... }
```

### 2. Domain-Driven Design (DDD) Architecture

**Strict layered architecture with clear separation of concerns.**

```
src/
├── domain/           # Pure business logic (no dependencies)
│   ├── entities/     # Domain entities
│   ├── value-objects/ # Value objects
│   ├── repositories/ # Repository interfaces
│   └── services/     # Domain services
├── application/      # Use case orchestration
│   ├── use-cases/    # Application use cases
│   ├── services/     # Application services
│   └── dto/          # Data transfer objects
├── infrastructure/   # External adapters
│   ├── repositories/ # Repository implementations
│   ├── api/          # External API clients
│   └── persistence/  # Database adapters
└── presentation/     # UI components
    ├── components/   # React components
    ├── pages/        # Next.js pages
    └── hooks/        # Custom hooks
```

**Dependency Rule**: Dependencies point inward (UI → App → Domain)

### 3. Test-Driven Development (TDD)

**TDD is mandatory - no exceptions.**

**Workflow**: Red → Green → Refactor

1. **Red**: Write failing test first
2. **Green**: Write minimal code to pass
3. **Refactor**: Improve code while keeping tests green

**Testing Standards**:

- **AAA Pattern**: Always use Arrange, Act, Assert with clear comments
- **Layer Coverage Goals**:
  - Domain Layer: 100% (business critical)
  - Application Layer: 80% (user flows)
  - Presentation Layer: 60% (logic only)
  - Infrastructure: 40% (integration points)

```typescript
// ✅ CORRECT - AAA Pattern
describe("UserService", () => {
  it("should create user with valid email", () => {
    // Arrange
    const userService = new UserService();
    const validEmail = "test@example.com";

    // Act
    const result = userService.createUser(validEmail);

    // Assert
    expect(result.isSuccess).toBe(true);
    expect(result.user.email).toBe(validEmail);
  });
});
```

### 4. Configuration-Driven Development

**Business logic must be externalized into configuration.**

- **No magic numbers**: All constants named and configurable
- **Business rules**: Defined in config objects
- **Feature flags**: Environment-based configuration
- **Centralized settings**: Single source of truth

```typescript
// ❌ WRONG - Magic numbers and hardcoded logic
setTimeout(callback, 3000);
if (user.loginAttempts > 5) { ... }

// ✅ CORRECT - Configuration-driven
const CONFIG = {
  API_TIMEOUT_MS: 3000,
  MAX_LOGIN_ATTEMPTS: 5,
  FEATURE_FLAGS: {
    ADVANCED_SEARCH: true
  }
};

setTimeout(callback, CONFIG.API_TIMEOUT_MS);
if (user.loginAttempts > CONFIG.MAX_LOGIN_ATTEMPTS) { ... }
```

## Project Architecture

### Turborepo Monorepo Structure

- **Package Manager**: PNPM with workspace protocol (`workspace:*`)
- **Monorepo Tool**: Turborepo 2.5.6
- **Runtime**: Node.js >=18
- **Framework**: Next.js 15.5.3 with Turbopack
- **Language**: TypeScript 5.9.2
- **Testing**: Vitest + Testing Library

### Applications

- `apps/web` - Main web application (port 3000)
- `apps/docs` - Documentation site (port 3001)
- `apps/website` - Public website (port 3002)

### Shared Packages

- `@repo/ui` - Shared UI components
- `@repo/next-config` - Shared Next.js configuration
- `@repo/eslint-config` - Shared ESLint rules
- `@repo/typescript-config` - Shared TypeScript settings

## Development Commands

### Testing (Vitest)

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage

# Run specific app tests
pnpm test --filter=web
```

### Building and Development

```bash
# Start all apps in development
pnpm dev

# Start specific app
pnpm dev --filter=website

# Build all apps
pnpm build

# Type checking
pnpm check-types

# Linting
pnpm lint

# Code formatting
pnpm format
```

## Code Quality Standards

### Naming Conventions

- **Files**: kebab-case (`user-service.ts`)
- **Directories**: kebab-case (`value-objects/`)
- **Variables/Functions**: camelCase (`getUserById`)
- **Classes**: PascalCase (`UserService`)
- **Constants**: SCREAMING_SNAKE_CASE (`MAX_RETRIES`)
- **Types/Interfaces**: PascalCase (`UserEntity`)

### Function Design

- **Pure functions preferred**: No side effects when possible
- **Single responsibility**: One function, one purpose
- **Meaningful names**: Function name describes exact behavior
- **Max 3 parameters**: Use objects for complex parameters

```typescript
// ❌ WRONG - Too many parameters
function createUser(name, email, age, country, preferences, settings) { ... }

// ✅ CORRECT - Object parameter
interface CreateUserParams {
  name: string;
  email: string;
  age: number;
  country: string;
  preferences: UserPreferences;
  settings: UserSettings;
}

function createUser(params: CreateUserParams) { ... }
```

### Error Handling

- **Result pattern**: Return success/failure objects, avoid throwing
- **Type-safe errors**: Use discriminated unions
- **Meaningful messages**: Include context and next steps

```typescript
// ✅ CORRECT - Result pattern
type CreateUserResult =
  | { success: true; user: User }
  | { success: false; error: "INVALID_EMAIL" | "USER_EXISTS" };

function createUser(email: string): CreateUserResult {
  if (!isValidEmail(email)) {
    return { success: false, error: "INVALID_EMAIL" };
  }
  // ... implementation
}
```

## Testing Guidelines

### Test Structure

```
src/
├── domain/
│   ├── entities/
│   │   ├── user.ts
│   │   └── __tests__/
│   │       └── user.test.ts
│   └── services/
│       ├── user-service.ts
│       └── __tests__/
│           └── user-service.test.ts
```

### Test Naming

- **Describe blocks**: Feature or class name
- **Test cases**: "should [expected behavior] when [condition]"
- **Variables**: Clear, descriptive names

```typescript
describe("UserService", () => {
  describe("createUser", () => {
    it("should create user when valid email is provided", () => {
      // Test implementation
    });

    it("should return error when email is invalid", () => {
      // Test implementation
    });
  });
});
```

### Test Data Management

- **Factories**: Use factory functions for test data
- **Builders**: Use builder pattern for complex objects
- **Constants**: Centralized test constants

```typescript
// Test factories
const createValidUser = (overrides = {}) => ({
  id: "123",
  email: "test@example.com",
  name: "Test User",
  ...overrides,
});

// Test builders
class UserBuilder {
  private user: Partial<User> = {};

  withEmail(email: string) {
    this.user.email = email;
    return this;
  }

  build(): User {
    return { ...defaultUser, ...this.user };
  }
}
```

## Configuration Management

### Environment Configuration

```typescript
// config/index.ts
export const config = {
  database: {
    url: process.env.DATABASE_URL || "localhost:5432",
    maxConnections: Number(process.env.DB_MAX_CONNECTIONS) || 10,
  },
  features: {
    advancedSearch: process.env.FEATURE_ADVANCED_SEARCH === "true",
    userProfiles: process.env.FEATURE_USER_PROFILES === "true",
  },
  business: {
    maxLoginAttempts: 5,
    sessionTimeoutMs: 30 * 60 * 1000, // 30 minutes
    supportedLanguages: ["en", "zh"] as const,
  },
};
```

### Business Rules Configuration

```typescript
// config/business-rules.ts
export const businessRules = {
  user: {
    validation: {
      emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      minPasswordLength: 8,
      maxNameLength: 100,
    },
    permissions: {
      admin: ["read", "write", "delete"],
      user: ["read"],
      guest: [],
    },
  },
  content: {
    maxFileSize: 10 * 1024 * 1024, // 10MB
    allowedFileTypes: [".jpg", ".png", ".pdf"],
    maxCommentsPerPost: 50,
  },
};
```

## Claude Code Behavior Guidelines

### When Working on This Project

1. **Always follow TDD**: Write tests first, implementation second
2. **Respect DDD boundaries**: Don't mix layer responsibilities
3. **Use English only**: Never write Chinese in code
4. **Configuration-first**: Externalize business logic
5. **Ask before committing**: Never auto-commit changes
6. **Validate architecture**: Check layer dependencies before implementing

### Code Review Checklist

- [ ] All code written in English
- [ ] Tests written before implementation
- [ ] DDD layer boundaries respected
- [ ] Magic numbers externalized to config
- [ ] Functions follow single responsibility
- [ ] Error handling uses Result pattern
- [ ] Test coverage meets requirements

### Common Anti-Patterns to Avoid

- Chinese text in variable names or comments
- Hardcoded business logic in UI components
- Direct database access from presentation layer
- Magic numbers or strings
- Functions with side effects
- Throwing exceptions for business logic errors

## AI Assistant Instructions

When working with this codebase:

1. **Enforce standards strictly**: Correct violations respectfully but firmly
2. **Suggest better alternatives**: Provide examples of correct patterns
3. **Maintain consistency**: Follow established patterns and conventions
4. **Question bad practices**: Challenge decisions that violate principles
5. **Focus on quality**: Prioritize correctness over speed

Remember: These standards exist to ensure maintainable, scalable, and high-quality code. They are non-negotiable principles that define our development culture.

## Development Workflow Integration

### Pre-commit Hooks

Pre-commit hooks automatically enforce standards before code is committed:

```bash
# Install pre-commit hooks
pip install pre-commit
pre-commit install
pre-commit install --hook-type commit-msg

# Run hooks manually
pre-commit run --all-files
```

### GitHub Actions

Automated quality gates run on every push and pull request:

- **Code Standards**: English-only validation, TypeScript checking, linting
- **Architecture**: DDD layer boundary validation, test structure compliance
- **Configuration**: Config externalization validation, feature flag checks
- **Security**: Secret scanning, environment variable validation
- **Documentation**: Required docs and JSDoc coverage checks
- **SonarCloud Analysis**: Continuous code quality monitoring, security hotspot detection

### Development Commands

```bash
# Quality assurance commands
pnpm test:coverage    # Run tests with coverage validation
pnpm lint             # ESLint with English-only rules
pnpm check-types      # TypeScript type checking
pnpm build            # Build with quality validations

# TDD workflow commands
pnpm test:watch       # Test-driven development mode
pnpm test --filter=domain  # Test specific DDD layers

# Configuration validation
pnpm validate:config  # Check configuration externalization
pnpm check:features   # Validate feature flag usage
```

### IDE Integration

Recommended VS Code extensions for enforcing standards:

- **ESLint**: Automatic English-only rule enforcement
- **Prettier**: Code formatting
- **TypeScript**: Type checking and intellisense
- **Test Explorer**: TDD workflow support
- **GitLens**: Commit message validation
- **Todo Tree**: Track implementation tasks

### Code Review Process

1. **Automated Checks**: All GitHub Actions must pass green
2. **Manual Review**: Use CODE_REVIEW_CHECKLIST.md systematically
3. **Approval Criteria**: All four core principles must be validated
4. **Rejection Criteria**: Any violation of critical requirements results in automatic rejection

### Quality Gates

The following quality gates must pass for code to be merged:

#### ✅ Critical Gates (Must Pass)

- **English-Only**: No Chinese characters in code/comments
- **TDD Compliance**: Tests written before implementation
- **DDD Architecture**: Proper layer separation maintained
- **Config-Driven**: No hardcoded business logic
- **SonarCloud Quality Gate**: Must pass with current settings

#### ⚠️ Warning Gates (Should Pass)

- **Test Coverage**: Domain (100%), Application (80%), UI (60%)
- **Code Quality**: No magic numbers, proper error handling
- **Documentation**: JSDoc coverage for public APIs
- **Performance**: No obvious performance anti-patterns
- **SonarCloud Metrics**: Code duplication <3%, Security hotspots reviewed

#### 📊 SonarCloud Integration

- **Dashboard**: https://sonarcloud.io/dashboard?id=Michael0520_code4tw
- **Analysis**: Automatic on every push and PR
- **Reports**: Integrated with GitHub checks
- **Configuration**: See `SONARCLOUD_SETUP.md` for detailed setup

This comprehensive system ensures that all Code4TW development follows the established standards automatically and consistently, creating a sustainable development culture focused on quality, maintainability, and team collaboration.
