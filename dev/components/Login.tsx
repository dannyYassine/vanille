import { define } from '@vanille/core';
import { DevView } from './DevView';
import { LoginView } from './LoginView';
import { Observable } from '@vanille/core/src/dist/Observable';

export class LoginForm {
  email: string = '';
  password: string = '';
  rememberMe: boolean = false;
}

@define()
export class Login extends DevView {
  state: Observable<{form: LoginForm}>
  
  data() {
    return {
      form: new LoginForm()
    };
  }

  onSignInClicked() {
    if (!this.state.form.email || !this.state.form.password) {
      return;
    }

    if (this.state.form.rememberMe) {
      console.log('need to remember me');
    }

    window.history.pushState({}, '', '/app/dashboard');
  }

  render() {
    return <LoginView form={this.state.form} onLoginClicked={() => this.onSignInClicked()} />;
  }
}
