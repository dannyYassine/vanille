import { define } from '../../src/index';
import { DevView } from './DevView';
import './Router';

@define()
export class Main extends DevView {
  render() {
    return <v-router></v-router>;
  }
}
