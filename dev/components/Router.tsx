import { Route, View } from '@vanille/core';
import { Tables } from './Tables';
import { Dashboard } from './Dashboard';
import { ListExample } from './ListExample';
import { Welcome } from './Welcome';

export class Router extends View {
  render() {
    return (
      <section>
        <Route path="/app"><Welcome /></Route>
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
