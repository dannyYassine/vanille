import { BaseView } from "./BaseElement"
import { Observable } from "./Observable";
import { define } from "./decorators";

@define()
export class CounterInput extends BaseView {
  props: Observable<{name:string}>
  state: Observable<{name:string}>

  data() {
    return {
      user: {
        name: '90'
      }
    };
  }

  setBindings(): void {
    this.state.user.$on('name', (nv: string) =>{
      this.refs.name.textContent = nv;
    })
  }

  render() {
    return (
      <div>
        <input value={this.state.user.name} oninput={(e) => this.state.user.name = e.target.value} />
        <p ref="name">{this.state.user.name}</p>
      </div>
    );
  }
}
