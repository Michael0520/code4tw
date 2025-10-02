# Documentation

Welcome to the Code4TW documentation. This directory contains all project documentation organized by category.

## 📚 Documentation Structure

### [Setup Guides](./setup/)

Configuration and setup documentation for various tools and services:

- [SonarCloud Setup](./setup/SONARCLOUD_SETUP.md) - Code quality monitoring configuration
- [PostHog Setup](./setup/POSTHOG_SETUP.md) - Analytics platform configuration
- [PostHog Domains](./setup/POSTHOG_DOMAINS.md) - Domain configuration for PostHog

### [Development](./development/)

Development guidelines and best practices:

- [Code Review Checklist](./development/CODE_REVIEW_CHECKLIST.md) - Comprehensive checklist for code reviews
- [Dependency Updates](./development/DEPENDENCY_UPDATES.md) - Automated dependency management with taze

## 🔗 Quick Links

- [Main README](../README.md) - Project overview
- [CLAUDE.md](../CLAUDE.md) - Claude Code development standards
- [Website App](../apps/website/README.md) - Website application documentation

## 📖 Contributing

When adding new documentation:

1. Place setup/configuration docs in `setup/`
2. Place development guidelines in `development/`
3. Update this README with a link to your new document
4. Follow markdown best practices
5. Include clear titles and section headers

## 🏗️ Project Structure

```
docs/
├── setup/                  # Setup and configuration guides
│   ├── SONARCLOUD_SETUP.md
│   ├── POSTHOG_SETUP.md
│   └── POSTHOG_DOMAINS.md
├── development/            # Development guidelines
│   ├── CODE_REVIEW_CHECKLIST.md
│   └── DEPENDENCY_UPDATES.md
└── README.md              # This file
```
