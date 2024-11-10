# Native web components

## Basic usage

`vanille` will use native browser features to improve performance as much as possible. The core functionality behind this is to leverage web components.

Import the base web component:

```ts
import { View } from '@vanille/core';
```

::: info
`View` extends the `HTMLElement` class
:::

Then start building your components:

```ts
import { View } from '@vanille/core';

export class MyComponent extends View {
  [...]
}
```

::: tip
There's no neet to use `customElements.define()` to register your custom web components since `vanille` will automatically do that for you behind the scenes.

```ts
const prefix: string = 'v';
customElements.define(`${prefix}-${MyComponent.name.toLowerCase()}', MyComponent);
```

:::

## Class components

Next, start building your UI with built-in jsx:

```ts
import { View } from '@vanille/core';

export class MyComponent extends View {
  render() {
    return <div>Hello world!</div>;
  }
}
```

## Functional components

`vanille` also supports functional components for smaller and less use case driven UIs:

```ts
export function MyComponent(props) {
  return <div>Hello world!</div>;
}
```

## Built-in methods

`vanille` comes pack with syntactic sugar methods, all of which are already sprinkled on the base web component class `View`.

```ts
import {
  define,
  hasJsxTemplate,
  hasObservableProps,
  hasObservableState,
  hasRefs,
  hasShadowDom,
  hasEmit
} from '@vanille/core';
```

More details in [components in depth](./decorators.md).
