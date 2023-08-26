import { BaseView } from './BaseElement';
import typescriptLogo from './typescript.svg';
import viteLogo from '/vite.svg';
import './counter';
import './CounterInput';
import { define } from './decorators';
import { observable } from './Observable';
import './Route';

@define()
export class App extends BaseView {
  render() {
    const counter = observable({
      initialCount: 3,
      user: {
        name: '',
        contact: {
          phone: 123
        }
      }
    });

    return (
      <div>
        <div>
          <button onclick={() => window.history.pushState({}, '', '/vite')}>Vite</button>
          <button onclick={() => window.history.pushState({}, '', '/vite/vue')}>Vite/Vue</button>
          <button onclick={() => window.history.pushState({}, '', '/typescript')}>TS</button>
        </div>
        <div>
          <a href='javascript:void()' onclick={() => window.history.pushState({}, '', '/vite')}>vite</a>
          <a href='javascript:void()' onclick={() => window.history.pushState({}, '', '/vite/vue')}>vite/vue</a>
          <a href='javascript:void()' onclick={() => window.history.pushState({}, '', '/typescript')}>typescript</a>
        </div>
        <v-route path="/vite">
          <a href="https://vitejs.dev" target="_blank">
            <img src={viteLogo} class="logo" alt="Vite logo" />
          </a>
          <p>Vite</p>
        </v-route>
        <v-route path="/:vite/vue">
          <a href="https://vitejs.dev" target="_blank">
            <img src={viteLogo} class="logo" alt="Vite logo" />
          </a>
          <p>Vue</p>
        </v-route>
        <v-route path="/typescript">
          <a href="https://www.typescriptlang.org/" target="_blank">
            <img
              src={typescriptLogo}
              class="logo vanilla"
              alt="TypeScript logo"
            />
          </a>
          <p>Typescript</p>
        </v-route>
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
