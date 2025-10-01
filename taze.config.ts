import { defineConfig } from "taze";

export default defineConfig({
  // Exclude packages that should not be auto-updated
  exclude: [
    // Next.js and React ecosystem - require careful version management
    "next",
    "react",
    "react-dom",

    // TypeScript - major version changes require migration
    "typescript",

    // Testing libraries - major changes may affect test suite
    "@testing-library/react",
    "@testing-library/jest-dom",
  ],

  // Enable recursive mode for monorepo support
  recursive: true,

  // Don't write by default (will be explicit in GitHub Actions)
  write: false,

  // Update mode: 'default' (respects semver ranges), 'latest', 'major', 'minor', 'patch'
  mode: "default",

  // Package-specific update modes
  packageMode: {
    // Always keep Turborepo on latest
    turbo: "latest",

    // Keep build tools on latest minor
    "@turbo/gen": "minor",
    vitest: "minor",
    eslint: "minor",
    prettier: "minor",
  },

  // Include peer dependencies in checks
  peer: true,
});
