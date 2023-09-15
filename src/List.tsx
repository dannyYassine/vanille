import { BaseView } from './BaseView';
import { Observable } from './Observable';
import { define } from './decorators';
import { render } from './jsx';

@define()
export class List extends BaseView {
  props: Observable<{ value: any[]; key?: string; item: (i: any) => any }>;

  constructor() {
    super({ noShadow: true });
    this.style.display = 'contents';
  }

  setBindings(): void {
    this.props.$on('value', () => {
      this.update();
    });
  }

  render() {
    const elements = this.props.value.map((item: any) => {
      return this.props.item(item);
    });

    elements.map((el) => this.appendChild(render(el, document)));
  }
}
