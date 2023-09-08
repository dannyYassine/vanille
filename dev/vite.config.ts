/// <reference types="vitest" />
import { defineConfig } from 'vite';
import * as path from 'path';

export default defineConfig({
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment'
  },
  server: {
    port: 3000
  },
  resolve: {
    alias: [
      {
        find: '@vanille/core',
        replacement: path.resolve(__dirname, '..', '.')
      }
    ]
  }
});
