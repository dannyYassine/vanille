export class Directive {
    $el: HTMLElement;
    value: any;
    observer?: MutationObserver;

    constructor($el, value) {
      this.$el = $el;
      this.value = value;
    }

    created() {
      this.listenForConnected(() => {
        this.connected();
      })
    }

    connected() {
      //
    }

    listenForConnected(callback) {
        const checkDom = () => {
            if (this.$el.parentNode) {
                callback();
            } else {
                requestAnimationFrame(checkDom);
            }
        };
        checkDom();
    }
  }
  