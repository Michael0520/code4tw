# Code for Taiwan Website

The main website for Code for Taiwan civic technology community, built with modern web technologies and following Domain-Driven Design principles.


## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript 5.9
- **Styling**: Tailwind CSS 4.1
- **UI Components**: Radix UI + shadcn/ui
- **Internationalization**: next-intl (English & Chinese)
- **Testing**: Vitest + React Testing Library
- **Quality**: ESLint + TypeScript strict mode
- **Package Manager**: pnpm

## Architecture

This application follows a modular Domain-Driven Design (DDD) architecture:

```
apps/website/
├── app/                       # Next.js App Router pages
├── components/                # React components
│   ├── ui/                    # Base UI components (shadcn/ui)
│   ├── layout/                # Layout components
│   ├── home/                  # Homepage components
│   └── __tests__/             # Component tests
├── lib/features/              # Business feature modules (DDD)
│   ├── home/                  # Homepage feature
│   ├── projects/              # Projects management
│   ├── news/                  # News & updates
│   ├── events/                # Events management
│   └── about/                 # About us content
├── messages/                  # i18n translation files
├── i18n/                      # Internationalization config
└── vitest.config.ts           # Test configuration
```

## Development

### Prerequisites

- Node.js 18+
- pnpm 8+

### Getting Started

```bash
# Install dependencies (from monorepo root)
pnpm install

# Start development server
pnpm dev --filter=website

# Or run from this directory
cd apps/website
pnpm dev
```

The website will be available at http://localhost:3002

### Available Scripts

```bash
# Development
pnpm dev                    # Start development server with Turbopack
pnpm build                  # Build for production
pnpm start                  # Start production server

# Testing
pnpm test                   # Run all tests
pnpm test:watch             # Run tests in watch mode
pnpm test:coverage          # Generate coverage report

# Code Quality
pnpm lint                   # Run ESLint
pnpm check-types            # TypeScript type checking
```

## Features

### 🌍 Internationalization
- Full support for English and Traditional Chinese
- Dynamic locale switching
- SEO-optimized with proper hreflang tags

### ⚡ Performance
- Next.js 15 with Turbopack for fast development
- App Router for optimized routing
- Server-side rendering and static generation

### 🧪 Testing Strategy
- Component testing with React Testing Library
- Strategic test coverage focusing on business logic
- Vitest for fast test execution
- Mocked dependencies for reliable tests

### 📊 Code Quality
- ESLint with strict TypeScript rules
- Pre-commit hooks for code quality enforcement
- Automated quality checks in CI/CD

## Project Structure

### Feature Modules (DDD)
Each feature follows Domain-Driven Design principles:

```
lib/features/[feature]/
├── domain/                 # Business logic and rules
├── actions/                # Server Actions (use cases)
├── config/                 # Feature configuration
└── utils/                  # Utility functions
```

### Component Organization
- **UI Components**: Reusable base components from shadcn/ui
- **Layout Components**: Header, footer, navigation
- **Feature Components**: Business-specific components
- **Page Components**: Complete page implementations

## Contributing

1. Follow the established DDD architecture
2. Write tests for new features
3. Ensure TypeScript strict mode compliance
4. Use English for all code and comments
5. Follow the commit message conventions

### Code Standards
- **English Only**: All code, comments, and documentation in English
- **Test-Driven Development**: Write tests before implementation
- **Type Safety**: Strict TypeScript with no `any` types
- **Component Design**: Single responsibility principle
- **Performance**: Consider loading and runtime performance

## Deployment

This website is part of the Code4TW monorepo and follows the deployment strategy defined at the repository root level.

## Quality Monitoring

- **Coverage Reports**: Generated with each test run using Vitest
- **Code Quality**: ESLint and TypeScript strict mode validation
- **Security Scanning**: Automated dependency security checks

## Links

- [Code for Taiwan](https://codefortaiwan.org) - Main website
- [GitHub Repository](https://github.com/Michael0520/code4tw) - Source code
- [Architecture Documentation](./ARCHITECTURE.md) - Detailed architecture guide