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

window.$location = window.location;

@define()
export class Route extends BaseView {
  matches: boolean = false;

  location: Location;

  constructor() {
    super();
    this.location = window.$location;
  }

  setBindings(): void {
    window.addEventListener("locationchange", () => {
      this.checkPath();
    });
    this.checkPath();
  }

  checkPath() {
    if (this.location.pathname === this.props.path || this.matchesPattern()) {
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
    if (!this.props.startWith && !this.props.path) {
      return false;
    }

    const browserPaths = this.location.pathname.split('/').filter((path, index) => {
      return path !== '';
    });;
    let propsPaths = !!this.props.startWith ? this.props.startWith.split('/') : this.props.path.split('/');
    propsPaths = propsPaths.filter((path, index) => {
        return path !== '';
    });
    
    if (!!this.props.path && browserPaths.length !== propsPaths.length) {
      return false;
    }
    
    if (this.props.path) {
      return propsPaths.filter((path, index) => {
        if (path.startsWith(':')) return true;
        return path === browserPaths[index];
      }).length === browserPaths.length;
    }
    
    // startWith
    const paths = propsPaths.filter((path, index) => {
      if (path.startsWith(':')) return true;
      return true;
    });
    let index = 0;
    while (index < paths.length) {
      if (paths[index].startsWith(':')) {
        index++;
        continue;
      }
      if (paths[index] !== browserPaths[index]) {
        return false;
      }
      index++;
    }
    return true;
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