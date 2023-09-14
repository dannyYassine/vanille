import { BaseView } from './BaseView';
import { Observable } from './Observable';
import { define } from './decorators';

@define()
class List extends BaseView {
  props: Observable<{ value: boolean; item: (i: any) => any }>;

  setBindings(): void {
    this.props.$on('value', () => {
      this.update();
    });
  }

  render() {
    const elements = this.props.value.map((item: any) => {
      return this.props.item(item);
    });

    return elements.length ? ['template', {}, ...elements] : '';
  }
}
