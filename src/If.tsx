import { BaseView } from './BaseView';
import { Observable } from './Observable';
import { define } from './decorators';

@define()
export class If extends BaseView {
  props: Observable<{ value: boolean }>;

  setBindings(): void {
    this.props.$on('value', () => {
      this.update();
    });
  }

  render() {
    if (this.props.value) {
      return ['slot', { ref: 'slot' }];
    }

    return '';
  }
}
