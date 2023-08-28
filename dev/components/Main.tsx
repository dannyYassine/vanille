import { BaseView, define } from '../../src/index';
import './Router';

@define()
export class Main extends BaseView {
    globalStylesheet() {
        return `@import url("${window.location.origin}/assets/css/material-dashboard.css?v=3.1.0");`;
    }

    render() {
        return (
            <v-router></v-router>
        );
    }
}