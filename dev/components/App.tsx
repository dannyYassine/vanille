import { Route, View, state } from '@vanille/core';
import { Nav } from './Nav';
import { Main } from './Main';
import { DevView } from './DevView';
import { Login } from './Login';
import { Home } from './Home';

export class App extends View {
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
}
customElements.define('v-app', App);