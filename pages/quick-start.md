# Getting started

## Installation

`vanille` is available to download from all popular package managers.

**npm**

```bash
npm install @vanille/core
```

**yarn**

```bash
yarn add @vanille/core
```

**CDN**

```html
<script src="https://unpkg.com/@vanille/core"></script>
```

## Prerequisites

### `vite.config.ts`
Using `vite`, please specify the `esbuild` options, in order to convert jsx templates:

```js
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment',
  }
```

### `tsconfig.json`
To use `decorators` provided by `vanille`, enable `experimentalDecorators`:

```json
    "experimentalDecorators": true
```

## Basic usage

Import `vanille` in your `.tsx` or `.jsx` file and use the default behaviour:

```ts
// Application.ts
import { BaseView, define } from '@vanille/core';

@define()
export class Application extends BaseView {
  render() {
    return <div>Hello world!</div>;
  }
}
```

Then in your `index.html`:

```html
<!DOCTYPE html>
<html lang="en">
  <body>
    <v-application></v-application> // [!code focus:2]
    <script type="module" src="./Application.ts"></script>
  </body>
</html>
```
