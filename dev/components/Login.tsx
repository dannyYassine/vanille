import { define } from '../../src/index';
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

    window.history.pushState({}, '', '/app/dashboard');
  }

  render() {
    return <LoginView form={this.state} onLoginClicked={() => this.onSignInClicked()} />;
  }
}
