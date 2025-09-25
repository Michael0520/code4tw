# Website Architecture Documentation

## Overview

This document details the architecture of the Code for Taiwan website, which has been optimized for SEO with Static Site Generation (SSG) and internationalization (i18n) using Next.js 15 App Router and next-intl.

## Core Architecture Principles

### 1. Static Site Generation (SSG)
- **Rendering Mode**: SSG with client-side hydration
- **Build-time Generation**: All pages pre-rendered at build time
- **SEO Optimization**: Full HTML content available for search engines
- **Performance**: Lightning-fast page loads with pre-generated static files

### 2. Internationalization (i18n)
- **Library**: next-intl (recommended for Next.js 15 App Router)
- **Supported Locales**: English (en), Traditional Chinese (zh)
- **Default Locale**: English (en)
- **Routing Strategy**: Always show locale prefix in URL

### 3. App Router Structure
- **Framework**: Next.js 15.5.3 with App Router
- **Bundler**: Turbopack for development
- **Language**: TypeScript 5.9.2
- **UI Library**: shadcn/ui with Radix UI primitives

## Current Page Structure

### Simplified Route Architecture
After recent refactoring, the application now focuses on core pages only:

```
/[locale]/               # Homepage (zh/en)
└── /about              # About organization page
```

### Supported Routes
| Route | Chinese (zh) | English (en) | Description |
|-------|-------------|--------------|-------------|
| `/` | `/zh` | `/en` | Homepage with hero and organization showcase |
| `/about` | `/zh/about` | `/en/about` | Organization mission, principles, and values |

**Note**: Projects, News, and Events pages were removed to simplify the website structure and focus on core organizational content.

## File Structure

```
apps/website/
├── app/
│   ├── [locale]/          # Locale-based routing
│   │   ├── layout.tsx     # Root layout with i18n provider
│   │   ├── page.tsx       # Home page with SSG
│   │   └── about/
│   │       └── page.tsx   # About page with SSG
│   ├── globals.css        # Global styles
│   └── favicon.ico
├── i18n/
│   ├── routing.ts         # Core routing configuration
│   ├── request.ts         # Server-side i18n config
│   └── navigation.ts      # Client-side navigation utilities
├── messages/
│   ├── en.json           # English translations
│   └── zh.json           # Chinese translations
├── components/
│   ├── layout/
│   │   └── header.tsx    # Internationalized header
│   ├── home/
│   │   └── home-page.tsx # Home page content
│   ├── about/
│   │   ├── about-page.tsx
│   │   ├── about-hero.tsx
│   │   ├── core-principles.tsx
│   │   ├── core-values.tsx
│   │   └── mission-vision.tsx
│   ├── ui/               # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── sheet.tsx
│   │   └── language-selector.tsx
│   ├── search/
│   │   └── global-search.tsx
│   └── shared/
│       └── feature-grid.tsx
├── lib/
│   ├── features/
│   │   ├── home/
│   │   │   ├── config/
│   │   │   │   └── index.ts
│   │   │   └── actions/
│   │   │       └── index.ts
│   │   └── about/
│   │       ├── config/
│   │       │   └── index.ts
│   │       └── actions/
│   │           └── index.ts
│   ├── i18n-resources.ts
│   └── i18n-server.ts
├── middleware.ts         # Automatic language detection
├── next.config.mjs       # Next.js configuration with i18n
└── package.json
```

## Internationalization Implementation

### Core Configuration Files

#### 1. Routing Configuration (`i18n/routing.ts`)
```typescript
import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'zh'],
  defaultLocale: 'en',
  localePrefix: 'always'
});
```

**Key Features:**
- Defines supported locales
- Sets default locale for fallback
- Enforces locale prefix in all URLs

#### 2. Server Configuration (`i18n/request.ts`)
```typescript
import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';
import {routing} from './routing';

export default getRequestConfig(async ({requestLocale}) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});
```

**Key Features:**
- Handles server-side locale resolution
- Loads appropriate message files
- Provides fallback mechanism

#### 3. Navigation Utilities (`i18n/navigation.ts`)
```typescript
import {createNavigation} from 'next-intl/navigation';
import {routing} from './routing';

export const {Link, redirect, usePathname, useRouter} =
  createNavigation(routing);
```

**Key Features:**
- Type-safe navigation components
- Automatic locale-aware routing
- Compatible with App Router

## 🏗️ Domain-Driven Design Implementation (2025 Enhanced)

### Modular Domain Structure (2025 Enhanced)

Each feature follows a consistent modular DDD pattern with enhanced organization:

```typescript
lib/features/[feature]/
├── domain/
│   ├── index.ts      # Entities, Value Objects, Domain Services
│   └── index.test.ts # Domain logic tests
├── config/
│   └── index.ts      # Configuration and static data
├── actions/
│   ├── index.ts      # Server Actions (Use Cases/Application Services)
│   └── index.test.ts # Actions tests
└── utils/
    ├── index.ts      # Feature-specific utilities
    └── index.test.ts # Utility tests
```

### Benefits of Modular Structure

1. **Enhanced Test Visibility**: Each module's tests are immediately adjacent to the source code
2. **Clear Module Boundaries**: Each folder represents a distinct module with its own responsibility
3. **Better Co-location**: Related files are tightly grouped together
4. **Scalability**: Easy to add new files within each module (types, constants, etc.)
5. **Maintenance**: Clear separation makes refactoring and updates safer

### Key DDD Concepts Implemented

#### **Entities** (Business Objects)
- `Project`: Core project entity with business rules
- `Event`: Event entity with complex date/capacity logic
- `News`: News article entity with publication logic

#### **Value Objects** (Immutable Concepts)
- `ProjectId`, `ProjectCategory`, `ProjectStatus`
- `EventId`, `EventType`, `EventDate`, `EventCapacity`
- `GitHubMetrics` for project statistics

#### **Domain Services** (Business Logic)
- `ProjectService`: Project filtering, searching, sorting
- `EventService`: Event management and statistics
- Complex business rules encapsulated in domain layer

#### **Server Actions** (Use Cases)
- `getProjects()`: Retrieve and filter projects
- `getFeaturedProjects()`: Get highlighted projects
- `searchProjects()`: Full-text project search
- `getEvents()`: Event management operations

### Domain Benefits (2025 Enhanced)

1. **Business Logic Isolation**: Pure domain logic separate from infrastructure
2. **Enhanced Test Visibility**: Tests are co-located with source code for immediate feedback
3. **Type Safety**: Strong typing with TypeScript value objects
4. **Module Boundaries**: Clear separation between domain, actions, config, and utils
5. **Validation**: Business rules enforced at entity level
6. **Maintainability**: Modular structure makes code easier to navigate and maintain
7. **Scalability**: Each module can grow independently without affecting others
8. **Team Collaboration**: Different team members can work on separate modules safely

## 🛠️ Tech Stack

### Core Framework
- **Next.js 15.5.0** - React framework with App Router
- **React 19.1.0** - UI library with latest features
- **TypeScript 5.9.2** - Type-safe JavaScript

### Styling & UI
- **Tailwind CSS 4.1.9** - Utility-first CSS framework
- **shadcn/ui** - High-quality React component library
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icon library
- **next-themes** - Dark/light theme management

### Internationalization
- **next-intl 4.3.9** - Next.js internationalization
- **Supported Locales**: Chinese (`zh`), English (`en`)

### Development Tools
- **ESLint 9.34.0** - Code linting and quality
- **PostCSS 8.5** - CSS processing
- **Autoprefixer** - CSS vendor prefixes
- **Turbopack** - Fast development builds

### Component Libraries
- **@radix-ui/react-** - Full suite of accessible components:
  - Dialog, Dropdown Menu, Select, Tabs
  - Navigation Menu, Popover, Toast
  - Switch, Toggle, Tooltip, and more

### Utilities
- **clsx** - Conditional CSS classes
- **tailwind-merge** - Tailwind class merging
- **class-variance-authority** - Component variants
- **date-fns** - Date manipulation
- **zod** - Schema validation

### Analytics & Performance
- **@vercel/analytics** - Website analytics
- **Geist Font** - Modern typography

## 🎨 Design System

### Component Architecture
- **Atomic Design**: Components organized by complexity (atoms → molecules → organisms)
- **Variant-Based**: Using `class-variance-authority` for component variants
- **Accessible**: All components follow WCAG guidelines via Radix UI
- **Responsive**: Mobile-first design with Tailwind breakpoints

### Theme System
- **CSS Variables**: Custom properties for consistent theming
- **Dark/Light Mode**: Automatic system detection with manual override
- **Color Palette**: Semantic color tokens (primary, secondary, accent, muted)
- **Typography**: Consistent font scaling and spacing

### State Management
- **React Context**: Theme and language providers
- **Server State**: Next.js server components for data fetching
- **Client State**: React hooks for interactive components

## 🔄 Data Flow

### Static Content
1. **Content Definition**: Hard-coded content in components with i18n keys
2. **Translation**: Messages stored in JSON files per locale
3. **Rendering**: Server-side rendering with translated content

### Dynamic Features
1. **Search**: Client-side filtering of static content
2. **Filters**: Local state management for content filtering
3. **Theme**: Context-based theme switching
4. **Language**: URL-based locale switching

## 🚀 Development Workflow

### Available Scripts
```bash
# Development
pnpm dev           # Start development server (port 3002)

# Building
pnpm build         # Production build
pnpm start         # Start production server

# Quality Assurance
pnpm lint          # ESLint code checking
pnpm check-types   # TypeScript type checking

# Testing
pnpm test          # Run test suite
pnpm test:watch    # Watch mode testing
pnpm test:coverage # Test coverage report
```

### Project Structure Benefits
1. **Separation of Concerns**: Clear layer boundaries
2. **Scalability**: Easy to add new pages and features
3. **Maintainability**: Organized component hierarchy
4. **Internationalization**: Built-in i18n support
5. **Performance**: Server-side rendering and static optimization
6. **Accessibility**: Radix UI ensures WCAG compliance
7. **Developer Experience**: TypeScript, ESLint, and modern tooling

## 📱 Responsive Design

### Breakpoints (Tailwind)
- **sm**: 640px and up (tablet)
- **md**: 768px and up (desktop)
- **lg**: 1024px and up (large desktop)
- **xl**: 1280px and up (extra large)

### Mobile-First Approach
- Base styles target mobile devices
- Progressive enhancement for larger screens
- Touch-friendly interactive elements
- Optimized image loading and sizing

## 🔐 Performance & SEO

### Optimization Features
- **Server-Side Rendering**: Fast initial page loads
- **Static Generation**: Pre-built pages where possible
- **Image Optimization**: Next.js automatic image handling
- **Code Splitting**: Automatic component chunking
- **Tree Shaking**: Dead code elimination

### SEO Implementation
- **Meta Tags**: Dynamic metadata per page
- **Structured Data**: JSON-LD for rich snippets
- **Sitemap**: Automatic sitemap generation
- **Robots.txt**: Search engine crawling rules
- **Internationalization**: Proper hreflang tags

## 🌐 Deployment

### Configuration
- **Target**: Static export capable
- **Environment**: Vercel optimized
- **Assets**: Optimized image delivery
- **Analytics**: Built-in performance monitoring

This architecture provides a solid foundation for a scalable, maintainable, and internationalized civic technology website that serves the Code for Taiwan community effectively.