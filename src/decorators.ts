export function define() {
  return (target: Function) => {
    const key = target.name
      .split(/(?=[A-Z])/)
      .join('-')
      .toLowerCase();
    customElements.define(`v-${key}`, target);
  };
}
