import { Route, define } from '@vanille/core';
import { Nav } from './Nav';
import { Main } from './Main';
import { DevView } from './DevView';
import { Login } from './Login';
import { Home } from './Home';

@define()
export class App extends DevView {
  render() {
    return (
      <section>
        <Route path="/">
          <Home />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route start-with="/app">
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
