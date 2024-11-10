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

## Basic usage

Import `vanille` in your `.tsx` or `.jsx` file and use the default behaviour:

```ts
// MyComponent.ts
import { View } from '@vanille/core';

export class MyComponent extends View {
  render() {
    return <div>Hello world!</div>;
  }
}
```

Mount the root application node:

```ts
// Application.ts
import { View } from '@vanille/core';
import { MyComponent } from './MyComponent';

customElements.define('v-application', class extends View {
    render() {
      return <MyComponent />;
    }
  }
);
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
