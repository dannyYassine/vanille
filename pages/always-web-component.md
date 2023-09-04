# Always web components

## Basic usage

`vanille` will use native browser features to improve performance. The core functionality behind this is leveraging web components.

```ts
import { BaseView } from '@vanille/core';
```

Then start building your components:

```ts
import { BaseView, define } from '@vanille/core';

@define()
export class Application extends BaseView {}
```

The decorator `define` is syntactic sugar over:

```ts
const prefix: string = 'v';
customElements.define(`${prefix}-${application}', Application);
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
