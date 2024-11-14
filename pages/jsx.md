# JSX

## Standardized JSX

You can quickly get started with fast templating with JSX

```ts
import { View } from '@vanille/core';

export class App extends View {
  // [!code focus:7]
  render() {
    return (
      <div>
        <span>JSX!</span>
      </div>
    );
  }
}
```