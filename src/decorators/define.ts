import { snakeCase } from './../helpers/snakeCase';

export function define(name?: string): (target: Function) => void {
  return (target: Function) => {
    const key = name ?? snakeCase(target.name);
    if (customElements.get(`v-${key}`)) {
      return;
    }
    customElements.define(`v-${key}`, target as CustomElementConstructor);
  };
}
