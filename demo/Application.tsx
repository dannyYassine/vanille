import Vanille, { View, ModelDirective, IfDirective } from "@vanille/core";
import javascriptLogo from "./javascript.svg";
import viteLogo from "/vite.svg";
import { Counter } from "./Counter.tsx";
import { state } from "../src/signals.ts";

Vanille.setStyles(`
@import url("${window.location.origin}/style.css");
`);

Vanille.setDirective("v-model", ModelDirective);
Vanille.setDirective("v-if", IfDirective);

export class Application extends View {
  nameInput = state('');

  render() {
    const { nameInput } = this;

    return (
      <div id="app-container">
        <div id="app">
          <a href="https://vitejs.dev" target="_blank">
            <img src={viteLogo} class="logo" alt="Vite logo" />
          </a>
          <a
            href="https://developer.mozilla.org/en-US/docs/Web/JavaScript"
            target="_blank"
          >
            <img
              src={javascriptLogo}
              class="logo vanilla"
              alt="JavaScript logo"
            />
          </a>
          <h1>Hello Vite!</h1>
          <div class="card">
            <Counter />
            <input v-model={nameInput} />
          </div>
          {nameInput}
          <p class="read-the-docs">Click on the Vite logo to learn more</p>
        </div>
      </div>
    );
  }
}
