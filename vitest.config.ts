import { mergeConfig, defineConfig, reactConfig } from "@repo/vitest-config";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Root vitest configuration for the monorepo
 * Extends the shared React configuration with monorepo-specific settings
 */
export default mergeConfig(
  reactConfig,
  defineConfig({
    test: {
      setupFiles: ["@repo/vitest-config/setup"],
      coverage: {
        include: ["apps/*/src/**/*.{ts,tsx}", "packages/*/src/**/*.{ts,tsx}"],
        thresholds: {
          global: {
            branches: 60,
            functions: 60,
            lines: 60,
            statements: 60,
          },
          // Domain layer requires 100% coverage
          "apps/*/src/domain/**/*.ts": {
            branches: 100,
            functions: 100,
            lines: 100,
            statements: 100,
          },
          // Application layer requires 80% coverage
          "apps/*/src/application/**/*.ts": {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: 80,
          },
        },
      },
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "@/domain": path.resolve(__dirname, "./src/domain"),
        "@/application": path.resolve(__dirname, "./src/application"),
        "@/infrastructure": path.resolve(__dirname, "./src/infrastructure"),
        "@/presentation": path.resolve(__dirname, "./src/presentation"),
      },
    },
  })
);
