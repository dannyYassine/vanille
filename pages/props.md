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

## Objects in attributes

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

## Atttributes are observable props

Covered in detail in the [Observables](./observe-everything.md) section, its possible to listen to prop changes at any given level:

```tsx
export class App extends BaseView {
  setBindings() {
    this.props.$on('user', (newValue: User) => {
      // user changed
    });
    this.props.user.$on('name', (newValue: string) => {
      // name changed
    });
  }
}
```
