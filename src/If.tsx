import { View } from './View';

export class If extends View {
  static observedAttributes = ['value'];

  attributeChangedCallback(name) {
    if (name === 'value') {
      this.updateRender();
      return;
    }
  }

  render() {
    if (this.value) {
      return <slot></slot>;
    }
    
    return '';
  }
}
customElements.define('v-if', If);
