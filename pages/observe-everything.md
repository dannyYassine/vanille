# Observables

Coming soon

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

object.user.email = 'mycoolemail@js.com';
// log: 'vanille@js.com' '' { email: '', contact: { firstName: '' } }

object.user.contact.firstName = 'vanille';
// log: 'vanille' '' { contact: { firstName: '' } }
```
