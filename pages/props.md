# Props

## The `props` object

Native to web components and any other element, we can pass attributes to our elements:

```tsx
<v-app firstName="{user.name}"></v-app>
```

Then, we can now access any given prop with the `props` object:

```tsx
export class App extends BaseView {
  render() {
    return (
      <div>{this.props.firstName}</div> // [!code focus]
    )
  }
}
```

## Objects as attributes

Web components only allow primitive types like strings and numbers as attributes. `vanille` allows us to pass object:

```tsx
const user: User = { name: 'vanille' };

<v-app user="{user}"></v-app>;
```

Again using `props` to access the object:

```tsx
export class App extends BaseView {
  render() {
    return (
      <div>{this.props.user.name}</div> // [!code focus]
    )
  }
}
```

## Signals as attributes

Covered in detail in the [Signals](./observe-signals.md) section, its possible to listen to prop changes at any given level:

Declare a signal as a property and assign it to the child's attributte:

```tsx
export class Parent extends BaseView {
  count = state(0);

  render() {
    return (
      <Child count={count} />
    );
  }
}
```

Using the given props as `this.props.count`:

```tsx
export class Child extends BaseView {
  render() {
    return (
      <div>{this.props.count}</div>
    );
  }
}
```

When the signal changes at any hierarchy, any component using it will have its value reactively updated in the DOM. Let's increment the count in the parent component:

```tsx
export class Parent extends BaseView {       
  count = state(0);

  render() {
    return (
      <button onclick={() => this.count.set((c) => c + 1)}> // [!code focus:3]
        Increment
      </button>
      <Child count={count} />
    );
  }
}
```

`vanille` will only update the specific places in the DOM where the signal is being used

```tsx
export class Child extends BaseView {
  render() {
    return (
      <div>{this.props.count}</div> // count is updated! // [!code focus:3]
    );
  }
}
```
