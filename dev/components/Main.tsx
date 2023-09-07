import { define } from '../../src';
import { DevView } from './DevView';
import './Router';

@define()
export class Main extends DevView {
  render() {
    return <v-router></v-router>;
  }
}
