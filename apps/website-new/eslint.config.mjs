import { nextJsConfig as baseConfig } from "@repo/eslint-config/next-js";

export default [
  ...baseConfig,
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "public/**",
      "*.config.*"
    ]
  },
  {
    rules: {
      // Temporary relaxations for migration
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": ["warn", {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_"
      }],
      "react/display-name": "off"
    }
  }
];