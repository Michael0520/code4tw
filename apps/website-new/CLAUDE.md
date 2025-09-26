# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 14+ landing page template for SaaS subscriptions called "Cult Subscription Landing Page Template". It's built with TypeScript, React 18, Tailwind CSS, and Framer Motion for animations. The project uses the new Next.js App Router architecture.

## Development Commands

### Essential Commands (use pnpm)
```bash
pnpm i                # Install dependencies
pnpm run dev          # Start development server (http://localhost:3000)
pnpm run build        # Build for production
pnpm run start        # Start production server
pnpm run format       # Format code with Prettier
```

### Development Server
- Development runs on `http://localhost:3000`
- Hot reloading is enabled by default

## Architecture & Structure

### Next.js App Router Structure
```
src/
├── app/                    # Next.js 13+ App Router
│   ├── _layout.tsx        # Custom landing page layout component
│   ├── _sections/         # Page sections (hero, features, pricing)
│   ├── page.tsx           # Main landing page
│   ├── layout.tsx         # Root layout with metadata
│   └── globals.css        # Global styles with CSS variables
├── components/
│   ├── cult/              # Custom landing page components
│   ├── ui/                # Reusable UI components (shadcn/ui style)
│   ├── ace/               # Additional component library
│   └── [component].tsx    # Standalone components
└── lib/                   # Utilities and hooks
```

### Key Components Architecture

**Landing Page Layout (`src/app/_layout.tsx`)**:
- Main layout component with section navigation
- Uses Intersection Observer for active section tracking
- Implements smooth scrolling between sections
- Framer Motion animations for navbar

**Section-based Structure**:
- Hero section with animated elements
- Features section with bento grid layout
- Testimonials using `react-tweet` component
- Pricing section with dark background
- FAQ accordion section

**Custom Component Libraries**:
- `/cult/` - Landing page specific components with animations
- `/ui/` - shadcn/ui compatible components
- `/ace/` - Additional utility components

## Styling & Design System

### Tailwind Configuration
- Uses CSS variables for theme colors (`hsl(var(--primary))`)
- Custom color palette: yellow, indigo, orange variants
- Extended animations for spotlights, rotations, and accordions
- Custom font families: Satoshi (sans) and brand font

### Component Styling Patterns
- Utilizes `clsx` and `class-variance-authority` for conditional classes
- CSS variables defined in `globals.css` for consistent theming
- Framer Motion for complex animations and transitions

### Image Handling
- Next.js Image component configured for `i.pravatar.cc` remote patterns
- Images stored in `src/images/` directory

## Development Patterns

### Component Structure
- Functional components with TypeScript
- Props interfaces defined inline or imported
- Consistent file naming: `PascalCase.tsx` for components

### Animation Patterns
- Framer Motion for entrance animations and transitions
- Custom Tailwind animations for specific UI interactions
- Intersection Observer for scroll-based animations

### State Management
- React hooks for local component state
- No global state management (Redux/Zustand) implemented
- Context API not currently used

## Technology Stack

### Core Dependencies
- **Next.js**: Latest version with App Router
- **React**: 18.2.0
- **TypeScript**: 5.1.3
- **Tailwind CSS**: 3.3.3 with plugins
- **Framer Motion**: 10.18.0 for animations

### UI Libraries
- **Radix UI**: Accordion components
- **Lucide React**: Icon library
- **@tabler/icons-react**: Additional icons
- **react-tweet**: Twitter embed components

### Development Tools
- **Prettier**: Code formatting with import sorting
- **PostCSS**: CSS processing
- **Autoprefixer**: CSS vendor prefixes

## Important Notes

- TypeScript strict mode is disabled (`"strict": false`)
- Path aliases configured: `@/*` maps to `./src/*`
- Uses pnpm as package manager (preferred over npm/yarn)
- No testing framework currently configured
- No linting tools (ESLint) configured
- Image optimization enabled for Pravatar service