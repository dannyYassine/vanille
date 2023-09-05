<p align="center">
<img height="auto" style="width: 320px; object-fit: contain;" src="https://github.com/dannyYassine/vanille/blob/main/vanille.png?raw=true" alt="logo.png">
</p>
<h3 align="center">
  A minimalistic vanilla web component framework
</h3>
<p align="center">
  Using native browser features to maximum performance with a few exceptions
</p>
<hr />
<p align="center">
    <img src="https://codecov.io/github/dannyYassine/vanille/graph/badge.svg?token=KN1KJCPFN3" />
    <img loading="lazy" alt="Dependencies" src="https://github.com/dannyYassine/vanille/actions/workflows/client-tests.yml/badge.svg" class="img_ev3q">
    <a href='https://www.npmjs.com/package/@vanille/core' target="_blank"><img src='https://img.shields.io/npm/v/@vanille/core.svg' alt='Library Version' /></a>
</p>
<p align="center">
  <a><img src="https://img.shields.io/bundlephobia/min/vanille.svg" alt="Minified size"></a>
    <a href="https://npm-stat.com/charts.html?package=@vanille/core"><img src="https://img.shields.io/npm/dm/@vanille/core.svg" alt="Downloads"></a>
    <img loading="lazy" alt="Dependencies" src="https://img.shields.io/badge/license-MIT-green" class="img_ev3q">
</p>
<p align="center">
  <img loading="lazy" alt="Dependencies" src="https://img.shields.io/badge/dependencies-none-pink" class="img_ev3q">
</p>

<hr />

### Features:
- Templating with JSX
- Pass `objects` to custom element attributes
- Observable `props` and `state`

### Installation:

```bash
yarn add @vanille/core
```

### No dependencies
All features are in-house implementations to maximize native functionality, with a few exceptions (check out below!)

<hr />

### Extending web components for native performance
```ts
import { BaseView } from '@vanille/core';

export class App extends BaseView {}
```

### Fast templating web components with in-house JSX

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

### Simple routing

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

### Observables

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

### Pass objects in web component attributes

```ts
const user = { name: 'vanille' };

<v-app user="user"></v-app>;

export class App extends BaseView {
  render() {
    return (
      <p>{this.props.user.name}</p>
    )
  }
}
```

### Web component attributes become observable props

```ts
const user: User = { name: 'vanille' };

<v-app user="user"></v-app>;

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

### Private state as observables

```ts
export class App extends BaseView {
  data() {
    return {
      name: 'vanille'
    };
  }

  setBindings() {
    this.state.$on('name', (newValue) => {
      // name changed
    });
  }
}
```

### Query the DOM with `refs` to update elements

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

### Declarative testing with JSX
```tsx
import { mount } from './test-utils';
// load the component
import './test-utils/Test';

test('can render from jsx', () => {
  const $shadow = mount(<v-test />) <---- JSX!

  const $el = $shadow.querySelector('[data-id="test"');

  expect($el).toBeTruthy();
});
```
