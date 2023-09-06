import { snakeCase } from './../helpers/snakeCase';

export function define(name?: string): (target: Function) => void {
  return (target: Function) => {
    const key = name ?? snakeCase(target.name);
    customElements.define(`v-${key}`, target as CustomElementConstructor);
  };
}
