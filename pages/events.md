# Events

## Native DOM events

It is dead simple to listen and attach callback to native DOM events like `onclick` on your template:

```ts
import { define, BaseView } from '@vanille/core';

@define()
export class App extends BaseView {
  render() {
    return (
      <div>
        <button onclick={(e) => console.log('Clicked!')}>Login</button>
      </div>
    );
  }
}
```

`vanille` will reconize that `onclick` is a native event on the element and will be 100% what you expect.

## Custom DOM events

There will be a time your custom components will need to comunicate up to the parent component.

It is dead simple to implement any custom event, to your style.

The child element emitting the event uses the `emit` function, using the `'CustomEvent'` as the name of the event and passes a custom data as `{ message: 'vanille' }`:

```tsx{7}
import { define, BaseView } from '@vanille/core';

@define()
export class Child extends BaseView {
  render() {
    return (
      <button onclick={() => this.emit('CustomEvent', { message: 'vanille' })}>
        Click
      </button>
    );
  }
}
```

::: info
`BaseView` uses the `hasEmit` decorator which is simply syntactic sugar for:

```ts
emit() {
  setTimeout(() => {
    let options = { bubbles: true };
    if (data) {
      options = { ...options, detail: { ...data } };
    }
    this.dispatchEvent(new CustomEvent(name, options));
  }, 0);
}
```

:::

As the parent component, you listen with the following notation `onCustomEvent`. The event `e` will be pass as the first argument in the callback:

```ts{8}
import { define, BaseView } from '@vanille/core';

@define()
export class Parent extends BaseView {
  render() {
    return (
      <app-child
        onCustomEvent={(e) => {
          this.handleCustomEvent(e);
        }}
      ></app-child>
    );
  }
}
```
