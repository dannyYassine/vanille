# vanille

A minimalistic vanilla web component framework

## Routing

```jsx
<v-route path="/">
  Home
</v-route>
<v-route path="/dashboard">
  Dashboard
</v-route>
<v-route path="/users/:id">
  User with id
</v-route>
```

## Observables

```ts
const object = observable({
  user: {
    email: '',
    contact: {
      firstName: ''
    }
  }
});
object.user.$on('email', (newValue, oldValue, user) => {
  console.log(newValue, oldValue, user);
});
object.user.contact.$on('firstName', (newValue, oldValue, user) => {
  console.log(newValue, oldValue, user);
});

user.email = 'vanille@js.com';
// log: 'vanille@js.com' '' { email: '', contact: { firstName: '' } }

user.contact.firstName = 'vanille';
// log: 'vanille' '' { contact: { firstName: '' } }
```

## Web components with JSX

```ts
export class App extends BaseView {
  render() {
    return (
      <div>
        <span>JSX!</span>
      </div>
    );
  }
}
```

## Observable `data` and `props`

```ts
const name = 'vanille';

<v-app name="name"></v-app>;

export class App extends BaseView {
  setBindings() {
    this.props.$on('name', (newValue) => {
      // name changed
    });
  }
}
```

## Use `Refs` to update the DOM

```ts
export class App extends BaseView {
  setBindings() {
    this.props.$on('name', (newValue: string) => {
      this.refs.name.textContent = newValue;
    });
  }

  render() {
    return (
      <div>
        <span ref="name">JSX!</span>
      </div>
    );
  }
}
```
