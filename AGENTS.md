# AGENTS.md

This file provides instructions and context for AI coding agents (e.g. GitHub Copilot) working in this repository.

## Project Overview

**Vanille** (`@vanille/core`) is a minimalistic web component framework built on native browser features. It provides:

- Web components as first-class citizens (extending `HTMLElement`)
- In-house JSX templating (custom `h` / `Fragment` factory)
- Reactive rendering with signals (`state`, `computed`, `effect`)
- Simple routing (`<v-route>`)
- Conditional and list rendering (`<v-if>`, `<v-for>`)
- Zero runtime dependencies

## Build, Test, and Lint Commands

| Command | Description |
|---|---|
| `yarn test` | Run tests with Vitest (uses Playwright browser + jsdom) |
| `yarn test:watch` | Run tests in watch mode |
| `yarn test:coverage` | Run tests with Istanbul coverage |
| `yarn build` | Compile TypeScript and build with Vite (`tsc && vite build`) |
| `yarn compile` | TypeScript compilation only (`tsc`) |
| `yarn docs:dev` | Start VitePress documentation dev server |
| `yarn docs:build` | Build documentation |

### Docker-based Development

The project can also run inside Docker containers via the `makefile`:

| Command | Description |
|---|---|
| `make test` | Run tests inside the Playwright Docker container |
| `make test.watch` | Run tests in watch mode inside Docker |
| `make client.build` | Build the project inside Docker |

## Project Structure

```
├── src/                    # Source code
│   ├── index.ts            # Public API exports
│   ├── View.ts             # Core View class (extends HTMLElement)
│   ├── BaseView.ts         # Legacy abstract base view with decorators
│   ├── ViewMode.ts         # Enum for shadow DOM modes (OPEN, CLOSED, NONE)
│   ├── jsx.ts              # Custom JSX runtime (h function + render)
│   ├── signals.ts          # Reactive primitives (Signal, Computed, effect, state)
│   ├── Engine.ts           # Element factory for JSX rendering
│   ├── Vanille.ts          # Global singleton for shared styles
│   ├── If.tsx              # <v-if> conditional rendering component
│   ├── For.ts              # <v-for> list rendering component
│   ├── Route.tsx           # <v-route> routing component
│   ├── helpers/            # Utility functions
│   │   ├── isPrimitive.ts
│   │   ├── makeId.ts
│   │   ├── random.ts
│   │   └── snakeCase.ts
│   └── dist/               # Build output (generated)
├── tests/                  # Test files
│   ├── *.spec.ts(x)        # Test specs (Vitest + Playwright browser)
│   └── test-utils/         # Shared test utilities
│       ├── index.ts         # Exports mount helper
│       ├── utils.ts         # mount and shallowMount implementations
│       ├── Test.tsx          # Test component fixtures
│       └── TestEngine.ts    # Test engine fixture
├── pages/                  # VitePress documentation source
├── docker/                 # Docker configuration files
├── vite.config.ts          # Vite + Vitest configuration
├── tsconfig.json           # TypeScript configuration
└── makefile                # Docker-based development commands
```

## Code Style and Conventions

- **Formatter**: Prettier with the following settings (`.prettierrc.json`):
  - 2-space indentation
  - Single quotes
  - No trailing commas
  - Semicolons enabled
  - 120-character print width
- **TypeScript**: Strict mode is disabled; `experimentalDecorators` is enabled
- **Naming**: Custom elements use the `v-` prefix (e.g. `v-view`, `v-if`, `v-for`, `v-route`)
- **Exports**: Public API is exported from `src/index.ts`
- **No comments**: The codebase uses minimal to no inline comments; keep it that way

## Key Patterns

### View (Web Component)

All components extend `View<P>` which extends `HTMLElement`. Components:

- Override `render()` to return JSX
- Use `this.props` for attributes passed to the element
- Use `this.refs` (Proxy-based) to query DOM elements by `ref` attribute
- Call `this.emit(name, data)` to dispatch custom events
- Use lifecycle hooks: `connected()`, `disconnected()`, `adopted()`, `attributeChanged()`
- Must be registered with `customElements.define('v-name', ClassName)`

### JSX

The custom JSX factory is `h` with `Fragment` as the fragment factory. These are configured in both `vite.config.ts` (`esbuild.jsxFactory` / `esbuild.jsxFragment`) and `tsconfig.json` (`jsxFactory` / `jsxFragmentFactory`). The `render()` function in `jsx.ts` converts JSX arrays into real DOM elements.

### Signals (Reactivity)

- `state<T>(value)` — creates a `Signal<T>` (reactive value)
- `computed<T>(fn)` — creates a `Computed<T>` that auto-tracks signal dependencies
- `effect(fn)` — runs a side effect that auto-subscribes to accessed signals
- `stateArray<T>(value)` — creates a signal wrapping an array of signals
- Dependency tracking uses a global `trackDependency` function on `globalThis`

### Routing

The `Route` component monkey-patches `history.pushState` and `history.replaceState` to dispatch `locationchange` events. Routes support static paths, parameterized paths (`:id`), and prefix matching (`startWith`).

## Testing Conventions

- **Framework**: Vitest with Playwright browser provider (`chromium`, headless)
- **Environment**: Tests run in a real browser via `@vitest/browser`
- **Test file pattern**: `tests/**/*.spec.ts(x)`
- **Structure**: Each test file uses `describe`/`test` blocks with `afterEach` cleanup (`document.body.innerHTML = ''`)
- **Mounting**: Use `mount()` from `tests/test-utils` to render components into the DOM
- **Assertions**: Use Vitest's `expect` API
- **JSX in tests**: Tests can use JSX directly (e.g. `mount(<v-test />)`)
- **Test components**: Reusable test fixtures live in `tests/test-utils/Test.tsx`
