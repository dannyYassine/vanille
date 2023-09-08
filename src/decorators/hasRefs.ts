export function hasRefs(): (target: Function) => void {
  return (target: Function) => {
    target.prototype.refs = new Proxy(
      {},
      {
        get: (_, prop: string) => {
          return this.shadowRoot.querySelector(`[${this.$scopedId}][ref=${prop}]`);
        }
      }
    ) as typeof Proxy;
  };
}
