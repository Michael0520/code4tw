# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Architecture

This is a **Turborepo monorepo** using PNPM workspaces with multiple Next.js applications and shared packages.

### Applications
- `apps/web` - Next.js application (development port 3000)
- `apps/docs` - Next.js documentation application (development port 3001)
- `apps/website` - Next.js website application (development port 3002, integrated Taiwan project)

### Shared Packages
- `@repo/ui` - Shared UI components library
- `@repo/next-config` - Shared Next.js configuration (ESM format)
- `@repo/eslint-config` - Shared ESLint configuration
- `@repo/typescript-config` - Shared TypeScript configuration

## Development Commands

### Primary Commands
```bash
# Start all applications in development mode
pnpm run dev

# Start specific application
pnpm run dev --filter=web
pnpm run dev --filter=docs
pnpm run dev --filter=website

# Build all applications
pnpm run build

# Lint all packages
pnpm run lint

# Type checking across entire workspace
pnpm run check-types

# Format code
pnpm run format
```

### Package Management
```bash
# Install dependencies for all packages
pnpm install

# Add dependency to specific app
pnpm add <package> --filter=web

# Add dependency to workspace root
pnpm add <package> -w
```

## Technical Stack

- **Package Manager**: PNPM with workspace protocol (`workspace:*`)
- **Monorepo Tool**: Turborepo 2.5.6
- **Runtime**: Node.js >=18
- **Framework**: Next.js 15.5.3 with Turbopack enabled
- **Language**: TypeScript 5.9.2
- **Linting**: ESLint 9.x
- **Formatting**: Prettier

## Configuration Patterns

### Next.js Configuration
- All apps use **ESM format** (`.mjs` files) for Next.js configs
- Shared configuration via `@repo/next-config/base`
- Workspace root detection configured with `turbopack.root`

Example app configuration:
```javascript
import baseConfig from '@repo/next-config/base';

const nextConfig = {
  ...baseConfig,
  // App-specific overrides
};

export default nextConfig;
```

### Workspace Dependencies
Use the workspace protocol for internal packages:
```json
{
  "dependencies": {
    "@repo/ui": "workspace:*",
    "@repo/next-config": "workspace:*"
  }
}
```

## Key Architectural Decisions

### Monorepo Structure
- **Single source of truth** for shared dependencies via workspace packages
- **Turbo caching** for optimized build performance
- **Consistent tooling** across all applications via shared configs

### Next.js Integration
- **Turbopack** enabled for fast development builds
- **Shared base configuration** prevents config duplication
- **Workspace root detection** properly configured for monorepo setup

## Important Notes

### Configuration Files
- All Next.js configs use `.mjs` extension with ESM imports
- Shared packages export both CommonJS and ESM formats for compatibility
- Package manager is locked to `pnpm@9.0.0` via `packageManager` field

### Development Workflow
- Each app runs on a different port to allow concurrent development
- Turbo handles dependency graphs and only rebuilds what's necessary
- Shared packages are automatically linked via PNPM workspace resolution

### Workspace Root Warnings
If you see Next.js workspace root warnings, ensure:
1. Only `pnpm-lock.yaml` exists (no `package-lock.json` files)
2. `turbopack.root` is properly configured in shared Next.js config
3. All config files use proper ESM syntax

This architecture enables efficient development across multiple Next.js applications while maintaining shared code and consistent tooling.