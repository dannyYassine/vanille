import { define } from '../../src/index';
import './Tables';
import './Dashboard';
import { DevView } from './DevView';

@define()
export class Router extends DevView {
  render() {
    return (
      <section>
        <v-route path="/app">Welcome</v-route>
        <v-route path="/app/dashboard">
          <v-dashboard></v-dashboard>
        </v-route>
        <v-route path="/app/tables">
          <v-tables></v-tables>
        </v-route>
      </section>
    );
  }
}
