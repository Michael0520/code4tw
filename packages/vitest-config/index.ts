import { defineConfig, mergeConfig } from "vitest/config";
import type { UserConfig } from "vitest/config";

/**
 * Base vitest configuration for all packages
 * Extend this for non-React packages or customize as needed
 */
export const baseConfig: UserConfig = {
  test: {
    globals: true,
    include: ["**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    exclude: [
      "**/node_modules/**",
      "**/.next/**",
      "**/dist/**",
      "**/build/**",
      "**/*.d.ts",
    ],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html", "lcov"],
      exclude: [
        "**/node_modules/**",
        "**/dist/**",
        "**/build/**",
        "**/.next/**",
        "**/*.d.ts",
        "**/*.config.{js,ts,mjs}",
        "**/coverage/**",
        "**/.turbo/**",
      ],
    },
    testTimeout: 10000,
    hookTimeout: 10000,
  },
};

/**
 * React-specific vitest configuration
 * Use this for React/Next.js applications
 */
export const reactConfig: UserConfig = mergeConfig(baseConfig, {
  test: {
    environment: "jsdom",
  },
});

export { defineConfig, mergeConfig };
