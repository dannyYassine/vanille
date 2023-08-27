import { BaseView } from "./BaseElement";
import { define } from "./decorators";

history.pushState = (f => function pushState() {
  var ret = f.apply(this, arguments);
  window.dispatchEvent(new Event('pushstate'));
  window.dispatchEvent(new Event('locationchange'));
  return ret;
})(history.pushState);

history.replaceState = (f => function replaceState() {
  var ret = f.apply(this, arguments);
  window.dispatchEvent(new Event('replacestate'));
  window.dispatchEvent(new Event('locationchange'));
  return ret;
})(history.replaceState);

window.addEventListener('popstate', () => {
  window.dispatchEvent(new Event('locationchange'))
});

@define()
export class Route extends BaseView {
  matches: boolean = false;

  setBindings(): void {
    window.addEventListener("locationchange", () => {
      this.checkPath();
    });
    this.checkPath();
  }

  checkPath() {
    if (window.location.pathname === this.props.path || this.matchesPattern()) {
      if (!this.matches) {
        this.matches = true;
        this.update();
      }
    } else if (this.matches) {
      this.matches = false;
      this.update();
    }
  }

  matchesPattern() {
    const paths = window.location.pathname.split('/');
    const propsPaths = this.props.path.split('/');

    if (paths.length !== propsPaths.length) {
      return false;
    }
    return propsPaths.filter((path, index) => {
      if (path === '/' || path.startsWith(':')) return true;
      return path === paths[index];
    }).length === paths.length;
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