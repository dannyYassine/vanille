import { BaseView, define, Route } from '../../src/index';
import './Nav';
import './Main';
import './Login';

@define()
export class App extends BaseView {
    globalStylesheet() {
        return `@import url("${window.location.origin}/assets/css/material-dashboard.css?v=3.1.0");`;
    }

    render() {
        return (
            <section>
                <v-route path="/login">
                    <v-login></v-login>
                </v-route>
                <v-route start-with="/app">
                    <div>
                        <v-nav></v-nav>
                    </div>
                    <div style="margin-left: 260px;">
                        <v-main></v-main>
                    </div>
                </v-route>
            </section>
        );
    }
}