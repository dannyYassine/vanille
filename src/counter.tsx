import { BaseView } from "./BaseElement"
import { Observable } from "./Observable";
import { define } from "./decorators";
import { h } from "./jsx";

type CounterProps = {counter: {initialCount: number}}
type CounterData = {count: number}

@define()
export class Counter extends BaseView {
  props: Observable<CounterProps>
  state: Observable<CounterData>

  data(): CounterData {
    return {
      count: this.props.counter.initialCount
    };
  }

  setBindings(): void {
    this.state.$on('count', (nv: number) =>{
      this.refs.count.textContent = nv;
    })
    this.props.$on('counter', (nv: {initialCount: number}) => {
      this.state.count = nv.initialCount;
    });
  }

  render() {
    return h(
      <button type="button" onclick={() => this.state.count += 1}>
        count is <span ref="count">{this.state.count}</span>
      </button>
    );
  }
}
