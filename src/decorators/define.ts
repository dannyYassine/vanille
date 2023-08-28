export function define(): (target: Function) => void  {
    return (target: Function) => {
      const key = target.name
        .split(/(?=[A-Z])/)
        .join('-')
        .toLowerCase();
      customElements.define(`v-${key}`, target as CustomElementConstructor);
    };
  }
  
  