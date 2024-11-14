import { View } from "./View";

export class Engine {
    buildElement(
        tagName: string | { name: string } | Function,
      ): HTMLElement {
        const isCustomElement = tagName?.name;
      
        if (isCustomElement) {
      
          // class component
          if (tagName instanceof Function && tagName.__proto__.name !== '') {
            return this.getElement(tagName);
          }
      
          // functional component
          if (tagName instanceof Function && tagName.__proto__.name === '') {
            const view = new View();
            view.render = tagName.bind(view);
      
            return view;
          }
      
          return this.createElement(tagName as string);
        }
        return this.createElement(tagName as string) as any;
      }

    getElement(tag) {
      let Constructor = window.customElements.get(`v-${tag.name.toLowerCase()}`);
        if (!Constructor) {
          window.customElements.define(`v-${tag.name.toLowerCase()}`, tag);
          Constructor = window.customElements.get(`v-${tag.name.toLowerCase()}`);
        }
        return new Constructor();
    }
  
    createElement(tagName) {
      return window.document.createElement(tagName);
    }
  }