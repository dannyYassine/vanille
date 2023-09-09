/// <reference types="vitest" />
import { defineConfig } from 'vite';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  test: {
    coverage: {
      provider: 'istanbul', // or 'v8'
      reporter: ['lcov', 'html']
    },
    globals: true,
    environment: 'jsdom',
    browser: {
      enabled: true,
      provider: 'playwright',
      name: 'chromium',
      headless: true
    },
    include: ['./tests/*']
  },
  plugins: [dts()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'vanille',
      fileName: 'vanille'
    },
    outDir: resolve(__dirname, 'src/dist')
  },
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment'
  },
  server: {
    port: 3000
  }
});
