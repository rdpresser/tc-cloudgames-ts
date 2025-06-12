import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['test/**/*.test.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      reportsDirectory: 'coverage',
      exclude: [
        '**/*.d.ts',
        'index.ts', // root index.ts
        '**/index.ts', // all nested index.ts
      ],
    },
    alias: {
      application: '/src/application',
      domain: '/src/domain',
      shared: '/src/shared',
      interfaces: '/src/interfaces',
      infrastructure: '/src/infrastructure',
      config: '/src/config',
    },
  },
  resolve: {
    alias: {
      application: '/src/application',
      domain: '/src/domain',
      shared: '/src/shared',
      interfaces: '/src/interfaces',
      infrastructure: '/src/infrastructure',
      config: '/src/config',
    },
  },
});
