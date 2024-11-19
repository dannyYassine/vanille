/// <reference types="vitest" />
import { defineConfig } from "vite";

export default defineConfig({
  esbuild: {
    jsxFactory: "h",
    jsxFragment: "Fragment",
  },
  resolve: {
    alias: [
      {
        find: '@vanille/core', replacement: '../src'
      }
    ]
  },
  server: {
    port: 5173,
  },
});
