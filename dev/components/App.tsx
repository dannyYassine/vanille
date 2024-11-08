import Vanille, { Route, View } from '@vanille/core';
import { Nav } from './Nav';
import { Main } from './Main';
import { Login } from './Login';
import { Home } from './Home';

Vanille.setStyles(`
@import url("${window.location.origin}/assets/css/material-dashboard.css?v=3.1.0");
@import url("${window.location.origin}/assets/css/app.css");
`);

customElements.define('v-app', class extends View {
  render() {
    return (
      <section>
        <Route path="/">
          <Home />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route startWith="/app">
          <div>
            <Nav />
          </div>
          <div style="margin-left: 260px;">
            <Main />
          </div>
        </Route>
      </section>
    );
  }
});