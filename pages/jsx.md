# JSX

## Standardized JSX

You can quickly get started with fast templating with JSX

```ts
import { define, BaseView } from '@vanille/core';

@define()
export class App extends BaseView {
  // [!code focus:7]
  render() {
    return (
      <div>
        <span>JSX!</span>
      </div>
    );
  }
}
```

## `render` function

`BaseView` already has the `hasJsxTemplate` decorator so you can quickly get started. You will need to implement the `render` funtion

## `hasJsxTemplate` decorator

Since `vanille` exposes all decorators, you can create your own flavours of web components.

```ts
import { define, hasShadowDom, hasJsxTemplate } from '@vanille/core';

@define()
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
