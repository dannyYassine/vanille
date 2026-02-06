---
name: run-vitest
description: Run and troubleshoot the project's Vitest test suite, including watch mode, coverage, segfault retry, and TypeScript checks.
---

# Running Tests

## Quick Commands

Run all tests:
```bash
yarn test
```

Watch mode:
```bash
yarn test:watch
```

With coverage:
```bash
yarn test:coverage
```

## Important Notes

- Tests use Vitest with jsdom environment and Playwright browser mode
- Test files are in `tests/**/*.spec.*`
- Segfault retry is configured (3 attempts)
- Coverage reports generate in `coverage/` directory

## Before Running Tests

Always ensure dependencies are installed:
```bash
yarn
```

## Type Checking

To verify TypeScript without running tests:
```bash
yarn compile
```
