import { Route, View } from '@vanille/core';
import { Nav } from './Nav';
import { Main } from './Main';
import { Login } from './Login';
import { Home } from './Home';

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