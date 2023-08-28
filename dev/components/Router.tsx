import { BaseView, define, Route } from '../../src/index';
import './Tables';
import './Dashboard';

@define()
export class Router extends BaseView {
    globalStylesheet() {
        return `@import url("${window.location.origin}/assets/css/material-dashboard.css?v=3.1.0");`;
    }

    render() {
        return (
            <section>
                <v-route path="/dashboard">
                    <v-dashboard></v-dashboard>
                </v-route>
                <v-route path="/tables">
                    <v-tables></v-tables>
                </v-route>
            </section>
        );
    }
}