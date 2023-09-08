import { define } from '@vanille/core';
import { DevView } from './DevView';
import { LoginView } from './LoginView';

@define()
export class Login extends DevView {
  data() {
    return {
      email: '',
      password: '',
      rememberMe: null
    };
  }

  onSignInClicked() {
    if (!this.state.email || !this.state.password) {
      return;
    }

    if (this.state.rememberMe) {
      console.log('need to remember me');
    }

    window.history.pushState({}, '', '/app/dashboard');
  }

  render() {
    return <LoginView form={this.state} onLoginClicked={() => this.onSignInClicked()} />;
  }
}
