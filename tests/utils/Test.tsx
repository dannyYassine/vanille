import { BaseView } from '../../src/BaseElement';
import { define } from '../../src/decorators';

@define()
class Test extends BaseView {
    render() {
        return <div id="test"></div>;
    }
}