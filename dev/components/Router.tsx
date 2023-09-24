import { define, Route } from '@vanille/core';
import { Tables } from './Tables';
import { Dashboard } from './Dashboard';
import { DevView } from './DevView';
import { ListExample } from './ListExample';

@define()
export class Router extends DevView {
  render() {
    return (
      <section>
        <Route path="/app">Welcome</Route>
        <Route path="/app/dashboard">
          <Dashboard />
        </Route>
        <Route path="/app/tables">
          <Tables />
        </Route>
        <Route path="/app/list-example">
          <ListExample />
        </Route>
      </section>
    );
  }
}
