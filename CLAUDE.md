# CLAUDE.md

## Project Overview

Vanille (`@vanille/core`) is a zero-dependency web component framework built on native browser APIs. It provides JSX templating, signals-based reactivity, and scoped styling without a virtual DOM.

## Commands

- **Install dependencies:** `yarn`
- **Build:** `yarn build` (runs `tsc && vite build`)
- **Run tests:** `yarn test` (Vitest with jsdom, includes segfault retry)
- **Run tests in watch mode:** `yarn test:watch`
- **Run tests with coverage:** `yarn test:coverage`
- **Type check:** `yarn compile` (runs `tsc`)
- **Dev server:** `yarn dev`
- **Docs dev:** `yarn docs:dev`
- **Docs build:** `yarn docs:build:move`

## Architecture

- **Source code:** `src/` — TypeScript, compiled to UMD + ESM via Vite
- **Tests:** `tests/` — Vitest specs with jsdom environment and Playwright browser mode
- **Docs:** `pages/` — VitePress documentation site

### Key source files

- `src/View.ts` — Base web component class (extends HTMLElement, shadow DOM, lifecycle hooks, props, refs)
- `src/signals.ts` — Reactive primitives: `Signal`, `Computed`, `effect()`, `state()`, `computed()`, `stateArray()`
- `src/jsx.ts` — Custom JSX engine with `h()` and `Fragment` (no React/Preact)
- `src/Engine.ts` — Component instantiation and custom element registration (`v-` prefix)
- `src/Route.tsx` — Client-side routing component (`v-route`)
- `src/For.ts` — List rendering component (`v-for`)
- `src/If.tsx` — Conditional rendering component (`v-if`)
- `src/Vanille.ts` — Global style manager

## Code Conventions

- **Package manager:** Yarn
- **Language:** TypeScript (ESNext target, experimental decorators enabled)
- **JSX:** Custom `h()`/`Fragment` factory — not React. Configured in both `tsconfig.json` and `vite.config.ts`
- **Formatting:** Prettier — single quotes, semicolons, no trailing commas, 120 char width
- **Private members:** underscore prefix (`_updateList()`)
- **Scoped internals:** `$` prefix (`$scopedId`, `$el`, `$c`)
- **Component naming:** `v-` prefix for custom elements
- **No production dependencies** — everything is built in-house
- **Test pattern:** `tests/**/*.spec.{ts,tsx}`

## Specialized Agents

This project has specialized agents defined in `.github/agents/`. **Always check for and use specialized agents** before performing tasks:

### test-runner Agent

**When to use:** User requests to run tests, check test results, or troubleshoot test failures

**How to use:**

1. Read `.github/agents/test-runner.md` for full instructions
2. Invoke using `runSubagent` with the prompt identifying as the test-runner agent
3. Follow the agent's defined workflow and reporting format

**Example invocation:**

```typescript
runSubagent({
  description: 'Run all tests',
  prompt: `You are the test-runner agent defined in .github/agents/test-runner.md. 
  
Run all tests in the Vanille project using 'yarn test' and report:
1. Pass/fail status
2. Total test counts  
3. Any failures with details
4. Execution time`
});
```

**For parallel test execution:**

- Distribute the 9 test files across 3 test-runner agents
- Use the groupings defined in the test-runner agent documentation
- Aggregate results from all agents

### How to Add New Agents

1. Create `.github/agents/<agent-name>.md`
2. Use chatagent frontmatter with `name` and `description`
3. Document the agent's role, workflow, and invocation pattern
4. Update this section in CLAUDE.md
