export class Directive {
    $el: HTMLElement;
    jsx: Array<unknown>;
    value: any;
    observer?: MutationObserver;
    didMount = false;
    root: ShadowRoot;

    constructor($el, jsx, value) {
      this.$el = $el;
      this.jsx = jsx;
      this.value = value;
    }

    findRoot() {
      let next = this.$el.parentNode;
      while (true) {
        if (next instanceof ShadowRoot) {
          return next;
        }
        next = next.parentNode;
      }
    }

    create() {
      this.listenForConnected();
      this.created();
    }

    created() {
      //
    }

    connected() {
      //
    }

    disconnected() {
      //
    }

    listenForConnected() {
        const checkDom = () => {
            if (this.$el.parentNode) {
              if (!this.didMount) {
                this.didMount = true;
                this.root = this.findRoot();
                this.connected();
              }
              requestAnimationFrame(checkDom);
            } else if (this.didMount) {
              this.disconnected();
            } else {
                requestAnimationFrame(checkDom);
            }
        };
        checkDom();
    }
  }
  