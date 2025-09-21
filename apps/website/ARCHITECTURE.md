# Code for Taiwan Website - Architecture Documentation

## 🏗️ Project Overview

The Code for Taiwan website is a modern, multilingual civic technology platform built to showcase g0v's projects, news, events, and mission. This is a Next.js 15 application following Domain-Driven Design (DDD) principles with a focus on internationalization and accessibility.

## 📍 Routes & Pages

### Page Structure
The application uses Next.js 15 App Router with internationalized routing:

```
/[locale]/               # Homepage (zh/en)
├── /projects            # Projects showcase page
├── /news               # News and updates page
├── /events             # Events and activities page
└── /about              # About organization page
```

### Supported Routes
| Route | Chinese (zh) | English (en) | Description |
|-------|-------------|--------------|-------------|
| `/` | `/zh` | `/en` | Homepage with hero, features, projects showcase |
| `/projects` | `/zh/projects` | `/en/projects` | Open source projects gallery |
| `/news` | `/zh/news` | `/en/news` | Latest news and articles |
| `/events` | `/zh/events` | `/en/events` | Upcoming and past events |
| `/about` | `/zh/about` | `/en/about` | Organization mission, team, values |

### Internationalization (i18n)
- **Supported Locales**: `zh` (Traditional Chinese), `en` (English)
- **Default Locale**: Chinese (`zh`)
- **Framework**: `next-intl` for message handling
- **Message Files**: `./messages/zh.json`, `./messages/en.json`

## 🏛️ Architecture

### Domain-Driven Design (DDD) Structure

```
apps/website/
├── app/                          # Next.js App Router
│   └── [locale]/                 # Internationalized routes
│       ├── layout.tsx            # Root layout with providers
│       ├── page.tsx              # Homepage
│       ├── projects/
│       │   ├── page.tsx          # Projects page
│       │   └── loading.tsx       # Loading UI
│       ├── news/
│       │   ├── page.tsx          # News page
│       │   └── loading.tsx       # Loading UI
│       ├── events/
│       │   ├── page.tsx          # Events page
│       │   └── loading.tsx       # Loading UI
│       └── about/
│           └── page.tsx          # About page
│
├── components/                   # React Components (Presentation Layer)
│   ├── ui/                      # Reusable UI components (shadcn/ui)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── select.tsx
│   │   ├── badge.tsx
│   │   ├── skeleton.tsx
│   │   ├── sheet.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── language-selector.tsx
│   │   └── loading-spinner.tsx
│   │
│   ├── layout/                  # Layout components
│   │   ├── header.tsx           # Main navigation header
│   │   └── footer.tsx           # Site footer
│   │
│   ├── home/                    # Homepage components
│   │   ├── home-page.tsx        # Main homepage container
│   │   ├── hero-section.tsx     # Hero banner
│   │   ├── features-grid.tsx    # Features showcase
│   │   ├── about-section.tsx    # About preview
│   │   ├── projects-section.tsx # Projects preview
│   │   └── community-section.tsx # Community CTA
│   │
│   ├── projects/                # Projects page components
│   │   ├── projects-page.tsx    # Main projects container
│   │   ├── projects-list.tsx    # Projects grid
│   │   ├── project-card.tsx     # Individual project card
│   │   ├── projects-filters.tsx # Filtering controls
│   │   ├── projects-search.tsx  # Search functionality
│   │   └── projects-stats.tsx   # Statistics display
│   │
│   ├── news/                    # News page components
│   │   ├── news-page.tsx        # Main news container
│   │   ├── news-list.tsx        # News articles grid
│   │   ├── news-filters.tsx     # Category filters
│   │   ├── news-search.tsx      # News search
│   │   ├── news-stats.tsx       # Article statistics
│   │   └── news-client-page.tsx # Client-side components
│   │
│   ├── events/                  # Events page components
│   │   ├── events-page.tsx      # Main events container
│   │   ├── events-list.tsx      # Events grid
│   │   ├── events-filters.tsx   # Event filters
│   │   └── events-stats.tsx     # Event statistics
│   │
│   ├── about/                   # About page components
│   │   ├── about-page.tsx       # Main about container
│   │   ├── about-hero.tsx       # About hero section
│   │   ├── mission-vision.tsx   # Mission statement
│   │   ├── core-principles.tsx  # Core principles
│   │   ├── core-values.tsx      # Organization values
│   │   ├── team-section.tsx     # Team members
│   │   └── contact-cta.tsx      # Contact call-to-action
│   │
│   ├── search/                  # Global search
│   │   └── global-search.tsx    # Site-wide search component
│   │
│   ├── sections/                # Shared section components
│   │   ├── hero-section.tsx     # Reusable hero sections
│   │   ├── about-section.tsx    # About previews
│   │   ├── projects-section.tsx # Project showcases
│   │   └── community-section.tsx # Community sections
│   │
│   ├── theme-provider.tsx       # Dark/light theme context
│   ├── language-provider.tsx    # i18n language context
│   └── theme-toggle.tsx         # Theme switcher component
│
├── lib/                         # Domain-Driven Design Core
│   ├── features/                # Feature-based domain modules (2025 Best Practice)
│   │   ├── home/               # Homepage domain logic
│   │   │   ├── config/         # Homepage configuration module
│   │   │   │   └── index.ts    # Configuration and static data
│   │   │   └── actions/        # Homepage server actions module
│   │   │       └── index.ts    # Homepage use cases
│   │   ├── projects/           # Projects domain module
│   │   │   ├── domain/         # Project entities and business logic
│   │   │   │   ├── index.ts    # Project entities and value objects
│   │   │   │   └── index.test.ts # Domain logic tests
│   │   │   ├── config/         # Project configuration module
│   │   │   │   └── index.ts    # Project configuration and static data
│   │   │   ├── actions/        # Project server actions module
│   │   │   │   ├── index.ts    # Project server actions (Use Cases)
│   │   │   │   └── index.test.ts # Actions tests
│   │   │   └── utils/          # Project utilities module
│   │   │       ├── index.ts    # Project utility functions
│   │   │       └── index.test.ts # Utility tests
│   │   ├── news/               # News domain module
│   │   │   ├── domain/         # News entities and business logic
│   │   │   │   ├── index.ts    # News entities and value objects
│   │   │   │   └── index.test.ts # Domain logic tests
│   │   │   ├── config/         # News configuration module
│   │   │   │   └── index.ts    # News configuration and static data
│   │   │   ├── actions/        # News server actions module
│   │   │   │   ├── index.ts    # News server actions
│   │   │   │   └── index.test.ts # Actions tests
│   │   │   └── utils/          # News utilities module
│   │   │       ├── index.ts    # News utility functions
│   │   │       └── index.test.ts # Utility tests
│   │   ├── events/             # Events domain module
│   │   │   ├── domain/         # Event entities and business logic
│   │   │   │   ├── index.ts    # Event entities and value objects
│   │   │   │   └── index.test.ts # Domain logic tests
│   │   │   ├── config/         # Events configuration module
│   │   │   │   └── index.ts    # Events configuration and static data
│   │   │   ├── actions/        # Events server actions module
│   │   │   │   ├── index.ts    # Events server actions
│   │   │   │   └── index.test.ts # Actions tests
│   │   │   └── utils/          # Events utilities module
│   │   │       ├── index.ts    # Events utility functions
│   │   │       └── index.test.ts # Utility tests
│   │   └── about/              # About domain module
│   │       ├── domain/         # About page entities
│   │       │   ├── index.ts    # About page entities and logic
│   │       │   └── index.test.ts # Domain tests
│   │       ├── config/         # About configuration module
│   │       │   └── index.ts    # About page configuration
│   │       ├── actions/        # About server actions module
│   │       │   ├── index.ts    # About page server actions
│   │       │   └── index.test.ts # Actions tests
│   │       └── utils/          # About utilities module
│   │           ├── index.ts    # About utility functions
│   │           └── index.test.ts # Utility tests
│   ├── utils.ts                # Common utility functions
│   └── i18n.ts                 # Internationalization config
│
├── public/                      # Static assets
│   ├── images/                  # Project and news images
│   ├── placeholder.svg          # Placeholder graphics
│   └── grid-pattern.jpg         # Background patterns
│
├── styles/                      # Global styles
│   └── globals.css              # Global CSS and Tailwind imports
│
├── messages/                    # i18n message files
│   ├── zh.json                  # Traditional Chinese translations
│   └── en.json                  # English translations
│
├── i18n.ts                      # i18n configuration
├── next.config.mjs              # Next.js configuration
├── tailwind.config.ts           # Tailwind CSS configuration
├── tsconfig.json                # TypeScript configuration
└── package.json                 # Dependencies and scripts
```

### Layer Responsibilities

#### 1. **Presentation Layer** (`components/`)
- **UI Components**: Reusable interface elements (buttons, cards, inputs)
- **Page Components**: Complete page layouts and containers
- **Layout Components**: Navigation, headers, footers
- **Theme Management**: Dark/light mode and styling

#### 2. **Application Layer** (`app/`)
- **Routing**: Next.js App Router with internationalized paths
- **Page Coordination**: Server components orchestrating page rendering
- **Loading States**: Suspense and loading UI management

#### 3. **Domain Layer** (`lib/features/`)
- **Domain Entities**: Core business objects (Project, Event, News)
- **Value Objects**: Immutable domain concepts (ProjectId, EventDate, etc.)
- **Domain Services**: Business logic orchestration
- **Configuration**: Domain-specific settings and static data
- **Server Actions**: Use case implementations and data access

#### 4. **Infrastructure Layer** (`lib/`, `public/`)
- **Utilities**: Helper functions and common logic
- **Assets**: Static files, images, and resources
- **Configuration**: Build and deployment settings

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