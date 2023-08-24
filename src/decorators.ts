export function define() {
  return (target: Function) => {
    customElements.define(`v-${target.name.toLowerCase()}`, target);
  }
}