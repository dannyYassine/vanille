import { BaseView } from '../../src/BaseView';
import { define } from '../../src/decorators';

@define()
export class Test extends BaseView {
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

@define()
export class TestWithClassComponents extends BaseView {
  render() {
    return <Test ref="test" />;
  }
}

@define()
export class TestWithData extends BaseView {
  data() {
    return {
      user: {
        name: 'vanille'
      }
    };
  }

  render() {
    return (
      <div>
        <div data-id="user.name">{this.state.user.name}</div>
      </div>
    );
  }
}

@define()
export class TestWithPropListeners extends BaseView {
  setBindings(): void {
    this.props.user.$on('name', (nv) => {
      this.refs.username.textContent = nv;
    });
    this.props.$on('user', (nv) => {
      this.refs.user.textContent = nv.name;
    });
  }

  render() {
    return (
      <div>
        <div ref="username" data-id="user.name">
          {this.props.user.name}
        </div>
        <div ref="user" data-id="user.name">
          {this.props.user.name}
        </div>
      </div>
    );
  }
}
