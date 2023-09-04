import { hasShadowDom } from './hasShadowDom';

export function hasRefs(): (target: Function) => void {
  return (target: Function) => {
    hasShadowDom()(target);
    Object.defineProperty(target.prototype, 'refs', {
      get(): typeof Proxy {
        return new Proxy(
          {},
          {
            get: (_, prop: string) => {
              return this.shadowRoot?.querySelector(
                `[${this.$scopedId}][ref=${prop}]`
              );
            }
          }
        ) as typeof Proxy;
      }
    });
  };
}
