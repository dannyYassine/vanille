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
    <a href="https://npm-stat.com/charts.html?package=vanille"><img src="https://img.shields.io/npm/dm/vanille.svg" alt="Downloads"></a>
    <img loading="lazy" alt="Dependencies" src="https://img.shields.io/badge/license-MIT-green" class="img_ev3q">
</p>
<p align="center">
  <img loading="lazy" alt="Dependencies" src="https://img.shields.io/badge/dependencies-none-pink" class="img_ev3q">
</p>

## Extending web components for performance
```ts
export class App extends BaseView {}
```

## Fast templating web components with JSX

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

## Simple routing

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

## Able to pass objects as web components attributes

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

## Attributes on web components become observable props

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

## Private state as observables

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

## Query the DOM with `refs` to update elements

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

## Declarative testing with JSX format
```tsx
import { mount } from './test-utils';

test('can render from jsx', () => {
  const $shadow = mount(<v-test />)

  const $el = $shadow.querySelector('[data-id="test"');

  expect($el).toBeTruthy();
});
```

## Declarative testing with JSX format
```
import { mount } from './test-utils';
import { Test } from './test-utils/Test';

test('can render from web component class', () => {
  const $shadow = mount(Test)

  const $el = $shadow.querySelector('[data-id="test"');

  expect($el).toBeTruthy();
});
```
