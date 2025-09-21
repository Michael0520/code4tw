// ESLint configuration for English-only codebase
module.exports = {
  extends: ['@repo/eslint-config'],
  rules: {
    // Custom rule to prevent Chinese characters in variable names
    'no-irregular-whitespace': 'error',

    // Enforce consistent naming conventions (English only)
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'variable',
        format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
        filter: {
          regex: '[\\u4e00-\\u9fff\\u3400-\\u4dbf\\uf900-\\ufaff]',
          match: false,
        },
        custom: {
          regex: '^[a-zA-Z][a-zA-Z0-9_]*$',
          match: true,
        },
      },
      {
        selector: 'function',
        format: ['camelCase', 'PascalCase'],
        filter: {
          regex: '[\\u4e00-\\u9fff\\u3400-\\u4dbf\\uf900-\\ufaff]',
          match: false,
        },
        custom: {
          regex: '^[a-zA-Z][a-zA-Z0-9_]*$',
          match: true,
        },
      },
      {
        selector: 'typeLike',
        format: ['PascalCase'],
        filter: {
          regex: '[\\u4e00-\\u9fff\\u3400-\\u4dbf\\uf900-\\ufaff]',
          match: false,
        },
        custom: {
          regex: '^[A-Z][a-zA-Z0-9]*$',
          match: true,
        },
      },
      {
        selector: 'property',
        format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
        filter: {
          regex: '[\\u4e00-\\u9fff\\u3400-\\u4dbf\\uf900-\\ufaff]',
          match: false,
        },
        leadingUnderscore: 'allow',
        trailingUnderscore: 'allow',
      },
      {
        selector: 'parameter',
        format: ['camelCase'],
        filter: {
          regex: '[\\u4e00-\\u9fff\\u3400-\\u4dbf\\uf900-\\ufaff]',
          match: false,
        },
        leadingUnderscore: 'allow',
      },
      {
        selector: 'method',
        format: ['camelCase'],
        filter: {
          regex: '[\\u4e00-\\u9fff\\u3400-\\u4dbf\\uf900-\\ufaff]',
          match: false,
        },
      },
    ],

    // Prevent magic numbers - all numbers should have meaningful names
    '@typescript-eslint/no-magic-numbers': [
      'error',
      {
        ignore: [-1, 0, 1, 2],
        ignoreArrayIndexes: true,
        ignoreDefaultValues: true,
        ignoreClassFieldInitialValues: true,
        enforceConst: true,
      },
    ],

    // Enforce meaningful function names
    'prefer-arrow-callback': ['error', { allowNamedFunctions: true }],

    // Enforce English comments
    'spellcheck/spell-checker': [
      'warn',
      {
        comments: true,
        strings: false, // Allow Chinese in i18n strings
        identifiers: false,
        lang: 'en_US',
        skipWords: [
          'jsx',
          'tsx',
          'eslint',
          'vitest',
          'pnpm',
          'turbo',
          'vercel',
          'nextjs',
          'tailwind',
          'radix',
          'shadcn',
          'lucide',
          'github',
          'api',
          'url',
          'auth',
          'oauth',
          'jwt',
          'csrf',
          'uuid',
          'regex',
          'http',
          'https',
          'json',
          'html',
          'css',
          'dom',
          'ui',
          'ux',
          'repo',
          'config',
          'env',
          'dev',
          'prod',
          'src',
          'dist',
          'pkg',
          'deps',
          'utils',
          'libs',
          'middleware',
          'dto',
        ],
        skipIfMatch: [
          'http[s]?://[^s]*', // URLs
          '#[a-fA-F0-9]+', // Hex colors
          '/[a-zA-Z0-9_.-]+/', // File paths
        ],
      },
    ],

    // Prevent hardcoded strings that should be in config
    'no-magic-numbers': 'off', // Use TypeScript version instead
    'no-hardcoded-values': 'off', // Custom rule if available

    // Enforce consistent return types
    '@typescript-eslint/explicit-function-return-type': [
      'error',
      {
        allowExpressions: true,
        allowTypedFunctionExpressions: true,
        allowHigherOrderFunctions: true,
        allowDirectConstAssertionInArrowFunctions: true,
      },
    ],

    // Prevent any type usage
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-unsafe-assignment': 'error',
    '@typescript-eslint/no-unsafe-call': 'error',
    '@typescript-eslint/no-unsafe-member-access': 'error',
    '@typescript-eslint/no-unsafe-return': 'error',

    // Enforce Result pattern over throwing exceptions
    '@typescript-eslint/prefer-promise-reject-errors': 'error',
    'prefer-promise-reject-errors': 'error',

    // Prevent console usage in production code
    'no-console': ['error', { allow: ['warn', 'error'] }],

    // Enforce single responsibility principle
    'max-lines-per-function': ['error', { max: 50, skipBlankLines: true, skipComments: true }],
    'max-lines': ['error', { max: 300, skipBlankLines: true, skipComments: true }],
    'complexity': ['error', { max: 10 }],

    // Enforce pure functions
    'functional/no-let': 'off', // Too strict for React
    'functional/immutable-data': 'off', // Too strict for React
    'functional/no-this-expression': 'error',
    'functional/prefer-readonly-type': 'off', // Too strict

    // Enforce proper imports
    'import/no-default-export': 'off', // Next.js requires default exports for pages
    'import/prefer-default-export': 'off',
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        'newlines-between': 'always',
        alphabetize: { order: 'asc' },
      },
    ],

    // Enforce documentation
    'jsdoc/require-jsdoc': [
      'error',
      {
        require: {
          FunctionDeclaration: true,
          MethodDefinition: true,
          ClassDeclaration: true,
          ArrowFunctionExpression: false, // Too verbose for simple functions
          FunctionExpression: false,
        },
        contexts: ['TSInterfaceDeclaration', 'TSTypeAliasDeclaration'],
      },
    ],
    'jsdoc/require-description': 'error',
    'jsdoc/require-param-description': 'error',
    'jsdoc/require-returns-description': 'error',
  },

  // Plugin configurations
  plugins: [
    'spellcheck',
    'functional',
    'jsdoc',
  ],

  // Environment and parser options
  parserOptions: {
    project: './tsconfig.json',
  },

  // Override for specific file types
  overrides: [
    {
      // Allow Chinese content in i18n files
      files: ['**/i18n.ts', '**/translations.ts', '**/locale/**/*.ts'],
      rules: {
        'spellcheck/spell-checker': 'off',
        '@typescript-eslint/naming-convention': 'off',
      },
    },
    {
      // Test files have relaxed rules
      files: ['**/*.test.ts', '**/*.test.tsx', '**/*.spec.ts', '**/*.spec.tsx'],
      rules: {
        '@typescript-eslint/no-magic-numbers': 'off',
        'max-lines-per-function': 'off',
        'jsdoc/require-jsdoc': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
      },
    },
    {
      // Configuration files
      files: ['*.config.js', '*.config.ts', '*.config.mjs'],
      rules: {
        'import/no-default-export': 'off',
        '@typescript-eslint/no-magic-numbers': 'off',
        'jsdoc/require-jsdoc': 'off',
      },
    },
    {
      // Next.js specific files
      files: ['app/**/*.tsx', 'pages/**/*.tsx', 'app/layout.tsx'],
      rules: {
        'import/no-default-export': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
      },
    },
    {
      // Next.js auto-generated type files
      files: ['next-env.d.ts'],
      rules: {
        '@typescript-eslint/triple-slash-reference': 'off',
      },
    },
  ],
};