<p align="center">
<img height="400px" style="max-width:100%" src="https://github.com/dannyYassine/vanille/blob/main/vanille.png?raw=true" alt="logo.png">
</p>
<p align="center">
  A minimalistic vanilla web component framework
</p>

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

## Pass objects as observable `data` and `props`

```ts
const user = { name: 'vanille' };

<v-app user="user"></v-app>;

export class App extends BaseView {
  setBindings() {
    this.props.user.$on('name', (newValue) => {
      // name changed
    });
  }
}
```

## Use `refs` to update the DOM

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
