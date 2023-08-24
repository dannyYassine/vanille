import { BaseView } from "./BaseElement";
import {h} from './jsx';
import typescriptLogo from './typescript.svg'
import viteLogo from '/vite.svg'
import './counter';
import { define } from "./decorators";

@define()
export class App extends BaseView {
  render() {
    setTimeout(() => {
      this.refs.counter.props.counter = {
        initialCount: 5
      };
    }, 2000);
    const counter = {
      initialCount: 3
    };
    return h(
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} class="logo" alt="Vite logo" />
        </a>
        <a href="https://www.typescriptlang.org/" target="_blank">
          <img src={typescriptLogo} class="logo vanilla" alt="TypeScript logo" />
        </a>
        <h1>Vite + TypeScript</h1>
        <div class="card">
          <v-counter ref="counter" counter={counter}></v-counter>
        </div>
        <p class="read-the-docs">
          Click on the Vite and TypeScript logos to learn more
        </p>
      </div>
    );
  }
}
