# Events

## Native DOM events

It is simple to listen and attach a callback to a native DOM event like `onclick` on your template:

```ts
import { define, BaseView } from '@vanille/core';

@define()
export class App extends BaseView {
  render() {
    return (
      <div>
        <button onclick={(e) => console.log('Clicked!')}>Login</button> // [!code focus]
      </div>
    );
  }
}
```

`vanille` will reconize that `onclick` is a native event on the element and will be 100% what you expect.

## Custom DOM events

There will be a time your custom component will need to communicate up to the parent component.

It is again simple to implement any custom event, to your style.

The child element emitting the event uses the `emit` function, using the `'CustomEvent'` as the name of the event and passes a custom data object as `{ message: 'vanille' }`:

```tsx{7}
import { define, BaseView } from '@vanille/core';

@define()
export class Child extends BaseView {
  render() {
    return (
      <button onclick={() => this.emit('CustomEvent', { message: 'vanille' })}> // [!code focus]
        Click
      </button>
    );
  }
}
```

::: info
`BaseView` uses the `hasEmit` decorator which is simply syntactic sugar for:

```ts
emit(name: string, data?: unknown) {
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

As the parent component, you listen with the following notation `onCustomEvent`. The event `e` will be passes as the first argument in the callback:

```ts{8-9}
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
