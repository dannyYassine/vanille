import { View } from './View';

export class If extends View {
  static observedAttributes = ['value'];

  attributeChanged() {
    this.updateRender();
  }

  render() {
    if (this.getAttribute('value') && ['true', true, 1].includes(this.getAttribute('value'))) {
      return <slot></slot>;
    }
    
    return '';
  }
}
customElements.define('v-if', If);
