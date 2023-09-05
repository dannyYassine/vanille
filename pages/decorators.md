# Decorators

## Base flavour

`vanille` comes pack with syntactic sugar decorators, all of which are already sprinkled on the base web component class `BaseView`.

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

The base class `BaseView` has all these decorators to create the base flavour of `vanille` to get started:

```ts
@hasRefs()
@hasShadowDom()
@hasJsxTemplate()
@hasObservableProps()
@hasObservableState()
@hasEmit()
export abstract class BaseView extends HTMLElement {}
```

## Creating your own flavour

Since `vanille` exposes all decorators, you can create your own flavours of web components.

```ts
import { define, hasShadowDom, hasJsxTemplate } from '@vanille/core';

@define()
@hasShadowDom()
@hasJsxTemplate()
export class AnotherFlavour extends HTMLElement {
  connectedCallback() {
    this.renderTemplate();
  }

  render() {
    return <div>My new flavour!</div>;
  }
}
```

::: info
The decorator `hasJsxTemplate` adds the `renderTemplate` function to the `HTMLElement.prototype`, thus you simply need to call it.
:::

And just like that, we were able to add JSX to a web component with a few lines of codes.
