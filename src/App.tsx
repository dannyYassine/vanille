import { BaseView } from './BaseElement';
import typescriptLogo from './typescript.svg';
import viteLogo from '/vite.svg';
import './counter';
import './CounterInput';
import { define } from './decorators';
import { observable } from './Observable';

@define()
export class App extends BaseView {
  render() {
    const counter = observable({
      initialCount: 3
    });

    return (
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} class="logo" alt="Vite logo" />
        </a>
        <a href="https://www.typescriptlang.org/" target="_blank">
          <img
            src={typescriptLogo}
            class="logo vanilla"
            alt="TypeScript logo"
          />
        </a>
        <h1>Vite + TypeScript</h1>
        <div class="card">
          <v-counter ref="counter" counter={counter}></v-counter>
        </div>
        <div class="card">
          <v-counter-input ref="countInput" counter={counter}></v-counter-input>
        </div>
        <p class="read-the-docs">
          Click on the Vite and TypeScript logos to learn more
        </p>
      </div>
    );
  }
}
