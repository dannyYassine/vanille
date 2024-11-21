import { Engine } from '../Engine';
import { render } from '../jsx';
import { Directive } from './Directive';

export class IfDirective extends Directive {
    unsubscribe?: () => void;

    connected() {
      this.unsubscribe = this.value.subscribe((value, oldValue) => {
        if (!!value && !!value !== !!oldValue) {
          this.root.appendChild(render(this.jsx[2], new Engine()));
          return;
        }

        if (!!value === !!oldValue) {
          return;
        }
        console.log(this.$el);
        this.$el.remove();
      });

      if (!this.value.get()) {
        this.$el.remove();
      }
    }

    disconnected() {
      // this.unsubscribe?.();
    }

    onInput(e) {
      this.value.set(e.target.value)
    }
  }
  