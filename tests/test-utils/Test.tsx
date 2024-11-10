import { BaseView } from '../../src/BaseView';
import { View } from '../../src/View';
import { define } from '../../src/decorators';
import { Signal } from '../../src/signals';

export class Test extends View {
  render() {
    return (
      <div>
        <div data-id="test"></div>
        <div ref="name" data-id="name">
          {this.props.name}
        </div>
        <div data-id="user.name">{this.props.user?.name}</div>
        <slot></slot>
      </div>
    );
  }
}
customElements.define('v-test', Test);

// export class TestWithClassComponents extends View {
//   render() {
//     return <Test ref="test" />;
//   }
// }
// customElements.define('v-test', TestWithClassComponents);


// export class TestWithData extends View {
//   data() {
//     return {
//       user: {
//         name: 'vanille'
//       }
//     };
//   }

//   render() {
//     return (
//       <div>
//         <div data-id="user.name">{this.state.user.name}</div>
//       </div>
//     );
//   }
// }
// customElements.define('v-test', TestWithData);

export class TestWithPropListeners extends View<{user: Signal<{name: string}>}> {
  render() {
    const { user } = this.props;
    
    return (
      <div>
        <div ref="username" data-id="user.name">
          {() => user.get().name}
        </div>
        <div ref="user" data-id="user.name">
          {() => user.get().name}
        </div>
      </div>
    );
  }
}
customElements.define('v-test-with-prop-listeners', TestWithPropListeners);

