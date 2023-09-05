# State

## Private state

It is very likely a web component will need state that is only related to its UI. By implementing the `data()` function, all properties returned by the function will become [observables](./observe-everything.md).

```tsx
import { define, BaseView } from '@vanille/core';

@define()
export class App extends BaseView {
  data() {
    return {
      name: 'vanille'
    };
  }

  render() {
    return <div>{this.state.name}</div>;
  }
}
```

## Data as observable state

Covered in detail in the [Observables](./observe-everything.md) section, its possible to listen to state changes at any given level:

```tsx
import { define, BaseView } from '@vanille/core';

@define()
export class App extends BaseView {
  setBindings() {
    this.state.$on('name', (newValue) => {
      // name changed
    });
  }
}
```
