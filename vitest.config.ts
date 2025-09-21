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
        'src/components/ui/form.tsx',
        'src/components/ui/select.tsx',
        'src/root.tsx',
        'src/routes.ts',
        'src/hooks/useRestClient.ts',
      ],
      thresholds: {
        statements: 80,
        branches: 50,
        functions: 50,
        lines: 60,
      },
    },
  },
  resolve: { alias: { '@': path.resolve(__dirname, './src') } },
});
