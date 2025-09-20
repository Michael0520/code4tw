import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    include: [
      'src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
      'lib/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'
    ],
    exclude: [
      'node_modules',
      '.next',
      'dist',
      'build',
      '**/*.d.ts'
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'dist/',
        'build/',
        '.next/',
        '**/*.d.ts',
        '**/*.config.{js,ts,mjs}',
        '**/coverage/**'
      ],
      thresholds: {
        global: {
          branches: 60,
          functions: 60,
          lines: 60,
          statements: 60
        },
        'src/domain/**/*.ts': {
          branches: 100,
          functions: 100,
          lines: 100,
          statements: 100
        },
        'src/application/**/*.ts': {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80
        }
      }
    },
    testTimeout: 10000,
    hookTimeout: 10000
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@/domain': path.resolve(__dirname, './src/domain'),
      '@/application': path.resolve(__dirname, './src/application'),
      '@/infrastructure': path.resolve(__dirname, './src/infrastructure'),
      '@/presentation': path.resolve(__dirname, './src/presentation')
    }
  }
});