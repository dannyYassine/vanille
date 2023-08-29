import { BaseView } from '../../src/BaseElement';
import { define } from '../../src/decorators';

@define()
export class Test extends BaseView {
  render() {
    return (
      <div>
        <div data-id="test"></div>
        <div data-id="name">{this.props.name}</div>
        <div data-id="user.name">{this.props.user?.name}</div>
      </div>
    );
  }
}
