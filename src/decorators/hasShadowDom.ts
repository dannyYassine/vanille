export function hasShadowDom(mode: string = 'open'): (target: Function) => void  {
    return (target: Function) => {
      if ('shadowDom' in target.prototype) {return;}
      Object.defineProperty(target.prototype, 'shadowDom', {
        get() {
          if (!this.shadowRoot) {
            this.attachShadow({ mode });;
          }
          return this.shadowRoot
        }
      });
    };
  }