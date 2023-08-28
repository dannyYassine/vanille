export function define(name?: string): (target: Function) => void {
  return (target: Function) => {
    const key = name ?? target.name
      .split(/(?=[A-Z])/)
      .join('-')
      .toLowerCase();
    customElements.define(`v-${key}`, target as CustomElementConstructor);
  };
}

