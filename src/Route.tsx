import { BaseView } from "./BaseElement";
import { define } from "./decorators";

@define()
export class Route extends BaseView
{
  matches: boolean = false;

  setBindings(): void {
    window.navigation.addEventListener("navigate", (e) => {
      this.checkPath(e.destination.url);
    });

    this.checkPath(window.location.href);
  }

  checkPath(url) {
    if (url === `${window.location.origin}${this.props.path}`) {
      if (!this.matches) {
        this.matches = true;
        this.update();
      }
    } else if (this.matches) {
      this.matches = false;
      this.update();
    }
  }

  render() {
    if (!this.matches) {
      return '';
    }

    return (
      <slot ref="slot"></slot>
    );
  }
}