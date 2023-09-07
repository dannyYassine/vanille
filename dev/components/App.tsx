import { Route, define } from '../../src';
import { Nav } from './Nav';
import { Main } from './Main';
import { DevView } from './DevView';
import { Login } from './Login';

@define()
export class App extends DevView {
  render() {
    return (
      <section>
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
