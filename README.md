<p align="center">
<img height="auto" style="width: 320px; object-fit: contain;" src="https://github.com/dannyYassine/vanille/blob/main/vanille.png?raw=true" alt="logo.png">
</p>
<h3 align="center">
  A minimalistic vanilla web component framework
</h3>
<p align="center">
  Using native browser features to maximum performance with a few exceptions
</p>
<hr />
<p align="center">
    <img src="https://codecov.io/github/dannyYassine/vanille/graph/badge.svg?token=KN1KJCPFN3" />
    <img loading="lazy" alt="Dependencies" src="https://github.com/dannyYassine/vanille/actions/workflows/client-tests.yml/badge.svg" class="img_ev3q">
    <a href='https://www.npmjs.com/package/@vanille/core' target="_blank"><img src='https://img.shields.io/npm/v/@vanille/core.svg' alt='Library Version' /></a>
</p>
<p align="center">
  <a><img src="https://img.shields.io/bundlephobia/min/vanille.svg" alt="Minified size"></a>
    <a href="https://npm-stat.com/charts.html?package=@vanille/core"><img src="https://img.shields.io/npm/dm/@vanille/core.svg" alt="Downloads"></a>
    <img loading="lazy" alt="Dependencies" src="https://img.shields.io/badge/license-MIT-green" class="img_ev3q">
</p>
<p align="center">
  <img loading="lazy" alt="Dependencies" src="https://img.shields.io/badge/dependencies-none-pink" class="img_ev3q">
</p>

<hr />

### Features

- Web components as first class citizens
- Templating with JSX
- Reactive rendering with signals
- Pass `objects` to custom element attributes
- No virtual DOM

<p align="center">
<img height="auto" style="width: 75%; max-width: 500px; border-radius: 5px; object-fit: contain;" src="https://github.com/dannyYassine/vanille/blob/main/pages/public/code1.png?raw=true" alt="logo.png">
</p>

### Installation

```bash
yarn add @vanille/core
```

### Prerequisites

#### `vite.config.ts`
Using `vite`, please specify the `esbuild` options:

```js
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment',
  }
```

#### `tsconfig.json`
To use `decorators`, enable `experimentalDecorators`:

```json
    "experimentalDecorators": true
```

### No dependencies

All features are in-house implementations to maximize native functionality, with a few exceptions (check out below!)

<hr />

### Extending web components for native performance

```ts
import { View } from '@vanille/core';

export class App extends View {}
```

### Fast templating web components with in-house JSX

```ts
export class App extends View {
  render() {
    return (
      <div>
        <span>JSX!</span>
      </div>
    );
  }
}
```

### Signals

```ts
export class App extends View {
  render() {
    const name = state('your name');
    const computedName = computed(() => name.get());

    return (
      <div>
        <span>{name}</span>
        <span>{computedName}</span>
      </div>
    );
  }
}
```

### Simple routing

```jsx
<v-route path="/">
  Home
</v-route>
<v-route path="/dashboard">
  Dashboard
</v-route>
<v-route path="/users/:id">
  User with id
</v-route>
```

### Pass objects in web component attributes

```ts
const user = { name: 'vanille' };

<v-app user="user"></v-app>;

export class App extends View {
  render() {
    return (
      <p>{this.props.user.name}</p>
    )
  }
}
```

### Query the DOM with `refs` to update elements

```ts
export class App extends View {
  setBindings() {
    this.refs.name.textContent = newValue;
  }

  render() {
    return (
      <div>
        <span ref="name">JSX!</span>
      </div>
    );
  }
}
```

### Declarative testing with JSX

```tsx
import { mount } from './test-utils';
// load the component
import './test-utils/Test';

test('can render from jsx', () => {
  const $shadow = mount(<v-test />) <---- JSX!

  const $el = $shadow.querySelector('[data-id="test"');

  expect($el).toBeTruthy();
});
```
