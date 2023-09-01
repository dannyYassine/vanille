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
    const browserPaths = window.location.pathname.split('/').filter((path, index) => {
      return path !== '';
    });;
    let propsPaths = !!this.props.startWith ? this.props.startWith.split('/') : this.props.path.split('/');
    propsPaths = propsPaths.filter((path, index) => {
        return path !== '';
    });
    
    if (!!this.props.path && browserPaths.length !== propsPaths.length) {
      return false;
    }

    const paths = propsPaths.filter((path, index) => {
      if (path === '') return false;
      if (path.startsWith(':')) return true;
      return path === browserPaths[index];
    });

    if (this.props.path) {
      return paths.length === browserPaths.length;
    }
    
    if (this.props.startWith) {
      let index = 0;
      while (index < propsPaths.length) {
        if (paths[index] !== propsPaths[0]) {
          return false;
        }
        if (paths[index].startsWith(':') && !!propsPaths[index]) {
          return false;
        }
        index++;
      }
      return true;
    }

    return false;
  }

  render() {
    console.log('lll');
    if (!this.matches) {
      return '';
    }

    return (
      <slot ref="slot"></slot>
    );
  }
}