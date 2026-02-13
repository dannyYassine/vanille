import { Directive } from './Directive';

export class ModelDirective extends Directive {
    unsubscribe?: () => void;

    connected() {
      this.$el.addEventListener('input', this.onInput.bind(this));
      this.unsubscribe = this.value.subscribe((value) => {
        this.$el.setAttribute('value', value);
      });
    }

    disconnected() {
      this.$el.removeEventListener('input', this.onInput.bind(this));
      this.unsubscribe?.();
    }

    onInput(e) {
      this.value.set(e.target.value)
    }
  }
  