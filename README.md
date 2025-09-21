# Code for Taiwan (Code4TW) Monorepo

Code for Taiwan is an open-source civic technology community dedicated to advancing Taiwan's society through technology innovation.

## What's Inside?

This Turborepo includes the following packages and applications:

### Apps and Packages

- `website`: Code for Taiwan main website ([Next.js](https://nextjs.org/))
- `@repo/ui`: Shared React component library
- `@repo/next-config`: Shared Next.js configuration
- `@repo/eslint-config`: ESLint configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `@repo/typescript-config`: Shared `tsconfig.json` used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

## Architecture Features

The website application follows modern development practices:

- **🏗️ Modular DDD Architecture**: Feature-first structure following 2025 best practices
- **🌍 Internationalization**: Multi-language support with next-intl (Chinese & English)
- **⚡ Modern Tech Stack**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **🧪 Test-Driven Development**: Complete domain layer test coverage
- **📱 Responsive Design**: Support for all device sizes

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm 8+

### Install Dependencies

```bash
pnpm install
```

### Build

To build all apps and packages, run the following command:

```bash
pnpm build
```

You can build a specific package by using a [filter](https://turborepo.com/docs/crafting-your-repository/running-tasks#using-filters):

```bash
# Build website only
pnpm build --filter=website
```

### Development

To develop all apps and packages, run the following command:

```bash
pnpm dev
```

You can develop a specific package by using a [filter](https://turborepo.com/docs/crafting-your-repository/running-tasks#using-filters):

```bash
# Start website development mode (available at http://localhost:3002)
pnpm dev --filter=website
```

### Testing

```bash
# Run all tests
pnpm test

# Run specific package tests
pnpm test --filter=website

# Run tests in watch mode
pnpm test:watch --filter=website
```

### Code Quality

```bash
# TypeScript type checking
pnpm check-types --filter=website

# ESLint checking
pnpm lint --filter=website
```

## Project Structure

```
apps/
├── website/                    # Code for Taiwan main website
└── packages/
    ├── ui/                     # Shared UI components
    ├── next-config/            # Shared Next.js configuration
    ├── eslint-config/          # ESLint configuration
    └── typescript-config/      # TypeScript configuration
```

### Website Application

The website follows a modular Domain-Driven Design (DDD) architecture:

```
apps/website/
├── app/                       # Next.js App Router
├── components/                # React components
├── lib/features/              # Business feature modules (DDD)
│   ├── projects/              # Projects feature
│   │   ├── domain/            # Domain logic
│   │   ├── actions/           # Server Actions
│   │   ├── config/            # Configuration
│   │   └── utils/             # Utility functions
│   ├── news/                  # News feature
│   ├── events/                # Events feature
│   ├── about/                 # About us
│   └── home/                  # Homepage
├── messages/                  # i18n translation files
└── ARCHITECTURE.md            # Detailed architecture documentation
```

For detailed architecture information, see `apps/website/ARCHITECTURE.md`.

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turborepo.com/docs/crafting-your-repository/running-tasks)
- [Caching](https://turborepo.com/docs/crafting-your-repository/caching)
- [Remote Caching](https://turborepo.com/docs/core-concepts/remote-caching)
- [Filtering](https://turborepo.com/docs/crafting-your-repository/running-tasks#using-filters)
- [Configuration Options](https://turborepo.com/docs/reference/configuration)
- [CLI Usage](https://turborepo.com/docs/reference/command-line-reference)

## Contributing

1. Fork this project
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Contact

- Website: [https://codefortaiwan.org](https://codefortaiwan.org)
- GitHub: [Code for Taiwan](https://github.com/Michael0520/code4tw)
