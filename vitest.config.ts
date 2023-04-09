import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      all: true,
      exclude: ['**/*.spec.ts', 'cdk/aws-organization-for-devs.ts'],
      include: ['cdk'],
    },
    deps: {
      inline: ['vitest-mock-process'],
    },
    setupFiles: './test/setup.ts',
    threads: false,
  },
});
