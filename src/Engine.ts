import { View } from './View';

type ComponentTag = string | { name: string } | Function;

export class Engine {
    buildElement(tagName: ComponentTag): HTMLElement {
        const isCustomElement = (tagName as { name: string })?.name;
      
        if (isCustomElement) {
      
          if (tagName instanceof Function && Object.getPrototypeOf(tagName).name !== '') {
            return this.getElement(tagName as Function & { name: string });
          }
      
          const view = new View();
          (view as any).render = (tagName as Function).bind(view);
      
          return view;
      
        }
        return this.createElement(tagName as string);
      }

    getElement(tag: Function & { name: string }): HTMLElement {
      const elementName = `v-${tag.name.toLowerCase()}`;
      let Constructor = window.customElements.get(elementName);
        if (!Constructor) {
          window.customElements.define(elementName, tag as CustomElementConstructor);
          Constructor = window.customElements.get(elementName);
        }
        return new Constructor();
    }
  
    createElement(tagName: string): HTMLElement {
      return window.document.createElement(tagName);
    }
  }