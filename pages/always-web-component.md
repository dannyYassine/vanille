# Always web components

## Basic usage

`vanille` will use native browser features to improve performance as much as possible. The core functionality behind this is to leverage web components.

Import the base web component:

```ts
import { BaseView } from '@vanille/core';
```

Then start building your components:

```ts
import { BaseView, define } from '@vanille/core';

@define()
export class Application extends BaseView {}
```

::: tip
The decorator `define` is syntactic sugar for:

```ts
const prefix: string = 'v';
customElements.define(`${prefix}-${application}', Application);
```

:::

Next, start building your UI for in-house JSX:

```ts
import { BaseView, define } from '@vanille/core';

@define()
export class Application extends BaseView {
  render() {
    return <div>Hello world!</div>;
  }
}
```

`vanille` comes pack with syntactic sugar decorators, all of which are already sprinkled on the base web component class `BaseView`.

```ts
import {
  define,
  hasJsxTemplate,
  hasObservableProps,
  hasObservableState,
  hasRefs,
  hasShadowDom,
  define,
  hasEmit
} from '@vanille/core';
```

More in depth in [Decorators](./decorators.md).
