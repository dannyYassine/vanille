import { View } from './View';

history.pushState = ((f) =>
  function pushState() {
    var ret = f.apply(this, arguments);
    window.dispatchEvent(new Event('pushstate'));
    window.dispatchEvent(new Event('locationchange'));
    return ret;
  })(history.pushState);

history.replaceState = ((f) =>
  function replaceState() {
    var ret = f.apply(this, arguments);
    window.dispatchEvent(new Event('replacestate'));
    window.dispatchEvent(new Event('locationchange'));
    return ret;
  })(history.replaceState);

window.addEventListener('popstate', () => {
  window.dispatchEvent(new Event('locationchange'));
});

(window as any).$location = window.location;

export class Route extends View<{ startWith?: string; path?: string; group?: string }> {

  matchesRoute: boolean = false;

  location: Location;

  constructor() {
    super();
    this.location = (window as any).$location;
  }

  connected(): void {
    window.addEventListener('locationchange', () => {
      this.checkPath();
    });
    this.checkPath();
  }

  checkPath() {
    if (this.location.pathname === this.props.path || this.matchesPattern()) {
      if (!this.matchesRoute) {
        this.matchesRoute = true;
        this.updateRender();
      }
    } else if (this.matchesRoute) {
      this.matchesRoute = false;
      this.shadowRoot.innerHTML = '';
    }
  }

  matchesPattern() {
    if (!this.props.startWith && !this.props.path) {
      return false;
    }

    const browserPaths = this.location.pathname.split('/').filter((path) => {
      return path !== '';
    });
    let propsPaths = !!this.props.startWith ? this.props.startWith.split('/') : this.props.path.split('/');
    propsPaths = propsPaths.filter((path) => {
      return path !== '';
    });

    if (!!this.props.path && browserPaths.length !== propsPaths.length) {
      return false;
    }

    if (this.props.path) {
      return (
        propsPaths.filter((path, index) => {
          if (path.startsWith(':')) return true;
          return path === browserPaths[index];
        }).length === browserPaths.length
      );
    }

    let index = 0;
    while (index < propsPaths.length) {
      if (propsPaths[index].startsWith(':')) {
        index++;
        continue;
      }
      if (propsPaths[index] !== browserPaths[index]) {
        return false;
      }
      index++;
    }
    return true;
  }

  render() {
    if (!this.matchesRoute) {
      return '';
    }

    return ['slot', { ref: 'slot' }];
  }
}
customElements.define('v-route', Route);
