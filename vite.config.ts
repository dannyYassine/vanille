/// <reference types="vitest" />
import { defineConfig } from 'vite';

export default defineConfig({
  test: {
  },
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment'
  },
  server: {
    port: 3000
  }
});