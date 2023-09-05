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

## Basic usage

Import `vanille` in your `.tsx` or `.jsx` file and use the default behaviour:

```ts
import { BaseView, define } from '@vanille/core';

@define()
export class Application extends BaseView {
  render() {
    return <div>Hello world!</div>;
  }
}
```
