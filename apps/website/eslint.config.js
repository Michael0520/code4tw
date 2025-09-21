import { nextJsConfig } from "@repo/eslint-config/next-js";

export default [
  ...nextJsConfig,
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      ".turbo/**",
      "out/**",
      ".eslintrc.english-only.js",
      "next-env.d.ts"
    ]
  }
];