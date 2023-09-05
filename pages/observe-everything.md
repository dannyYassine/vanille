# Observables

## Built-in observables

`vanille` comes with an in-house `observable` function in order to listen to any level in the object tree:

```ts
import { observable } from '@vanille/core';
```

The `observable` function can be used for objects (including ES6 classes) and arrays:

```ts
const object = observable({
  user: {
    email: '',
    contact: {
      firstName: ''
    }
  }
});

const newArray = observable([
  user: { ... },
  user: { ... }
]);
```

Next, using the `$on` function, we can be notified to any new changes in the entire object tree:

```ts
object.user.$on('email', (newValue, oldValue, user) => {
  console.log(newValue, oldValue, user);
});
object.user.contact.$on('firstName', (newValue, oldValue, user) => {
  console.log(newValue, oldValue, user);
});

object.user.email = 'mycoolemail@js.com';
// log: 'vanille@js.com' '' { email: '', contact: { firstName: '' } }

object.user.contact.firstName = 'vanille';
// log: 'vanille' '' { contact: { firstName: '' } }
```

## The `$on` function

Inspired by the `EventEmitter` class from the `nodejs` ecosystem, the `$on` function allows to listen to value changes in the object tree:

```ts
$on<T: Value>(eventName: string, callback: (oldValue: Value, newValue: Value, object: Object<Value>) => void)
```

Allowing us to listen to any changes:

```ts
const object = observable({
  user: {
    children: [
      {...},
      {...}
    ]
  }
});

object.user.$on('children', (ov, nv, object) => {
  // new array of children
});

object.user.children[0].$on('name', (ov, nv, object) => {
  // new name
});
```
