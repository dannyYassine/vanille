import { Route, define } from '@vanille/core';
import './Nav';
import './Main';
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
            <v-nav></v-nav>
          </div>
          <div style="margin-left: 260px;">
            <v-main></v-main>
          </div>
        </Route>
      </section>
    );
  }
}
