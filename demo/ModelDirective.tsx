import { Directive } from '@vanille/core';

export class ModelDirective extends Directive {
    connected() {
      this.$el.addEventListener('input', (e) => {
          this.value.set(e.target.value)
      });
      this.value.subscribe((value) => {
        this.$el.setAttribute('value', value);
      });
    }
  }
  