# Testing Guide for Vanille

This document explains how to run tests for the Vanille project using Vitest.

## Prerequisites

Ensure you have dependencies installed:

```bash
yarn
```

## Test Commands

### Run all tests (single run)

```bash
yarn test
```

This runs all tests once with a segfault retry mechanism (up to 3 retries).

### Watch mode

```bash
yarn test:watch
```

Runs tests in watch mode, automatically re-running when files change.

### Coverage report

```bash
yarn test:coverage
```

Runs all tests and generates a coverage report using Istanbul.

### Watch mode with coverage

```bash
yarn test:watch:coverage
```

Runs tests in watch mode while also tracking coverage.

## Test Configuration

The project uses Vitest with the following setup (configured in `vite.config.ts`):

- **Environment:** jsdom (for DOM simulation)
- **Browser mode:** Enabled with Playwright (Chromium, headless)
- **Test files:** `tests/**/*.spec.*` (supports `.ts` and `.tsx`)
- **Coverage provider:** Istanbul
- **Coverage output:** LCOV and HTML formats

## Test Structure

Tests are located in the `tests/` directory and follow these patterns:

- `tests/Computed.spec.ts` — Signal computed tests
- `tests/effect.spec.ts` — Effect system tests
- `tests/Signal.spec.ts` — Signal reactivity tests
- `tests/View.spec.tsx` — Component lifecycle and rendering tests
- `tests/For.spec.tsx` — List rendering tests
- `tests/If.spec.tsx` — Conditional rendering tests
- `tests/Route.spec.tsx` — Routing tests
- `tests/jsx.spec.tsx` — JSX engine tests
- `tests/Vanille.spec.tsx` — Global style manager tests

## Writing Tests

Test files use Vitest's API with global imports enabled:

```typescript
import { describe, it, expect, beforeEach, afterEach } from 'vitest';

describe('My feature', () => {
  it('should work correctly', () => {
    expect(true).toBe(true);
  });
});
```

For component testing, you can use the JSX syntax:

```tsx
import { View } from '../src/View';

describe('Component', () => {
  it('renders correctly', () => {
    const component = <div>Hello</div>;
    expect(component).toBeDefined();
  });
});
```

## Viewing Coverage

After running `yarn test:coverage`, view the HTML report:

```bash
open coverage/index.html
```

Or check the LCOV report in `coverage/lcov-report/`.

## Troubleshooting

### Segmentation faults

If you encounter segmentation faults during testing, the `--segfault-retry=3` flag is already configured to automatically retry failed tests up to 3 times.

### Browser mode issues

If Playwright browser tests fail, ensure Playwright browsers are installed:

```bash
npx playwright install chromium
```

### Type checking

To check TypeScript types without running tests:

```bash
yarn compile
```
