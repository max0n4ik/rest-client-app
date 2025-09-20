import { defineConfig } from 'vitest/config';
import path from 'path';
export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      reportsDirectory: './coverage',
      include: ['src/**/*.{js,jsx,ts,tsx}'],
      exclude: [
        'src/**/*.test.{js,jsx,ts,tsx}',
        'src/**/*.spec.{js,jsx,ts,tsx}',
        'src/main.{js,jsx,ts,tsx}',
        '/vitest.setup.ts',
        'src/**/*.d.ts',
        'node_modules/**/',
        'src/i18n.ts',
        'src/api/client.ts',
        'src/components/ui/tooltip.tsx',
        'src/root.tsx',
        'src/routes.ts',
        'src/hooks/useRestClient.ts',
      ],
      thresholds: {
        statements: 87.19,
        branches: 84.61,
        functions: 80.85,
        lines: 87.19,
        perFile: false,
        autoUpdate: true,
      },
    },
  },
  resolve: { alias: { '@': path.resolve(__dirname, './src') } },
});
