import { BaseView } from "./BaseElement"
import { Observable } from "./Observable";
import { define } from "./decorators";

@define()
export class CounterInput extends BaseView {
  props: Observable<{name:string}>
  state: Observable<{name:string}>

  data() {
    return {
      name: ''
    };
  }

  setBindings(): void {
    this.state.$on('name', (nv: string) =>{
      this.refs.name.textContent = nv;
    })
  }

  render() {
    return (
      <div>
        <input value={this.state.name} oninput={(e) => this.state.name = e.target.value} />
        <p ref="name">{this.state.name}</p>
      </div>
    );
  }
}
