# Simple routes

## `v-route` component

`vanille` implements a very simple and straightforward routing system.

Simply import:

```ts
import '@vanille/core/Route';
```

This will add `Route` to `customElements` and you can use it as:

```tsx
<v-route path="/">Home</v-route>
```

## `path` attribute

When the `location` matches the given value set to `path`, the `slot` will be rendered.

```tsx
// https://dannyyassine.github.io/vanille

<v-route path="/">
  Home // not rendered
</v-route>

<v-route path="/vanille">
  Dashboard // rendered
</v-route>
```

## `startsWith` attribute

Similar to `String.prototype.startsWith`, `v-route` checks if the url path matches the beginning pattern set in the `startsWith` attribute.

```tsx
<v-route startsWith="/app"></v-route>
```

All routes beginning with `/app` will be rendered:

- `/app/dashboard`
- `/app/settings`
- `/app/user/1`

Very useful when configuring routes based on a mandatory login screen:

```jsx
<v-route path="/login">
  Login
</v-route>

<v-route starsWith="/app">
  <nav></nav>
  <v-route path="/app/dashboard">
    Dashboard
  </v-route>
  <v-route path="/app/settings">
    Dashboard
  </v-route>
</v-route>
```

## Params in the url

`vanille` offers very simple matching logic to render routes with params like `:id`:

```tsx
<v-route path="/users/:id">User with id</v-route>
```
