import { BaseView } from './BaseView';
import { Observable } from './Observable';
import { define } from './decorators';
import { render } from './jsx';

@define()
export class List extends BaseView {
  props: Observable<{ value: Observable<any[]>; key: string; item: (i: any) => any }>;

  constructor() {
    super({ noShadow: true });
    this.style.display = 'contents';
  }

  setBindings(): void {
    this.props.$on('value', () => {
      this.update();
    });
    this.props.value.$on('push', (newValue: any[]) => {
      newValue.forEach((value: any) => {
        const $el: Array<unknown> = this.props.item(value);
        this.appendChild(render($el, window.document));
      });
    });
    this.props.value.$on('pop', () => {
      if (this.children.length === 1) {
        return;
      }
      this.removeChild(this.children[this.children.length - 1]);
    });
    this.props.value.$on('shift', () => {
      if (this.children.length === 1) {
        return;
      }
      this.removeChild(this.children[1]);
    });
    this.props.value.$on('unshift', (newValue: any[]) => {
      newValue.forEach((value: any, index: number) => {
        const $el: Array<unknown> = this.props.item(value);
        index == 0
          ? this.insertBefore(render($el, window.document), this.firstChild.nextSibling)
          : this.insertBefore(render($el, window.document), this.firstChild.nextSibling.nextSibling);
      });
    });
    this.props.value.$on('splice', () => {
      this.update();
    });
    this.props.value.$on('sort', () => {
      this.update();
    });
    this.props.value.$on('reverse', () => {
      this.update();
    });
  }

  render() {
    const elements = this.props.value.map((item: any) => {
      return this.props.item(item);
    });

    elements.map((el) => this.appendChild(render(el, window.document)));
  }
}
