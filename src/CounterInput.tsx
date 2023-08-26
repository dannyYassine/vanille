import { BaseView } from './BaseElement';
import { Observable } from './Observable';
import { define } from './decorators';

@define()
export class CounterInput extends BaseView {
  props: Observable<{ name: string }>;
  state: Observable<{ name: string }>;

  data() {
    return {
      firstName: '',
      user: {
        name: '90'
      }
    };
  }

  setBindings(): void {
    this.props.counter.$on('initialCount', (nv) => {
      this.refs.name.textContent = nv;
    });
    this.props.counter.user.$on('name', (nv) => {
      this.refs.name.textContent = nv;
    });
    this.props.counter.user.contact.$on('phone', (nv) => {
      this.refs.phone.textContent = nv;
    });
    this.state.user.$on('name', (nv: string) => {
      this.refs.name.textContent = nv;
    });
    this.state.user.$on('name', (nv: string) => {
      console.log(nv);
    });
    this.state.$on('firstName', (nv: string) => {
      this.refs.firstName.textContent = nv;
    });
  }

  render() {
    return (
      <div>
        <input
          value={this.state.user.name}
          oninput={(e) => (this.state.user.name = e.target.value)}
        />
        <input
          value={this.state.firstName}
          oninput={(e) => (this.state.firstName = e.target.value)}
        />
        <p ref="name">{this.state.user.name}</p>
        <p ref="phone">{this.props.counter.user.contact.phone}</p>
        <p ref="firstName">{this.state.firstName}</p>
      </div>
    );
  }
}
