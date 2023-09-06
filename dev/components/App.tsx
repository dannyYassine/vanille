import { define } from '../../src/index';
import './Nav';
import './Main';
import './Login';
import { DevView } from './DevView';

@define()
export class App extends DevView {
  render() {
    return (
      <section>
        <v-route path="/login">
          <v-login></v-login>
        </v-route>
        <v-route start-with="/app">
          <div>
            <v-nav></v-nav>
          </div>
          <div style="margin-left: 260px;">
            <v-main></v-main>
          </div>
        </v-route>
      </section>
    );
  }
}
