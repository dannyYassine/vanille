import { BaseView, define } from '../../src/index';
import './Nav';
import './Main';

@define()
export class App extends BaseView {
    globalStylesheet() {
        return `@import url("${window.location.origin}/assets/css/material-dashboard.css?v=3.1.0");`;
    }

    render() {
        return (
            <section>
                <div>
                    <v-nav></v-nav>
                </div>
                <div style="margin-left: 260px;">
                    <v-main></v-main>
                </div>
            </section>
        );
    }
}