export function hasShadowDom(mode: string = 'open'): (target: Function) => void  {
    return (target: Function) => {
        if (target.prototype) {return;}
      Object.defineProperty(target.prototype, 'shadowDom', {
        get() {
          if (!this._shadowDom) {
            this._shadowDom = this.attachShadow({ mode });;
          }
          return this._shadowDom
        }
      });
    };
  }