import { state, View } from '@vanille/core';
import { LoginView } from './LoginView';

export class LoginForm {
  email: string = '';
  password: string = '';
  rememberMe: boolean = false;
}

export function Login() {
  const form = state(new LoginForm());
  
  this.onSignInClicked = () => {
    if (!form.get().email || !form.get().password) {
      return;
    }

    if (form.rememberMe) {
      console.log('need to remember me');
    }

    window.history.pushState({}, '', '/app/dashboard');
  }

  return <LoginView form={form} onLoginClicked={() => this.onSignInClicked()} />;
}
