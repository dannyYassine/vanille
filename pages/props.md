# Props

## Pass objects as attributes

Web components only allow primitive types like strings and numbers as attributes. `vanille` allows us to pass object:

```tsx
const user: User = { name: 'vanille' };

<v-app user="{user}"></v-app>;
```

We can then access any given prop with the `props` object:
```tsx
export class App extends BaseView {
  render() {
    return (
      <div>{this.props.user.name}</div>
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
